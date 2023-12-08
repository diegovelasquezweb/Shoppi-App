import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Image, ToastAndroid, Platform, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';

import { getFirestore, addDoc, collection, updateDoc } from 'firebase/firestore';
import { firestore } from '../firebaseConfig';
import TakePhoto from './TakePhoto';
import { styles } from '../styles/styles';

const TicketForm = ({ route }) => {
  const { product } = route.params;
  const [productName, setProductName] = useState(product.title);
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState('');
  const [location, setLocation] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const [isMapVisible, setMapVisibility] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const navigation = useNavigation();

  const handleLocationSelect = (event) => {
    setSelectedLocation({
      latitude: event.nativeEvent.coordinate.latitude,
      longitude: event.nativeEvent.coordinate.longitude,
    });
  };

  const handleChangeLocation = () => {
    setMapVisibility(true);
  };


  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        ToastAndroid.show('Permission to access location was denied', ToastAndroid.SHORT);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      let reverseGeocode = await Location.reverseGeocodeAsync(location.coords);
      if (reverseGeocode && reverseGeocode.length > 0) {
        setLocation(reverseGeocode[0].city + ', ' + reverseGeocode[0].country);
        setSelectedLocation(location.coords);
      }
    })();
  }, []);

  const handleCreateTicket = async () => {
    try {
      const docRef = await addDoc(collection(firestore, 'tickets'), {
        productId: product.id,
        productName,
        description,
        photo,
        location,
        purchaseDate,
      });
      await updateDoc(docRef, {
        id: docRef.id,
      });
      console.log('Ticket created with ID: ', docRef.id);
      ToastAndroid.show('Ticket added', ToastAndroid.SHORT);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };


  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || purchaseDate;
    setDatePickerVisibility(Platform.OS === 'ios');
    setPurchaseDate(currentDate);
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const handleSetNewLocation = async () => {
    if (selectedLocation) {
      let reverseGeocode = await Location.reverseGeocodeAsync(selectedLocation);
      if (reverseGeocode && reverseGeocode.length > 0) {
        setLocation(reverseGeocode[0].city + ', ' + reverseGeocode[0].country);
        setMapVisibility(false);
      }
    }
  };

  return (
    <View style="">
      <Text style={styles.title}>Create Ticket</Text>
      <Text style={styles.label}>Product Name</Text>
      <TextInput
        style={styles.input}
        onChangeText={setProductName}
        value={productName}
        placeholder="Product Name"
        editable={false}
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.inputArea, { height: Platform.OS === 'ios' ? 20 * 5 : null }]}
        onChangeText={setDescription}
        value={description}
        placeholder="Description"
        multiline
        numberOfLines={5}
      />
      <TakePhoto onPhotoTaken={(image) => setPhoto(image)} />
      <Text style={styles.label}>Location</Text>
      <TextInput
        style={styles.input}
        value={location}
        placeholder="Location"
        editable={false}
      />
      <TouchableOpacity style={styles.buttonSecondary} onPress={handleChangeLocation}>
        <Text style={styles.buttonText}>Change Location</Text>
      </TouchableOpacity>
      {isMapVisible && (
        <View>
          <MapView
            style={{ width: '100%', height: 200 }}
            initialRegion={{
              latitude: selectedLocation ? selectedLocation.latitude : 37.78825,
              longitude: selectedLocation ? selectedLocation.longitude : -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            onPress={handleLocationSelect}
          >
            {selectedLocation && (
              <Marker
                coordinate={{
                  latitude: selectedLocation.latitude,
                  longitude: selectedLocation.longitude,
                }}
              />
            )}
          </MapView>
          <TouchableOpacity style={styles.buttonSecondary} onPress={handleSetNewLocation}>
            <Text style={styles.buttonText}>Set New Location</Text>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity style={styles.buttonSecondary} onPress={showDatePicker}>
        <Text style={styles.buttonText}>Choose Date</Text>
      </TouchableOpacity>
      {isDatePickerVisible && (
        <DateTimePicker
          value={purchaseDate ? purchaseDate : new Date()}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      <TouchableOpacity style={styles.buttonFull} onPress={handleCreateTicket}>
        <Text style={styles.buttonText}>Create Ticket</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonFull} onPress={() => navigation.navigate('TicketsListScreen')}>
        <Text style={styles.buttonText}>All Tickets</Text>
      </TouchableOpacity>

    </View>
  );
};

export default TicketForm;