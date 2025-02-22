import Vue from "vue";
import Router from "vue-router";

//import App from "./App";
import Home from "../components/UsersList.vue";
import LoginForm from "../components/LoginForm.vue";
import RegisterForm from "../components/RegisterForm.vue";
import UserUpdater from "../components/UserUpdater.vue";
import NotFound from "../components/NotFound.vue";

Vue.use(Router);

const routes = [
  { path: "/", name: "home", component: Home },
  { path: "/login", name: "login", component: LoginForm },
  { path: "/register", name: "register", component: RegisterForm },
  { path: "/:id", component: UserUpdater },
  { path: "*", name: "notFound", component: NotFound },
];

const router = new Router({
  mode: "history",
  routes,
});

export default router;
