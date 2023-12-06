import React from "react";
import { SafeAreaView, StatusBar, View } from "react-native";
import { styles } from "../styles/styles";
import TicketForm from "../components/TicketForm";

const CreateTicketScreen = ({ route }) => {
  return (
    <SafeAreaView style={styles.container}>
    <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View>
        <TicketForm route={route} />
      </View>
    </SafeAreaView>
  );
};

export default CreateTicketScreen;