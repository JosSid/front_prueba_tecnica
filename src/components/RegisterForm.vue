<template>
  <div class="register">
    <h1 class="title">Sign Up</h1>
    <form action class="form" @submit.prevent="register">
      <label class="form-label" for="name">Name:</label>
      <input
        v-model="name"
        class="form-input"
        type="text"
        id="name"
        required
        placeholder="Name"
      />
      <label class="form-label" for="email">Email:</label>
      <input
        v-model="email"
        class="form-input"
        type="email"
        id="email"
        required
        placeholder="Email"
      />
      <label class="form-label" for="phone">Phone:</label>
      <input
        v-model="phone"
        class="form-input"
        type="phone"
        id="phone"
        required
        placeholder="Phone"
        maxlength="9"
        minlength="9"
      />
      <label class="form-label" for="password">Password:</label>
      <input
        v-model="password"
        class="form-input"
        type="password"
        id="password"
        required
        placeholder="Password"
        minlength="8"
      />
      <label class="form-label" for="password-repeat">Repeat password:</label>
      <input
        v-model="passwordRepeat"
        class="form-input"
        type="password"
        id="password-repeat"
        required
        placeholder="Password"
        minlength="8"
      />
      <p v-if="result" class="success">
        {{ "OK: " + this.result }}
      </p>
      <p v-if="error" class="error">
        {{ "Error: " + this.error }}
      </p>
      <input class="form-submit" type="submit" value="Sign Up" />
    </form>
  </div>
</template>

<script>
import { createUser, loginUser } from "../api/service";
import { mapMutations } from "vuex";
import storage from "../utils/storage";
const initialFormData = {
  name: "",
  email: "",
  phone: "",
  password: "",
  passwordRepeat: "",
};

export default {
  data: () => ({
    ...initialFormData,
    error: false,
    result: false,
  }),
  methods: {
    ...mapMutations(["setLoggedIn"]),
    async register() {
      this.error = false;
      if (this.password !== this.passwordRepeat) {
        this.error = "NO_MATCH_PASSWORDS";
        return;
      }
      const body = {};
      body.name = this.name;
      body.email = this.email;
      body.phone = this.phone;
      body.password = this.password;
      try {
        const response = await createUser(body);
        if (response.result === "SUCCESS") {
          this.result = response.result;
        }
        await loginUser({
          email: this.email,
          password: this.password,
        });
        this.setLoggedIn(storage.get("auth"));
        setTimeout(() => {
          this.$router.push("/");
        }, 2000);
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
.register {
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
.form-label:first-of-type {
  margin-top: 0rem;
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
.success {
  margin: 1rem 0 0;
  color: #0de80d;
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
