import qs from "qs";
import { cleanObject } from "./utils";
import { User } from "./types/user";

const localStorageKey = "__auth_provider_token_";

export const getToken = () => window.localStorage.getItem(localStorageKey);

export const handlerUserResponse = ({ user }: { user: User }) => {
  window.localStorage.setItem(localStorageKey, user.token || "");
  return user;
};
const apiUrl = process.env.REACT_APP_API_URL;
export const login = (data: { username: string; password: string }) => {
  return fetch(`${apiUrl}/login?${qs.stringify(cleanObject(data))}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (response) => {
    if (response.ok) {
      return handlerUserResponse(await response.json());
    } else {
      return Promise.reject(await response.json());
    }
  });
};

export const register = (data: { username: string; password: string }) => {
  return fetch(`${apiUrl}/register?${qs.stringify(cleanObject(data))}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (response) => {
    if (response.ok) {
      return handlerUserResponse(await response.json());
    } else {
      return Promise.reject(await response.json());
    }
  });
};

export const logout = async () =>
  window.localStorage.removeItem(localStorageKey);
