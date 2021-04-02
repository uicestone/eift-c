import Axios, { AxiosRequestConfig } from "axios";
import Resource from "./Resource";
import {
  ConfigItem,
  User,
  File,
  Post,
  Capital,
  Business,
  Meeting,
  Contact,
  Investment,
} from "./interfaces";

export const http = Axios.create({
  baseURL: process.env.VUE_APP_API_BASE,
});

http.interceptors.request.use((request: AxiosRequestConfig) => {
  const token = window.localStorage.getItem("token");

  if (token) {
    request.headers["Authorization"] = token;
  }
  // stop request and return 401 response when no token exist except for login request
  if (
    !["auth/login", "config"].includes(request.url || "") &&
    !window.localStorage.getItem("token")
  ) {
    console.log(
      "trying to request auth required api but no token, redirect to login"
    );
    window.history.pushState(null, "登录", "/login");
    return Promise.reject(new Error("无效登录，请重新登录"));
  }
  return request;
});

http.interceptors.response.use(
  (res) => res,
  (err) => {
    // console.log("http.interceptors.response", err);
    const { response } = err;
    if (!response) return Promise.reject(err);
    // redirect to login page on any 401 response
    if (response.status === 401 && window.location.pathname !== "/login") {
      console.log("got 401 response, redirect login.");
      window.history.pushState(null, "登录", "/login");
      window.localStorage.removeItem("token");
    }
    return Promise.reject(err);
  }
);

export const BusinessResource = new Resource<Business>(http, "business/{id}");

export const CapitalResource = new Resource<Capital>(http, "capital/{id}");

export const ContactResource = new Resource<Contact>(http, "contact/{id}");

export const ConfigItemResource = new Resource<ConfigItem>(
  http,
  "config/{key}"
);

export const InvestmentResource = new Resource<Investment>(
  http,
  "contact/{id}"
);

export const FileResource = new Resource<File>(http, "file/{id}");

export const MeetingResource = new Resource<Meeting>(http, "meeting/{id}");

export const PostResource = new Resource<Post>(http, "post/{id}");

export const UserResource = new Resource<User>(http, "user/{id}");
