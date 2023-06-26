<template>
  <div class="login">
    <h1 class="title">Login in the page</h1>
    <form action class="form" @submit.prevent="login">
      <label class="form-label" for="email">Email:</label>
      <input
        v-model="email"
        class="form-input"
        type="email"
        id="email"
        required
        placeholder="Email"
      />
      <label class="form-label" for="password">Password:</label>
      <input
        v-model="password"
        class="form-input"
        type="password"
        id="password"
        placeholder="Password"
      />
      <p v-if="error" class="error">
        {{ "Error: " + this.error }}
      </p>
      <input class="form-submit" type="submit" value="Login" />
    </form>
  </div>
</template>

<script>
import { loginUser } from "../api/service";
import { mapMutations } from "vuex";
import storage from "../utils/storage";
export default {
  data: () => ({
    email: "",
    password: "",
    error: false,
  }),
  methods: {
    ...mapMutations(["setLoggedIn"]),
    async login() {
      try {
        await loginUser({
          email: this.email,
          password: this.password,
        });
        this.setLoggedIn(storage.get("auth"));
        this.$router.push("/");
      } catch (error) {
        this.error = error.data.result;
        setTimeout(() => {
          this.error = false;
        }, 2000);
      }
    },
  },
};
</script>

<style scoped>
.login {
  padding: 2rem;
}
.title {
  text-align: center;
}
.form {
  margin: 3rem auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 80%;
  max-width: 350px;
  background: rgba(19, 35, 47, 0.9);
  border-radius: 5px;
  padding: 40px;
  box-shadow: 0 4px 10px 4px rgba(0, 0, 0, 0.3);
}
.form-label {
  margin-top: 2rem;
  color: white;
  margin-bottom: 0.5rem;
}
.form-input {
  padding: 10px 15px;
  background: none;
  background-image: none;
  border: 1px solid white;
  color: white;
}
.form-input:focus {
  outline: 0;
  border-color: #1ab188;
}
.form-submit {
  background: #1ab188;
  border: none;
  color: white;
  margin-top: 3rem;
  padding: 1rem 0;
  cursor: pointer;
  transition: background 0.2s;
}
.form-submit:hover {
  background: #0b9185;
}
.error {
  margin: 1rem 0 0;
  color: #ff4a96;
}

@media (max-width: 768px) {
  .form {
    width: 90%;
    max-width: 100%;
  }
}
</style>
