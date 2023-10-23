import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { SHOPIFY_API_URL, SHOPIFY_ACCESS_TOKEN } from '@env';

const App = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${SHOPIFY_API_URL}/products.json`, {
      method: 'GET',
      headers: {
        'X-Shopify-Access-Token': SHOPIFY_ACCESS_TOKEN,
      },
    })
      .then((response) => response.json())
      .then((data) => setProducts(data.products))
      .catch((error) => console.error('Error fetching Shopify products:', error));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Text style={styles.header}>Productos de Shopify:</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.productItem}>
            <Text>{item.title}</Text>
            <Text>Precio: ${item.variants[0].price}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 20,
  },
  productItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default App;
