import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { getWeatherData } from "../api/weather";

const Weather = ({ setSeason }) => {
  const [city, setCity] = useState("Toronto");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [seasonProduct, setSeasonProduct] = useState(null);

  useEffect(() => {
    fetchData(city);
  }, []);

  useEffect(() => {
    if (weatherData) {
      const temperature = weatherData.current.temp_c;
      let seasonValue = "";
      if (temperature > 30) {
        seasonValue = "Summer";
      } else if (temperature > 20) {
        seasonValue = "Spring";
      } else if (temperature > 10) {
        seasonValue = "Autumn";
      } else {
        seasonValue = "Winter";
      }

      setSeason(seasonValue);
      setSeasonProduct(seasonValue);
    }
  }, [weatherData]);

  const fetchData = async (city) => {
    try {
      setLoading(true);
      const data = await getWeatherData(city);
      setWeatherData(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchData(city);
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View>
      <Text>Weather App</Text>
      <Text>City: {city}</Text>
      <Text>Current Season: {seasonProduct}</Text>

      <TextInput
        placeholder="Enter city"
        value={city}
        onChangeText={(text) => setCity(text)}
      />
      <Button title="Get Weather" onPress={handleSearch} />
      {weatherData && (
        <View>
          <Text>City: {weatherData.location.name}</Text>
          <Text>Temperature: {weatherData.current.temp_c}°C</Text>
          <Text>Weather: {weatherData.current.condition.text}</Text>
          <Ionicons name="ios-sunny" size={50} color="yellow" />
        </View>
      )}
    </View>
  );
};

export default Weather;
