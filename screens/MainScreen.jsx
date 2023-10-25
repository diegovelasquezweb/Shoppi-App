import React, { useState } from "react";
import { SafeAreaView, StatusBar, View } from "react-native";
import ProductList from "../components/ProductList";
import Search from "../components/Search";
import { styles } from "../styles/styles";

const MainScreen = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState(""); 

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View>
        <Search onSearchChange={setSearchTerm} />
        <ProductList searchTerm={searchTerm} navigation={navigation}/>
      </View>
    </SafeAreaView>
  );
};

export default MainScreen;