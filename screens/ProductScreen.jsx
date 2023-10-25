import React from "react";
import { SafeAreaView, StatusBar, View } from "react-native";
import { styles } from "../styles/styles";
import DetailProduct from "../components/DetailProduct";

const ProductScreen = ({ route }) => {
  const { product } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View>
        <DetailProduct route={{ params: { product } }} />
      </View>
    </SafeAreaView>
  );
};

export default ProductScreen;
