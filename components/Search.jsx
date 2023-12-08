import React, { useState } from "react";
import { TextInput, View, Text } from "react-native";
import { styles } from "../styles/styles";

const Search = ({ onSearchChange }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (text) => {
    setSearchTerm(text);
    onSearchChange(text);
  };

  return (
    <View  style={styles.search}>
      <Text style={styles.header}>Product List</Text>
      <TextInput
       style={styles.input}
        placeholder="Search Products"
        value={searchTerm}
        onChangeText={handleSearchChange}
      />
    </View>
  );
};

export default Search;
