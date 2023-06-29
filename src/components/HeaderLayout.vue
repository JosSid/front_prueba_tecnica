<template>
  <header id="header">
    <router-link class="link" to="/">Users List</router-link> |
    <router-link class="link" to="/register">Sign Up</router-link> |
    <router-link v-if="!isLoggedIn" class="link" to="/login">Login</router-link>
    <button v-else v-on:click="logout" class="form-submit">Logout</button>
  </header>
</template>

<script>
import { logoutUser } from "../api/service";
import { mapState, mapMutations } from "vuex";

export default {
  name: "HeaderLayout",
  computed: {
    ...mapState(["isLoggedIn"]),
  },
  methods: {
    ...mapMutations(["setLoggedIn"]),
    logout() {
      logoutUser();
      this.setLoggedIn(false);
      const location = window.location.pathname;
      location === "/login" ? location : this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
#header {
  background-color: rgb(35, 36, 31);
  min-height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  color: aliceblue;
  position: sticky;
  top: 0;
}

.link {
  text-decoration: none;
  font-size: 24px;
  color: aliceblue;
}
.form-submit {
  background: #1ab188;
  border: none;
  border-radius: 10px;
  color: white;
  margin: 20px;
  padding: 1rem 20px;
  cursor: pointer;
  transition: background 0.2s;
}
.form-submit:hover {
  background: #0b9185;
}
</style>
