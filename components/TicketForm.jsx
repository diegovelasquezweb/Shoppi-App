import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Image, ToastAndroid  } from 'react-native';

import { getFirestore, addDoc, collection } from 'firebase/firestore';
import { firestore } from '../firebaseConfig';
import TakePhoto from './TakePhoto';

const TicketForm = ({ route }) => {
  const { product } = route.params;
  const [productName, setProductName] = useState(product.title);
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState('');
  const [audio, setAudio] = useState('');
  const [video, setVideo] = useState('');
  const [location, setLocation] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');

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
      console.log('Ticket created with ID: ', docRef.id);
      ToastAndroid.show('Ticket added', ToastAndroid.SHORT);
    } catch (e) {
      console.error('Error adding document: ', e);
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
      <TakePhoto onPhotoTaken={(image) => setPhoto(image)} />
      <TextInput
        style={styles.input}
        onChangeText={setPurchaseDate}
        value={purchaseDate}
        placeholder="Purchase Date"
      />
      {/* <TextInput
        style={styles.input}
        onChangeText={setAudio}
        value={audio}
        placeholder="Audio"
      />
      <TextInput
        style={styles.input}
        onChangeText={setVideo}
        value={video}
        placeholder="Video"
      />
      <TextInput
        style={styles.input}
        onChangeText={setLocation}
        value={location}
        placeholder="Location"
      />
      */}
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