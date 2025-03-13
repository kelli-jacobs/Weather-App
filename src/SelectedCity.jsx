import { useState } from "react";
import axios from "axios";

function App() {
  const [selectedCity, setSelectedCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  // List of cities and states
  const cities = [
    { name: "New York, NY", value: "New York" },
    { name: "Los Angeles, CA", value: "Los Angeles" },
    { name: "Chicago, IL", value: "Chicago" },
    { name: "Houston, TX", value: "Houston" },
    { name: "Miami, FL", value: "Miami" },
  ];

  const fetchWeather = async () => {
    if (!selectedCity) return;
    try {
      setError(null);
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&units=metric&appid=${API_KEY}`
      );
      setWeather(response.data);
    } catch (err) {
      setError("City not found. Please try again.");
      setWeather(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">React Weather App</h1>

      {/* Dropdown for City Selection */}
      <select
        value={selectedCity}
        onChange={(e) => setSelectedCity(e.target.value)}
        className="p-2 border rounded-md mb-2"
      >
        <option value="">Select a city</option>
        {cities.map((city, index) => (
          <option key={index} value={city.value}>
            {city.name}
          </option>
        ))}
      </select>

      {/* Button to Fetch Weather */}
      <button
        onClick={fetchWeather}
        className="px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Get Weather
      </button>

      {/* Error Message */}
      {error && <p className="text-red-500 mt-2">{error}</p>}

      {/* Display Weather Info */}
      {weather && (
        <div className="mt-4 p-4 border rounded-md bg-white shadow-md">
          <h2 className="text-xl font-semibold">{weather.name}</h2>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Weather: {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}

export default App;
