import axios from "axios";
import Cookies from "js-cookie";

const COOKIES = {
  JWT_TOKEN: "personager_jwt",
};

export const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json; charset=utf-8",
  },
});

API.interceptors.request.use(
  (config) => {
    const token = Cookies.get(COOKIES.JWT_TOKEN);

    if (token) {
      config.headers!.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

API.interceptors.response.use(
  (response) => {
    console.log(response);
    if (response.headers?.authorization) {
      const match = response.headers.authorization.match(/Bearer (.*)/);
      if (match) {
        Cookies.set(COOKIES.JWT_TOKEN, match[1], {
          path: "/",
          expires: 2147483647,
        });
      }
    }

    return response;
  },
  (error) => Promise.reject(error)
);

export const API_ROUTES = {
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
};
