import React, { useState } from "react";
import { Text, View } from "react-native";

const UserBar = ({ userData }) => {




  return (
    <View>
      <Text>Welcome, {userData.firstName} {userData.lastName}</Text>
      <Text>{userData.email}</Text>
    </View>
  );
};

export default UserBar;
