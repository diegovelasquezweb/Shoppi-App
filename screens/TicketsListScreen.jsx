import React from "react";
import { SafeAreaView, StatusBar, View } from "react-native";
import { styles } from "../styles/styles";
import TicketsList from "../components/TicketsList";

const TicketsListScreen = ({ route }) => {
  return (
    <SafeAreaView style={styles.container}>
    <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View>
        <TicketsList route={route} />
      </View>
    </SafeAreaView>
  );
};

export default TicketsListScreen;