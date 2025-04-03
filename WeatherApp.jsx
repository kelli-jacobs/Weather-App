import { useState } from "react";
import axios from "axios";



function WeatherApp() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  const backgroundImage = {            
    backgroundImage: 'url(images/sky.jpg)',         
    backgroundSize: 'auto',    
    backgroundRepeat: 'no-repeat',    
    backgroundPosition: 'absolute',  
    height: '30vh',        
    justifyContent: 'center',         alignItems: 'center',         
    color: 'white'}
  
  const fetchWeather = async () => {
    if (!city) return;
    try {
      setError(null);
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      );
      setWeather(response.data);
    } catch (err) {
      setError("City not found. Please try again.");
      setWeather(null);
    }
  };

  const convertToFahrenheit = (celsius) => {
    return (celsius * 9/5) + 32;
  };

  return (
    <div id="container">
      <h1 className="text-2xl font-bold mb-4">React Weather App</h1>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="p-2 border rounded-md mb-2"
      />

      <button
        onClick={fetchWeather}
        className="px-4 py-2 bg-blue-500 text-black rounded-md"
      >
        Get Weather
        <br/>
      </button>
      <br/>
      <br/>
      {error && <p class="text-red-500 mt-2">{error}</p>}
      {weather && (
  <div className="card shadow-0 border">
    <div className="card-body"
        style={ backgroundImage }
    >
    <h2 className="text-xl font-semibold">{weather.name}</h2>
    <br/>
    <p className="mb-2">Temperature: {weather.main.temp}°C / {convertToFahrenheit(weather.main.temp).toFixed(1)}°F</p>
    <p className="mb-0 me-4">Weather: {weather.weather[0].description}</p>
  
    </div>

    
  </div>
)}

    </div>
  );
}

export default WeatherApp;
