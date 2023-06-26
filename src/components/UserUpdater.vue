<template>
  <div>
    <div>
      <h3>{{ `User with ID: ${user._id}` }}</h3>
      <table class="table">
        <thead>
          <tr class="tr">
            <th class="th">Name</th>
            <th class="th">Email</th>
            <th class="th">Phone</th>
          </tr>
        </thead>
        <tbody>
          <tr class="tr">
            <td class="td">{{ user.name }}</td>
            <td class="td">{{ user.email }}</td>
            <td class="td">{{ user.phone }}</td>
          </tr>
        </tbody>
      </table>
      <button @click="setShowForm">Actualizar</button>
      <button @click="deleteUser(user._id)">Borrar</button>
    </div>
    <div v-if="showForm" class="register">
      <h3 class="title">Update Form</h3>
      <p>Fill in the fields you want to update</p>
      <form action class="form" @submit.prevent="updateUser(user._id)">
        <label class="form-label" for="name">Name:</label>
        <input
          v-model="name"
          class="form-input"
          type="text"
          id="name"
          placeholder="Name"
        />
        <label class="form-label" for="email">Email:</label>
        <input
          v-model="email"
          class="form-input"
          type="email"
          id="email"
          placeholder="Email"
        />
        <label class="form-label" for="phone">Phone:</label>
        <input
          v-model="phone"
          class="form-input"
          type="phone"
          id="phone"
          placeholder="Phone"
        />
        <label class="form-label" for="password">Password:</label>
        <input
          v-model="password"
          class="form-input"
          type="password"
          id="password"
          placeholder="Password"
        />
        <label class="form-label" for="password-repeat">Repeat password:</label>
        <input
          v-model="passwordRepeat"
          class="form-input"
          type="password"
          id="password-repeat"
          placeholder="Password"
        />
        <p v-if="result" class="success">
          {{ "OK: " + this.result }}
        </p>
        <p v-if="error" class="error">
          {{ "Error: " + this.error }}
        </p>
        <input class="form-submit" type="submit" value="Update User" />
      </form>
    </div>
  </div>
</template>

<script>
const initialFormData = {
  name: "",
  email: "",
  phone: "",
  password: "",
  passwordRepeat: "",
};
import { getUserById, deleteUserById } from "../api/service";
export default {
  data() {
    return {
      ...initialFormData,
      id: this.$route.params.id,
      user: {},
      showForm: false,
      result: false,
      error: false,
    };
  },
  mounted() {
    this.fetchUser();
  },
  methods: {
    async fetchUser() {
      try {
        const user = await getUserById(this.id);
        this.user = user.user;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteUser(userId) {
      try {
        await deleteUserById(userId);
        this.$router.push("/");
      } catch (error) {
        console.log(error);
      }
    },
    async updateUser() {
      this.error = false;
      const bodyUpdater = {};
      if (this.password !== this.passwordRepeat) {
        this.error = "NO_MATCH_PASSWORDS";
        return;
      }
      this.name ? (bodyUpdater.name = this.name) : bodyUpdater;
      this.email ? (bodyUpdater.email = this.email) : bodyUpdater;
      this.phone ? (bodyUpdater.phone = this.phone) : bodyUpdater;
      this.password ? (bodyUpdater.password = this.password) : bodyUpdater;
      this.passwordRepeat
        ? (bodyUpdater.passwordRepeat = this.passwordRepeat)
        : bodyUpdater;
      try {
        console.log(bodyUpdater);
      } catch (error) {
        console.log(error);
      }
    },
    setShowForm() {
      this.showForm = !this.showForm;
    },
  },
};
</script>

<style scoped>
.table {
  width: 100%;
  border-collapse: collapse;
}
.th,
.td {
  width: 25%;
  padding: 8px;
  text-align: left;
}
.th {
  background-color: #f2f2f2;
}

.tr:nth-child(even) {
  background-color: #f9f9f9;
}

.tr:hover {
  background-color: #e5e5e5;
}

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

@media (max-width: 768px) {
  .form {
    width: 90%;
    max-width: 100%;
  }
}
</style>
