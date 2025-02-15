import axios from "axios";

const URL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;


export const useWeather = async (query) => {
  const { data } = await axios.get(URL, {
    params: {
      q: query,      
      units: "metric",
      appid: API_KEY,  
    },
  });
        
  console.log("Data received from API:", data);
  return data;
};
