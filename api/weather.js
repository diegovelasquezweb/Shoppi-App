import { WEATHER_API_URL, WEATHER_API_KEY } from "@env";

const fetchWeatherData = async (city) => {
  try {
    const response = await fetch(
      `${WEATHER_API_URL}?key=${WEATHER_API_KEY}&q=${city}`
    );

    if (!response.ok) {
      throw new Error(`Error fetching weather data for ${city}`);
    }

    return await response.json();
  } catch (error) {
    throw error; // No es necesario lanzar un nuevo error aquí
  }
};

export const getWeatherData = async (city) => {
  try {
    const weatherData = await fetchWeatherData(city);
    return weatherData;
  } catch (error) {
    throw error;
  }
};
