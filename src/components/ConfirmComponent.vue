<template>
  <div class="container">
    <button
      @click="openWindow"
      class="button red"
      v-bind:class="{ [showButtonColor]: true }"
    >
      {{ title }}
    </button>
    <div v-if="showConfirm" class="notification-container">
      <div class="notification-body">
        <p>CONFIRM {{ title }}</p>
        <p>{{ message }}</p>
        <div>
          <button @click="cancel" type="button" class="button green">
            NOT CONFIRM
          </button>
          <button class="button red" @click="doTask">CONFIRM</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ConfirmComponent",
  props: {
    callBack: {
      type: Function,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    showButtonColor: {
      type: String,
    },
  },
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
      this.callBack();
    },
  },
};
</script>

<style>
.container {
  display: inline-block;
}
.button {
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
.green {
  background: #1ab188;
}
.green:hover {
  background: #0b9185;
}
.red {
  background-color: #de3b05;
}
.red:hover {
  background-color: #bf3204;
}
.blue {
  background-color: #025add;
}
.blue:hover {
  background-color: #0446a9;
}
.yellow {
  background-color: #e9f013;
}
.yellow:hover {
  background-color: #cad00d;
}
</style>
