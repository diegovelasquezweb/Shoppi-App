import React, { useState, useEffect } from "react";
import { FlatList, Text, View, Alert, Button } from "react-native"; // Importa Alert desde react-native
import { getProducts } from "../api/products";
import { styles } from "../styles/styles";

const ProductList = ({ season }) => {
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

  // Función para mostrar un alert con la data de los productos
  const showProductData = (product) => {
    Alert.alert("Detalles del Producto", JSON.stringify(product, null, 2));
  };

  return (
    <View>
    <Text>Product List</Text>
    <Text>Current Season: {season}</Text>
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.productItem}>
          <Text onPress={() => showProductData(item)}>{item.title}</Text>
          <Text>Precio: ${item.variants[0].price}</Text>
          <Text style={styles.customText}>
            Custom Text: {item.customMetafields.custom_text}
          </Text>
          <Text style={styles.featuredProduct}>
            Featured Product:{" "}
            {item.customMetafields.featured_product ? "Sí" : "No"}
          </Text>
        </View>
      )}
    />
  </View>
  );
};

export default ProductList;
