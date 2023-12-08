import React, { useState, useEffect } from "react";
import { Button, Image, View } from "react-native";
import * as ImagePicker from "expo-image-picker";

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
      <Button title="Take Photo" onPress={takePhoto} />
    </View>
  );
}