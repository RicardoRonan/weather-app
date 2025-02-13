<script setup>
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
</template>
<script>
methods:{
  const getData = () => {
  fetch('api.openweathermap.org/data/2.5/forecast?lat={33.9221° S}&lon={18.4231° E}&appid={a768194cc93b76c2846de378b21b683a}', {
    headers: { 'Content-type': 'application/json' },
  }).then(res=>res.json()).then((response) => {
    console.log({ response })
  }).catch((error) => {
    console.log('Looks like there was a problem: \n', error);
  });
}

getData();

}
</script>
<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
