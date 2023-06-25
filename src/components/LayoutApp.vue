<template>
  <div id="layout">
    <header id="header">
      <router-link class="link" to="/">Home</router-link> |
      <router-link class="link" to="/login">Login</router-link> |
      <router-link class="link" to="/register">Register</router-link>
    </header>
    <main id="main">
      <router-view />
    </main>
    <footer id="footer">
      <h1 class="footerText">@Footer</h1>
    </footer>
  </div>
</template>

<script>
export default {
  name: "LayuotApp",
};
</script>

<style scoped>
#header {
  background-color: blue;
  min-height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  color: aliceblue;
}

.link {
  text-decoration: none;
  font-size: 24px;
  color: aliceblue;
}
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
