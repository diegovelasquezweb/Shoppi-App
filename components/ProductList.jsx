import React, { useState, useEffect } from "react";
import { Alert, FlatList, Text, View, TouchableOpacity, Button, Image } from "react-native";
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
      <Image source={{ uri: item.images[0].src}} style={styles.productImage} />
      <View style={styles.productDetails}>
        <Text style={styles.productTitle} onPress={() => navigateToDetailProduct(item)}>{item.title}</Text>
        <Text style={styles.productPrice}>${item.variants[0].price}</Text>
        <TouchableOpacity style={styles.button}  onPress={() => navigateToTicketForm(item)}>
          <Text style={styles.buttonText}>Create Ticket</Text>
        </TouchableOpacity>
      </View>
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
      <FlatList
        data={filteredProducts.length > 0 ? filteredProducts : products}
        keyExtractor={(item) => item.id}
        renderItem={renderProductItem}
      />
    </View>
  );
};

export default ProductList;
