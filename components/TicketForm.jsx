import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Image, ToastAndroid, Platform, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';

import { getFirestore, addDoc, collection, updateDoc } from 'firebase/firestore';
import { firestore } from '../firebaseConfig';
import TakePhoto from './TakePhoto';

const TicketForm = ({ route, navigation }) => {
  const { product } = route.params;
  const [productName, setProductName] = useState(product.title);
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState('');
  const [audio, setAudio] = useState('');
  const [video, setVideo] = useState('');
  const [location, setLocation] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const [isMapVisible, setMapVisibility] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);

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
        audio,
        video,
        location,
        purchaseDate,
      });
      await updateDoc(docRef, {
        id: docRef.id,
      });
      console.log('Ticket created with ID: ', docRef.id);
      ToastAndroid.show('Ticket added', ToastAndroid.SHORT);
      navigation.navigate("TicketsListScreen");
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
    <View>
      <Text style={styles.text}>Create Ticket</Text>
      <TextInput
        style={styles.input}
        onChangeText={setProductName}
        value={productName}
        placeholder="Product Name"
        editable={false}
      />
      <TextInput
        style={[styles.input, { height: Platform.OS === 'ios' ? 20 * 5 : null }]}
        onChangeText={setDescription}
        value={description}
        placeholder="Description"
        multiline
        numberOfLines={5}
      />
      <TextInput
        style={styles.input}
        value={location}
        placeholder="Location"
        editable={false}
      />
      <Button title="Change Location" onPress={handleChangeLocation} />
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
          <Button title="Set New Location" onPress={handleSetNewLocation} />
        </View>
      )}
      <TakePhoto onPhotoTaken={(image) => setPhoto(image)} />
      <TouchableOpacity onPress={showDatePicker}>
        <TextInput
          style={styles.input}
          value={purchaseDate ? purchaseDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : ''}
          placeholder="Date"
          editable={false}
        />
      </TouchableOpacity>
      {isDatePickerVisible && (
        <DateTimePicker
          value={purchaseDate ? purchaseDate : new Date()}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      <View style={styles.buttonContainer}>
        <Button title="Submit" onPress={handleCreateTicket} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    marginTop: 10,
  },
});

export default TicketForm;