<script setup>
import WeatherCard from './components/WeatherCard.vue';
import { useWeather } from "./api/weather";
import { ref, watchEffect } from "vue";
const query = ref("");
const filteredData = ref([])

const search = async (e) => {
  if (e.key === 'Enter') {
    const input = query.value.trim();

    if (!input) {
      console.log('Search query is empty.');
      return;
    }

    try {
      const data = await useWeather(input);
      filteredData.value = data;
      console.log("Searched Weather data:", filteredData.value);
    } catch (error) {
      console.error("Error fetching searched weather data:", error);
    }
  }
};

watchEffect(() => {
  if (filteredData.value) {
    console.log("Weather data:", filteredData.value);
  } else {
    console.error("Could not fetch data");
  }
});
</script>

<template>
  <div>
    <input type="text" v-model="query" @keypress="search"  placeholder="Search Weather..."/>
    <div class="card-container">
    <div v-if="filteredData.length != 0" class="weather-card">
      <h1>{{filteredData.name}}</h1>
      <p>Temperature: {{filteredData.main.temp}}°C</p>
      <p>Description: {{filteredData.weather[0].description}}</p>
      <p>Humidity: {{filteredData.main.humidity}}%</p>
      <p>Wind Speed: {{filteredData.wind.speed}} m/s</p>
    </div>
    </div>
    <WeatherCard></WeatherCard>
  
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


</style>
