import client, {
  removeAuthorizationHeader,
  setAuthorizationHeader,
} from "../client";

import storage from "../../utils/storage";

export const register = (data) => {
  const userData = {
    nombre: data.name,
    apellidos: data.apellidos,
    email: data.email,
    nickname: data.nickname,
    password: data.password,
  };

  return client.post("register", userData).catch((error) => {
    return Promise.reject(error);
  });
};

export const login = (data) => {
  const credentials = { email: data.email, password: data.password };
  return client.post("login", credentials).then(({ token }) => {
    setAuthorizationHeader(token);
    if (data.remember) {
      storage.set("auth", token);
    }
  });
};

export const logout = () =>
  Promise.resolve().then(() => {
    removeAuthorizationHeader();
    storage.remove("auth");
  });

export const recoverPassword = (data) => {
  const email = { email: data.email };
  return client.post("password-reset", email).catch((error) => {
    return Promise.reject(error);
  });
};
