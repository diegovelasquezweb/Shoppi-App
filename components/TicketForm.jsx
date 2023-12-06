import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { getFirestore, addDoc, collection } from 'firebase/firestore';
import { firestore } from '../firebaseConfig';

const TicketForm = ({ route }) => {
  const { product } = route.params;
  const [productName, setProductName] = useState(product.title);
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState('');
  const [audio, setAudio] = useState('');
  const [video, setVideo] = useState('');
  const [location, setLocation] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [file, setFile] = useState('');

  const handleCreateTicket = async () => {
    try {
      const docRef = await addDoc(collection(firestore, 'tickets'), {
        productName,
        description,
        photo,
        audio,
        video,
        location,
        purchaseDate,
        file,
      });
      console.log('Ticket created with ID: ', docRef.id);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  const pickDocument = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      setFile(res);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker
      } else {
        throw err;
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
        style={styles.input}
        onChangeText={setDescription}
        value={description}
        placeholder="Description"
      />
      <TextInput
        style={styles.input}
        onChangeText={setPhoto}
        value={photo}
        placeholder="Photo"
      />
      <TextInput
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
      <TextInput
        style={styles.input}
        onChangeText={setPurchaseDate}
        value={purchaseDate}
        placeholder="Purchase Date"
      />
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