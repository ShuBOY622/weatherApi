const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

// Weather API endpoint
app.post('/getWeather', async (req, res) => {
  const { cities } = req.body;

  try {
    const weatherData = await fetchWeatherData(cities);
    res.json({ weather: weatherData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

// Fetch weather data from external API
async function fetchWeatherData(cities) {
  const apiKey = '588ffec131d74a76b55174244230306'; // Replace with your actual weather API key
  const weatherData = {};

  for (const city of cities) {
    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`
      );
      const { temp_c } = response.data.current;
      weatherData[city] = `${temp_c}C`;
    } catch (error) {
      console.error(`Failed to fetch weather data for ${city}:`, error);
      weatherData[city] = 'N/A';
    }
  }

  return weatherData;
}

// Start the server
const port = 3000; 
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
