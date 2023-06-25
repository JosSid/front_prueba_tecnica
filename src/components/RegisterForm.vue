<template>
  <div class="register">
    <h1 class="title">Sign Up</h1>
    <form action class="form" @submit.prevent="register">
      <label class="form-label" for="#name">Name:</label>
      <input
        v-model="name"
        class="form-input"
        type="text"
        id="name"
        required
        placeholder="Name"
      />
      <label class="form-label" for="#email">Email:</label>
      <input
        v-model="email"
        class="form-input"
        type="email"
        id="email"
        required
        placeholder="Email"
      />
      <label class="form-label" for="#phone">Phone:</label>
      <input
        v-model="phone"
        class="form-input"
        type="phone"
        id="phone"
        required
        placeholder="Phone"
      />
      <label class="form-label" for="#password">Password:</label>
      <input
        v-model="password"
        class="form-input"
        type="password"
        id="password"
        required
        placeholder="Password"
      />
      <label class="form-label" for="#password-repeat">Repeat password:</label>
      <input
        v-model="passwordRepeat"
        class="form-input"
        type="password"
        id="password-repeat"
        required
        placeholder="Password"
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
import { createService, loginService } from "../api/service";
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
    async register() {
      const body = {};
      body.name = this.name;
      body.email = this.email;
      body.phone = this.phone;
      body.password = this.password;
      try {
        const response = await createService(body);
        if (response.result === "SUCCESS") {
          this.result = response.result;
        }
        await loginService({
          email: this.email,
          password: this.password,
        });
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
  width: 20%;
  min-width: 350px;
  max-width: 100%;
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
  color: white;
  margin-top: 3rem;
  padding: 1rem 0;
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
</style>
