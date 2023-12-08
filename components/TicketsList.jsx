import React, { useState, useEffect } from 'react';
import { FlatList, View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

import { getFirestore, query, collection, getDocs } from 'firebase/firestore';
import { firestore } from '../firebaseConfig';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../styles/styles';

const TicketItem = ({ item }) => (
  <View style={styles.item}>
    <Text>{item.productName}</Text>
    <Text>{item.description}</Text>
    <Text>{item.location}</Text>
    <Image source={{ uri: item.photo }} style={styles.imageTicket} />
  </View>
);
const TicketsList = () => {
  const [tickets, setTickets] = useState([]);
  const navigation = useNavigation();

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
      <Text style={styles.title}>Tickets List</Text>
      <TouchableOpacity style={styles.buttonFull} onPress={() => navigation.navigate('ProductListScreen')}>
        <Text style={styles.buttonText}>Go to Product List</Text>
      </TouchableOpacity>
      <FlatList
        data={tickets}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => <TicketItem item={item} key={index.toString()} />}
      />
    </View>
  );
};


export default TicketsList;