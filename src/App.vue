<script setup>
import WeatherCard from './components/WeatherCard.vue';
import { ref, watchEffect } from "vue";
import { useWeather } from "./api/weather";

const query = '';

const weatherData = ref(null);
const filteredCities = () => {
  return this.cities.filter((city) =>
    city.name.toLowerCase().includes(this.query.toLowerCase())
  );
};
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
    console.log("Weather data NAME:", weatherData.value.city.name);
  } else {
    console.error("Could not fetch data");
  }
});

</script>

<template>
  <div>
    <input type="text" v-model="query" />
    <button @click="filteredCities()">Filter Cities</button>
    <button @click="fetchWeather()">Fetch Weather</button>
/>

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
