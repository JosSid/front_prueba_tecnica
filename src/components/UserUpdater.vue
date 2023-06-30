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
      <button class="form-submit" @click="setShowForm">Open Update Form</button>
      <ConfirmComponent
        :title="title"
        :message="message"
        :callBack="deleteUserCB"
        :showButtonColor="buttonColor"
      />
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
          minlength="9"
          maxlength="9"
        />
        <label class="form-label" for="password">Password:</label>
        <input
          v-model="password"
          class="form-input"
          type="password"
          id="password"
          placeholder="Password"
          minlength="8"
        />
        <label class="form-label" for="password-repeat">Repeat password:</label>
        <input
          v-model="passwordRepeat"
          class="form-input"
          type="password"
          id="password-repeat"
          placeholder="Password"
          minlength="8"
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
import { getUserById, deleteUserById, updateUserById } from "../api/service";
import ConfirmComponent from "@/components/ConfirmComponent.vue";
export default {
  components: {
    ConfirmComponent,
  },
  data() {
    return {
      ...initialFormData,
      id: this.$route.params.id,
      user: {},
      showForm: false,
      result: false,
      error: false,
      title: "Delete user",
      message: "Are you sure for delete user ?",
      buttonColor: "blue",
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
        return this.user;
      } catch (error) {
        this.$router.push("/");
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
    deleteUserCB() {
      this.deleteUser(this.user._id);
    },
    async updateUser() {
      this.error = false;
      const bodyUpdater = {};
      if (this.password) {
        if (this.password !== this.passwordRepeat) {
          this.error = "NO_MATCH_PASSWORDS";
          return;
        } else {
          bodyUpdater.password = this.password;
        }
      }
      this.name
        ? (bodyUpdater.name = this.name)
        : (bodyUpdater.name = this.user.name);
      this.email
        ? (bodyUpdater.email = this.email)
        : (bodyUpdater.email = this.user.email);
      this.phone
        ? (bodyUpdater.phone = this.phone)
        : (bodyUpdater.phone = this.user.phone);
      try {
        const updatedUser = await updateUserById(this.id, bodyUpdater);
        this.result = updatedUser.result;
        this.fetchUser();
        setTimeout(() => {
          this.result = false;
          this.setShowForm();
        }, 2000);
      } catch (error) {
        this.error = error.data.result;
        setTimeout(() => {
          this.error = false;
        }, 2000);
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
.form-submit,
.form-delete {
  background: #1ab188;
  border: none;
  border-radius: 10px;
  color: white;
  margin: 20px;
  padding: 1rem 20px;
  cursor: pointer;
  transition: background 0.2s;
}
.form-delete {
  background-color: #de3b05;
}
.form-submit:hover {
  background: #0b9185;
}
.form-delete:hover {
  background-color: #bf3204;
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
