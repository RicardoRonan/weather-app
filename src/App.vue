<script setup>
import HelloWorld from './components/HelloWorld.vue';
import { ref, watchEffect, onMounted } from "vue";
import { useWeather } from "./api/weather";

const query = "cape town";

const weatherData = ref(null);
const fetchWeather = async () => {
  try {
    const data = await useWeather(query);
    weatherData.value = data;
    console.log("Weather data:", weatherData.value);
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
};
fetchWeather();

watchEffect(() => {
  if (weatherData.value) {
    console.log("Weather data:", weatherData.value);
  } else {
    console.error("Could not fetch data");
  }
});

</script>

<template>
  <div>
    <div class="weather-card">

      <h1>{{weatherData.name}}</h1>
      <p>Temperature: {{weatherData.main.temp}}°C</p>
      <p>Description: {{weatherData.weather[0].description}}</p>
      <p>Humidity: {{weatherData.main.humidity}}%</p>
      <p>Wind Speed: {{weatherData.wind.speed}} m/s</p>
    </div>
    </div>
</template>

<script setup>

</script>


<script>

export default {
  name: "App"
};

</script>

<style scoped>
.weather-card{
background-color: white;
color: #000;
padding:1rem;
border-radius: 0.5rem;
}
</style>
