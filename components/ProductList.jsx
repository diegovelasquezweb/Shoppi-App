import React, { useState, useEffect } from "react";
import { Alert, FlatList, Text, View } from "react-native";
import { getProducts } from "../api/getProducts";
import { styles } from "../styles/styles";
import Search from "./Search"; // Asegúrate de importar el componente Search desde la ubicación correcta

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]); // Nuevo estado
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
    Alert.alert("Detalles del Producto", JSON.stringify(product, null, 2));
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
    </View>
  );

  // Función para actualizar los productos filtrados
  const handleSearchChange = (searchTerm) => {
    if (searchTerm) {
      const filtered = products.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View>
      <Text>Product List</Text>
      <Search onSearchChange={handleSearchChange} />
      <FlatList
        data={filteredProducts.length > 0 ? filteredProducts : products} // Mostrar los productos filtrados
        keyExtractor={(item) => item.id}
        renderItem={renderProductItem}
      />
    </View>
  );
};

export default ProductList;
