import React, { useState } from "react";
import { SafeAreaView, StatusBar } from "react-native";
import ProductList from "./components/ProductList";
import Weather from "./components/Weather";
import FilteredProducts from "./components/FilteredProducts";
import { styles } from "./styles/styles";

const App = () => {
  const [season, setSeason] = useState(null);

  const setSeasonValue = (seasonValue) => {
    setSeason(seasonValue);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Weather setSeason={setSeasonValue} />
      <FilteredProducts season={season} />
      {/* <ProductList season={season} /> */}
    </SafeAreaView>
  );
};

export default App;
