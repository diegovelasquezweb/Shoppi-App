import React, { useState, useEffect } from "react";
import { FlatList, Text, View } from "react-native";
import { getProducts } from "../api/products";
import { styles } from "../styles/styles";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const metafieldsKeys = ["custom_text", "featured_product"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProducts(metafieldsKeys);
        setProducts(data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.productItem}>
          <Text>{item.title}</Text>
          <Text>Precio: ${item.variants[0].price}</Text>
          <Text style={styles.customText}>
            Custom Text: {item.customMetafields.custom_text}
          </Text>
          <Text style={styles.featuredProduct}>
            Featured Product: {item.customMetafields.featured_product ? "Sí" : "No"}
          </Text>
        </View>
      )}
    />
  );
};

export default ProductList;
