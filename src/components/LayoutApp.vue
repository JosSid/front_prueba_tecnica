<template>
  <div id="layout">
    <header id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/login">Login</router-link>
    </header>
    <main id="main">
      <router-view />
    </main>
    <footer id="footer">
      <h1 class="footerText">All rigths reserved</h1>
    </footer>
  </div>
</template>

<script>
export default {
  name: "LayuotApp",
};
</script>

<style scoped>
#footer {
  margin-top: 100px;
  background-color: blue;
  color: aliceblue;
  min-height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
