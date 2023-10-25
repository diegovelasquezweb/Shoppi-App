import React from "react";
import { SafeAreaView, StatusBar } from "react-native";
import ProductList from "./components/ProductList";
import { styles } from "./styles/styles";

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ProductList />
    </SafeAreaView>
  );
};

export default App;
