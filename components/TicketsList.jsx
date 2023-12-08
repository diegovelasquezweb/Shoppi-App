import React, { useState, useEffect } from 'react';
import { FlatList, View, Text, StyleSheet, Image } from 'react-native';

import { getFirestore, query, collection, getDocs } from 'firebase/firestore';
import { firestore } from '../firebaseConfig';

const TicketItem = ({ item }) => (
  <View style={styles.item}>
    <Text>{item.productName}</Text>
    <Text>{item.description}</Text>
    <Text>{item.location}</Text>
    <Image source={{ uri: item.photo }} style={styles.image} />
  </View>
);
const TicketsList = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      const ticketsQuery = query(collection(firestore, 'tickets'));
      const ticketsSnapshot = await getDocs(ticketsQuery);
      const ticketsList = ticketsSnapshot.docs.map(doc => doc.data());
      setTickets(ticketsList);
    };

    fetchTickets();

  }, []);

  return (
    <View>
      <Text>Tickets List</Text>
      <FlatList
        data={tickets}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => <TicketItem item={item} key={index.toString()} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  image: {
    width: 100,
    height: 100,
  },
});

export default TicketsList;