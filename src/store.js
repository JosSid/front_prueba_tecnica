import Vue from "vue";
import Vuex from "vuex";
import storage from "./utils/storage";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoggedIn: storage.get("auth"),
  },
  mutations: {
    setLoggedIn(state, value) {
      state.isLoggedIn = value;
    },
  },
});
