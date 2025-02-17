<script setup>
import { ref } from 'vue'

defineProps({
  msg: String,
})

</script>

<template>
     <div class="weather-card">
      <h1>{{weatherData.name}}</h1>
      <p>Temperature: {{weatherData.main.temp}}°C</p>
      <p>Description: {{weatherData.weather[0].description}}</p>
      <p>Humidity: {{weatherData.main.humidity}}%</p>
      <p>Wind Speed: {{weatherData.wind.speed}} m/s</p>
    </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
