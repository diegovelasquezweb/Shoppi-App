import React, { useState, useEffect } from "react";
import { Alert, FlatList, Text, View, TouchableOpacity, Button } from "react-native";
import { getProducts } from "../api/getProducts";
import { styles } from "../styles/styles";

const ProductList = ({ searchTerm, navigation }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);
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

  const showProductData = (product) => {
    Alert.alert("Product Detail", JSON.stringify(product, null, 2));
  };

  const navigateToDetailProduct = (product) => {
    navigation.navigate("ProductScreen", { product });
  };


  const navigateToTicketForm = (product) => {
    navigation.navigate("CreateTicketScreen", { product });
  };

  const renderProductItem = ({ item }) => (
    <View style={styles.productItem}>
      <Text onPress={() => showProductData(item)}>{item.title}</Text>
      <Text>Precio: ${item.variants[0].price}</Text>
      <Text style={styles.customText}>
        Custom Text: {item.customMetafields.custom_text}
      </Text>
      <Text style={styles.featuredProduct}>
        Featured Product: {item.customMetafields.featured_product ? "Sí" : "No"}
      </Text>
      <TouchableOpacity style={styles.button} onPress={() => navigateToDetailProduct(item)}>
        <Text>Ir a Detalles del Producto</Text>
      </TouchableOpacity>
      <Button title="Crear Ticket" onPress={() => navigateToTicketForm(item)} />

    </View>
  );

  useEffect(() => {
    if (searchTerm) {
      const filtered = products.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [searchTerm, products]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View>
      <Text>Product List</Text>
      <FlatList
        data={filteredProducts.length > 0 ? filteredProducts : products}
        keyExtractor={(item) => item.id}
        renderItem={renderProductItem}
      />
    </View>
  );
};

export default ProductList;
