<script setup>
import { ref, watch } from "vue";
import { useWeather } from "../api/weather";
const query = ref("");
const capeTownWeatherData = ref();
const suggestions = ref([]);
const showSuggestions = ref(false);
const searchedCitiesWeather = ref([]);
defineProps({
  msg: String,
});


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
function debounce(fn, delay) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
}
const searchCities = async (input) => {
  const trimmed = input.trim();
  if (!trimmed) return [];
  
  try {
    const data = await useWeather(trimmed);
    if (data && data.name) {
      // Return as an array of city objects
      return [{
        id: data.id,
        name: data.name,
        country: data.sys?.country
      }];
    }
    return [];
  } catch (error) {
    console.error("Error searching cities:", error);
    return [];
  }
};

// Fetch city suggestions as user types
const fetchCitySuggestions = async (input) => {
  const trimmed = input.trim();
  if (!trimmed) {
    suggestions.value = [];
    showSuggestions.value = false;
    return;
  }
  
  try {
    const cities = await searchCities(trimmed);
    suggestions.value = cities;
    showSuggestions.value = cities.length > 0;
  } catch (error) {
    suggestions.value = [];
    showSuggestions.value = false;
  }
};

// When a suggestion is selected
const selectSuggestion = async (city) => {
  query.value = city.name;
  showSuggestions.value = false;
  
  try {
    const data = await useWeather(city.name);
    // Check if this city is already in the list (by id or name)
    const exists = searchedCitiesWeather.value.some(
      c => c.id === data.id || c.name.toLowerCase() === data.name.toLowerCase()
    );
    if (!exists) {
      searchedCitiesWeather.value.push(data);
    }
    console.log("Selected city weather data:", data);
  } catch (error) {
    // Add an error card
    searchedCitiesWeather.value.push({
      name: city.name,
      error: true
    });
    console.error("Error fetching selected city weather:", error);
  }
};

// Handle keyboard navigation in the dropdown
const onInputKeydown = (event) => {
  if (event.key === "Enter" && suggestions.value.length === 1) {
    selectSuggestion(suggestions.value[0]);
  }
};

// Debounced version to avoid excessive API calls
const debouncedFetchCitySuggestions = debounce(fetchCitySuggestions, 500);

// Watch the query and fetch suggestions as user types
watch(query, (newVal) => {
  debouncedFetchCitySuggestions(newVal);
});


</script>

<template>
  <div v-if="capeTownWeatherData">
    <div class="card-container">
      <div class="weather-card">
        <div id="homepage-graphic-div">
          <img
            id="homepage-graphic"
            alt="girl-sitting-on-cloud-holding-sun"
            src="../assets/undraw_weather-app_4cp0.svg"
          />
        </div>
        <h1 class="btn">{{ capeTownWeatherData.name }}</h1>
        <p>Temperature: {{ capeTownWeatherData.main.temp }}°C</p>
        <div
          v-if="
            capeTownWeatherData.weather[0].description
              .toLowerCase()
              .includes('cloudy')
          "
        ></div>
        <p>Description: {{ capeTownWeatherData.weather[0].description }}</p>
        <p>Humidity: {{ capeTownWeatherData.main.humidity }}%</p>
        <p>Wind Speed: {{ capeTownWeatherData.wind.speed }} m/s</p>
      </div>
      <div style="position: relative;">
        <input
          type="text"
          v-model="query"
          placeholder="Search Weather..."
          @keydown="onInputKeydown"
          @focus="showSuggestions = suggestions.length > 0"
          @blur="setTimeout(() => showSuggestions = false, 100)"
        />
        <ul v-if="showSuggestions && suggestions.length" class="autocomplete-list">
          <li
            v-for="city in suggestions"
            :key="city.id || city.name"
            @mousedown.prevent="selectSuggestion(city)"
            class="autocomplete-item"
          >
            {{ city.name }}{{ city.country ? `, ${city.country}` : '' }}
          </li>
        </ul>
      </div>
  
    </div>
    <div class="row">
      <div class="col-6">
        <div class="card-container">
      <!-- Render a card for each searched city -->
      <div
        v-for="city in searchedCitiesWeather"
        :key="city.id || city.name"
        class="weather-card"
      >
        <template v-if="!city.error && city.main">
          <h1>{{ city.name }}</h1>
          <p>Temperature: {{ city.main?.temp }}°C</p>
          <p>Description: {{ city.weather?.[0]?.description }}</p>
          <p>Humidity: {{ city.main?.humidity }}%</p>
          <p>Wind Speed: {{ city.wind?.speed }} m/s</p>
        </template>
        <template v-else>
          <p>No weather data found for "{{ city.name }}"</p>
        </template>
      </div>
    </div>
      </div>
    </div>

  </div>
</template>
<style scoped>
.card-container {
  color:black;
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
.autocomplete-list {
  position: absolute;
  background: white;
  color: black;
  width: 100%;
  border: 1px solid #ccc;
  z-index: 10;
  max-height: 200px;
  overflow-y: auto;
  margin: 0;
  padding: 0;
  list-style: none;
  border-radius: 0.25rem;
}
.autocomplete-item {
  padding: 0.5rem;
  cursor: pointer;
}
.autocomplete-item:hover {
  background: #eee;
}
</style>

