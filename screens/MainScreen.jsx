import React from "react";
import { SafeAreaView, StatusBar, View, Text, TouchableOpacity } from "react-native";
import { styles } from "../styles/styles";

const MainScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.containerLanding}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.brand}>
        <Text style={styles.logo}>Welcome to Supportifly</Text>
        <Text style={styles.header}>Please login or register to continue</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("RegisterScreen")}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("LoginScreen")}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default MainScreen;