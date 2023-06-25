<template>
  <div id="layout">
    <header id="header">
      <router-link class="link" to="/">Home</router-link> |
      <router-link class="link" to="/login">Login</router-link> |
      <router-link class="link" to="/register">Register</router-link>
      <button v-on:click="logout" class="form-submit">Logout</button>
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
import { logoutService } from "../api/service";
export default {
  name: "LayuotApp",
  methods: {
    logout() {
      logoutService();
      const location = window.location.pathname;
      location === "/login" ? location : this.$router.push("/login");
    },
  },
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
.form-submit {
  background: #1ab188;
  border: none;
  color: white;
  padding: 1rem 1rem;
  cursor: pointer;
  transition: background 0.2s;
}
.form-submit:hover {
  background: #0b9185;
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
