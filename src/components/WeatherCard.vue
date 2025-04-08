<script setup>
import { ref } from "vue";
import { useWeather } from "../api/weather";

defineProps({
  msg: String,
});

const capeTownWeatherData = ref();

const fetchWeather = async () => {
  try {
    const queryCapeTown = "Cape Town";
    const data = await useWeather(queryCapeTown);
    capeTownWeatherData.value = data;
    console.log("Weather data:", capeTownWeatherData.value);
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
};
fetchWeather();
</script>

<template>
    
  <div v-if="capeTownWeatherData">
    <div class="card-container">
      <div class="weather-card">
        <div id="homepage-graphic-div">
      <img id="homepage-graphic" alt="girl-sitting-on-cloud-holding-sun" src="../assets/undraw_weather-app_4cp0.svg">
    </div>
        <h1>{{ capeTownWeatherData.name }}</h1>
        <p>Temperature: {{ capeTownWeatherData.main.temp }}°C</p>
        <div v-if="capeTownWeatherData.weather[0].description.toLowerCase().includes('cloudy')"></div>
        <p>Description: {{ capeTownWeatherData.weather[0].description }}</p>
        <p>Humidity: {{ capeTownWeatherData.main.humidity }}%</p>
        <p>Wind Speed: {{ capeTownWeatherData.wind.speed }} m/s</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-container {
  color: white;
  position: relative;
  font-family: sans-serif;
}
.card-container::before {
  content: "";
  background-color: #fab5704c;
  border-radius: 50%;
  width: 6rem;
  height: 6rem;
  top: 30%;
  right: 7%;
  position: absolute;
}
.card-container::after {
  content: "";
  position: absolute;
  height: 3rem;
  top: 8%;
  right: 5%;
  border: 1px solid;
}
.card-container .weather-card {
  background-color: rgba(255, 255, 255, 0.074);
  border: 1px solid rgba(255, 255, 255, 0.222);
  -webkit-backdrop-filter: blur(20px);
  backdrop-filter: blur(20px);
  border-radius: 0.5rem;
  width: auto;
  height: auto;
  margin: 1rem;
}
#homepage-graphic {
  width: 100%;
  height: auto;
}
#homepage-graphic-div {
  height: auto;
  width: 20rem;
  padding: 1.5rem;
}
</style>