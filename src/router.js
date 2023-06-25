import Vue from "vue";
import Router from "vue-router";

//import App from "./App";
import Home from "./components/HelloWorld.vue";
import LoginForm from "./components/LoginForm.vue";
import RegisterForm from "./components/RegisterForm.vue";

Vue.use(Router);

const routes = [
  { path: "/", name: "home", component: Home },
  { path: "/login", name: "login", component: LoginForm },
  { path: "/register", name: "register", component: RegisterForm },
];

const router = new Router({
  mode: "history",
  routes,
});

export default router;
