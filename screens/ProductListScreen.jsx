import React, { useState } from "react";
import { SafeAreaView, StatusBar } from "react-native";
import ProductList from "../components/ProductList";
import Search from "../components/Search";
import { styles } from "../styles/styles";

const MainScreen = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <SafeAreaView style={styles.containerStart}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Search onSearchChange={setSearchTerm} />
      <ProductList searchTerm={searchTerm} navigation={navigation} />
    </SafeAreaView>
  );
};

export default MainScreen;