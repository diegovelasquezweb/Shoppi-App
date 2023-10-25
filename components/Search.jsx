import React, { useState } from "react";
import { TextInput, View } from "react-native";

const Search = ({ onSearchChange }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (text) => {
    setSearchTerm(text);
    onSearchChange(text);
  };

  return (
    <View>
      <TextInput
        placeholder="Buscar productos..."
        value={searchTerm}
        onChangeText={handleSearchChange}
      />
    </View>
  );
};

export default Search;
