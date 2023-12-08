import React from "react";
import { SafeAreaView, StatusBar, ScrollView } from "react-native";
import { styles } from "../styles/styles";
import TicketForm from "../components/TicketForm";

const CreateTicketScreen = ({ route, navigation }) => {
  return (
    <SafeAreaView style={styles.containerStart}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <TicketForm route={route} navigation={navigation} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateTicketScreen;