import client, {
  removeAuthorizationHeader,
  setAuthorizationHeader,
} from "@/utils/client";
import storage from "@/utils/storage";

export const getUsers = () => {
  return client.get("/").then((response) => {
    return response;
  });
};

export const getUserById = (userId) => {
  return client.get(`/${userId}`).then((response) => {
    return response;
  });
};

export const createUser = (body) => {
  return client.post("/", body).then((data) => {
    return data;
  });
};

export const loginUser = (credentials) => {
  return client.post("/login", credentials).then(({ token, result }) => {
    setAuthorizationHeader(token);
    storage.set("auth", token);
    return { token, result };
  });
};

export const logoutUser = () => {
  removeAuthorizationHeader();
  storage.remove("auth");
};

export const updateUserById = (userId, body) => {
  return client.put(`/${userId}`, body).then((response) => response);
};

export const deleteUserById = (userId) => {
  return client.delete(`/${userId}`).then((data) => data);
};
