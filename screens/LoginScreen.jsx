import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import {styles} from "../styles/styles";

function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let customErrorMessage = "Invalid email or password.";

  const isEmailValid = (email) => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    return emailRegex.test(email);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Please fill the fields.");
      return;
    }

    if (!isEmailValid(email)) {
      Alert.alert("Please enter a valid email.");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      navigation.navigate("ProductListScreen");
    } catch (error) {
      Alert.alert(customErrorMessage);
      console.log(error.message);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Diego Velasquez - Lab 5</Text>
        <Text style={styles.subtitle}>Login</Text>
        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="Enter your email"
          autoCorrect={false}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <Text style={styles.label}>Password:</Text>

        <TextInput
          style={styles.input}
          onChangeText={(text) => setPassword(text)}
          value={password}
          placeholder="Enter your password"
          secureTextEntry={true}
          autoCorrect={false}
          autoCapitalize="none"
          keyboardType="default"
        />
        <View style={styles.buttonContainer}>
          <Button
            title="Register"
            onPress={() => navigation.navigate("Register")}
          />
          <Button title="Login" onPress={handleLogin} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default LoginScreen;
