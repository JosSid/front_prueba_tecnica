<template>
  <div>
    <button @click="openWindow" class="button">DeleteUser</button>
    <div v-if="showConfirm" class="notification-container">
      <div class="notification-body">
        <p>{{ myTitle }}</p>
        <p>{{ myMessage }}</p>
        <div>
          <button @click="cancel" type="button" class="button">
            NOT CONFIRM
          </button>
          <button class="button button-delete" @click="doTask">CONFIRM</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ConfirmComponent",
  props: ["myCallBack", "myMessage", "myTitle"],
  data() {
    return {
      showConfirm: false,
    };
  },
  methods: {
    openWindow() {
      this.showConfirm = true;
    },
    cancel() {
      this.showConfirm = false;
    },
    doTask() {
      this.myCallBack();
    },
  },
};
</script>

<style>
.button {
  background: #1ab188;
  border: none;
  border-radius: 10px;
  color: white;
  margin: 20px;
  padding: 1rem 20px;
  cursor: pointer;
  transition: background 0.2s;
}
.button:hover {
  background: #0b9185;
}
.notification-container {
  background-color: rgba(33, 37, 37, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  z-index: 9999;
}

.notification-body {
  background-color: white;
  width: 50%;
  min-width: 300px;
  min-height: 50px;
  border-radius: 1rem;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 20px;
  font-size: 30px;
  margin-top: 70px;
}
.button-delete {
  background-color: #de3b05;
}
</style>
