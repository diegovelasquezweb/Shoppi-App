import React from "react";
import { SafeAreaView, StatusBar, View, Button, Text } from "react-native";
import { styles } from "../styles/styles";

const MainScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View>
        <Text style={styles.brand}>Welcome to Supportifly</Text>
      </View>
      <View>
        <Button
          title="Login"
          onPress={() => navigation.navigate("LoginScreen")}
        />
        <Button
          title="Register"
          onPress={() => navigation.navigate("RegisterScreen")}
        />
        <Button
          title="Create a Ticket"
          onPress={() => navigation.navigate("ProductListScreen")}
        />
      </View>
    </SafeAreaView>
  );
};

export default MainScreen;