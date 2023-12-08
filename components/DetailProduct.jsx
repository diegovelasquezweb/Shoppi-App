import React from "react";
import { Text, View, Image } from "react-native";
import { styles } from "../styles/styles";
import RenderHtml from "react-native-render-html";
import { useWindowDimensions } from 'react-native';

const DetailProduct = ({ route }) => {
  const { product } = route.params;
  const { width } = useWindowDimensions();

  return (
    <View style="">
      <Text style={styles.title}>Product Detail</Text>
      <Text style={styles.productTitle}>{product.title}</Text>
      <Text style={styles.productPrice}>${product.variants[0].price}</Text>
      <Image
        style={styles.productImageDetail}
        source={{ uri: product.image.src }}
      />
      <RenderHtml source={{ html: product.body_html }} contentWidth={width} />
      <Text>Status: {product.status}</Text>
    </View>
  );
};

export default DetailProduct;
