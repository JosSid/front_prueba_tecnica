<template>
  <div>
    <h1 class="title">Users List</h1>
    <table class="table">
      <thead>
        <tr class="tr">
          <th class="th">Name</th>
          <th class="th">Email</th>
          <th class="th">Phone</th>
          <th class="th">Go to Detail and actions</th>
        </tr>
      </thead>
      <tbody>
        <tr class="tr" v-for="user in users" :key="user._id">
          <td class="td">{{ user.name }}</td>
          <td class="td">{{ user.email }}</td>
          <td class="td">{{ user.phone }}</td>
          <td class="td">
            <button class="form-submit" @click="updateUser(user._id)">
              Detail/Update/Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-if="error" class="error">
      {{ "Error: " + this.error }}
    </p>
  </div>
</template>

<script>
import { getUsers } from "../api/service";
import { mapState } from "vuex";
export default {
  data() {
    return {
      users: [],
      error: false,
    };
  },
  computed: {
    ...mapState(["isLoggedIn"]),
  },
  mounted() {
    this.isLogged();
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      try {
        const users = await getUsers();
        this.users = users.users.reverse();
      } catch (error) {
        this.error = error.message;
      }
    },
    updateUser(userId) {
      this.$router.push(`/${userId}`);
    },
    isLogged() {
      if (!this.isLoggedIn) {
        this.$router.push("/login");
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title {
  text-align: center;
}
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

.actions {
  display: flex;
  justify-content: center;
}

.form-submit {
  background: #1ab188;
  border: none;
  border-radius: 10px;
  color: white;
  margin: 10px;
  padding: 1rem 20px;
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
</style>
