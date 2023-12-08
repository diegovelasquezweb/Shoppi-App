import React, { useState, useEffect } from "react";
import { Button, Image, View, TouchableOpacity, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { styles } from "../styles/styles";

export default function TakePhoto({ onPhotoTaken }) {
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera permissions to make this work!');
      }
    })();
  }, []);

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync();

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      onPhotoTaken(result.assets[0].uri);
    }
  };

  return (
    <View>
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      <TouchableOpacity style={styles.buttonSecondary} onPress={takePhoto} >
      <Text style={styles.buttonText}>Take Photo</Text>
    </TouchableOpacity>
    </View>
  );
}