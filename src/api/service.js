import client, {
  removeAuthorizationHeader,
  setAuthorizationHeader,
} from "@/utils/client";
import storage from "@/utils/storage";

export const createService = (body) => {
  return client.post("/", body).then((data) => {
    return data;
  });
};

export const loginService = (credentials) => {
  return client.post("/login", credentials).then(({ token, result }) => {
    setAuthorizationHeader(token);
    storage.set("auth", token);
    return { token, result };
  });
};

export const logoutService = () => {
  return Promise.resolve().then(() => {
    removeAuthorizationHeader();
    storage.remove("auth");
  });
};
