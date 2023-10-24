import React from "react";
import { SafeAreaView, StatusBar } from "react-native";
import ProductList from "./components/ProductList";
import Weather from "./components/Weather";
import { styles } from "./styles/styles";

const App = () => (
  <SafeAreaView style={styles.container}>
    <StatusBar barStyle="dark-content" backgroundColor="#fff" />
    <Weather />
    {/* <ProductList /> */}
  </SafeAreaView>
);

export default App;
