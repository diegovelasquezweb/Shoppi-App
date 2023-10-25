import React from "react";
import { Text, View, Image } from "react-native";
import { styles } from "../styles/styles";
import RenderHtml from "react-native-render-html";
import { useWindowDimensions } from 'react-native';

const DetailProduct = ({ route }) => {
  const { product } = route.params;
  const { width } = useWindowDimensions();

  return (
    <View>
      <Text>Product Detail</Text>
      <Text>Title: {product.title}</Text>
      <Text>Precio: ${product.variants[0].price}</Text>

      <Image
        style={{ width: 200, height: 200 }}
        source={{ uri: product.image.src }}
      />

      <Text>Body HTML: {product.body_html}</Text>
      <RenderHtml source={{ html: product.body_html }}  contentWidth={width} />
      <Text>Created At: {product.created_at}</Text>
      <Text>Handle: {product.handle}</Text>
      <Text>ID: {product.id}</Text>
      <Text>Vendor: {product.vendor}</Text>
      <Text>Product Type: {product.product_type}</Text>
      <Text>Published At: {product.published_at}</Text>
      <Text>Published Scope: {product.published_scope}</Text>
      <Text>Status: {product.status}</Text>
      <Text>
        Tags:{" "}
        {Array.isArray(product.tags) ? product.tags.join(", ") : "No tags"}
      </Text>

      <Text>Template Suffix: {product.template_suffix}</Text>

      <Text>Custom Text: {product.customMetafields.custom_text}</Text>
      <Text>
        Featured Product:{" "}
        {product.customMetafields.featured_product ? "Sí" : "No"}
      </Text>
    </View>
  );
};

export default DetailProduct;
