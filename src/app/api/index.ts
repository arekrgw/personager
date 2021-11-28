import axios from "axios";
import Cookies from "js-cookie";

const COOKIES = {
  JWT_TOKEN: "personager_jwt",
};

export const getBearer = (cookies?: Record<string, string>) => {
  if (cookies && cookies[COOKIES.JWT_TOKEN]) {
    return `Bearer ${cookies[COOKIES.JWT_TOKEN]}`;
  }
  const token = Cookies.get(COOKIES.JWT_TOKEN);

  if (token) {
    return `Bearer ${token}`;
  }

  return null;
};

export const createApiClient = (cookies?: Record<string, string>) => {
  const API = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json; charset=utf-8",
      Authorization: getBearer(cookies) || "",
    },
  });

  API.interceptors.request.use(
    (config) => {
      if (typeof window !== "undefined") {
        const token = getBearer();
        config.headers!.Authorization = token || "";
      }

      return config;
    },
    (error) => Promise.reject(error)
  );

  API.interceptors.response.use(
    (response) => {
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

  return API;
};

export const API = createApiClient();

export const API_ROUTES = {
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  EVENTS: {
    ALL: "/events",
    ONE: (id: string) => `/events/one/${id}`,
    DELETE: (id: string) => `/events/delete/${id}`,
    UPDATE: (id: string) => `/events/update/${id}`,
    CREATE: `/events/create`,
  },
  TODOS: {
    ALL: "/todos",
    ONE: (id: string) => `/todos/one/${id}`,
    DELETE: (id: string) => `/todos/delete/${id}`,
    UPDATE: (id: string) => `/todos/update/${id}`,
    CREATE: `/todos/create`,
  },
};
