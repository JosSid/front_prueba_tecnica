<template>
  <div id="app">
    <layout-app />
  </div>
</template>

<script>
import LayoutApp from "./components/LayoutApp.vue";
export default {
  name: "App",
  components: {
    LayoutApp,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
