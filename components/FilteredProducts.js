import React, { useState, useEffect } from "react";
import { FlatList, Text, View, Button } from "react-native";
import { getProducts } from "../api/products";
import { styles } from "../styles/styles";

const FilteredProducts = ({ season }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const metafieldsKeys = ["custom_text", "featured_product"];

  const showAlertWithFilteredProducts = () => {
    const filteredProductNames = products.map(item => item.title).join("\n");
    alert("Productos Filtrados:\n" + filteredProductNames);
  };

  const showAlertWithUnfilteredProducts = () => {
    const data = products;
    const unfilteredProducts = data.filter(item => item.collection !== season);
    const unfilteredProductNames = unfilteredProducts.map(item => item.title).join("\n");
    alert("Productos no Filtrados:\n" + unfilteredProductNames);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProducts(metafieldsKeys);
        
        const filteredProducts = data.filter(item => item.collection === season);
        
        setProducts(filteredProducts);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [season]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View>
      <Text>Current Season: {season}</Text>
      <Button title="Mostrar Productos Filtrados" onPress={showAlertWithFilteredProducts} />
      <Button title="Mostrar Productos no Filtrados" onPress={showAlertWithUnfilteredProducts} />
      <FlatList
        data={products}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.productItem}>
            <Text>{item.title}</Text>
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

export default FilteredProducts;
