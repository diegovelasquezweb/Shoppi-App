import React from "react";
import { SafeAreaView, StatusBar, View } from "react-native";
import MainScreen from "../screens/MainScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import ProductScreen from "../screens/ProductScreen";
import CreateTicketScreen from "../screens/CreateTicketScreen";
import ProductListScreen from "../screens/ProductListScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";


const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Main Screen">
          <Stack.Screen
            name="mainScreen"
            component={MainScreen}
            options={{
              title: "Home",
              headerStyle: {
                backgroundColor: "#3498db",
              },
              headerTitleStyle: {
                color: "#fff",
              },
            }}
          />
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{
              title: "Login",
              headerStyle: {
                backgroundColor: "#3498db",
              },
              headerTitleStyle: {
                color: "#fff",
              },
            }}
          />
          <Stack.Screen
            name="RegisterScreen"
            component={RegisterScreen}
            options={{
              title: "Register",
              headerStyle: {
                backgroundColor: "#3498db",
              },
              headerTitleStyle: {
                color: "#fff",
              },
            }}
          />
          <Stack.Screen
            name="ProductScreen"
            component={ProductScreen}
            options={({ route }) => ({ title: route.params.product.title })}
          />
          <Stack.Screen
            name="ProductListScreen"
            component={ProductListScreen}
            options={({ route }) => ({ title: 'Test' })}
          />
          <Stack.Screen
            name="CreateTicketScreen"
            component={CreateTicketScreen}
            options={({ route }) => ({ title: 'Create Ticket' })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default AppNavigator;