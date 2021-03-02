<template>
  <div>
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { http } from "@/resources";
import loadConfig from "./helpers/loadConfig";

@Component
export default class App extends Vue {
  pendingRequests = 0;
  configFetched = false;
  async created() {
    http.interceptors.request.use(this.requestFullfilled);
    http.interceptors.response.use(
      this.responseFullfilled,
      this.responseRejected
    );

    await this.loadConfig();

    this.$router.beforeResolve(async (to, from, next) => {
      // console.log("beforeResolve", to, from);
      if (to.path !== "/login" && !window.localStorage.getItem("token")) {
        console.log(
          "Router beforeResolve: not to login page but no token, redirect to login."
        );
        return this.$router.push("/login");
      } else if (to.path === "/login" && window.localStorage.getItem("token")) {
        console.log(
          "Router beforeResolve: to login page but has token, redirect to home."
        );
        return this.$router.push("/");
      }

      if (to.path === "/login") next();
      else {
        const config = await loadConfig(this.$config);
        if (config) this.$config = config;
        next();
      }
    });
  }

  requestFullfilled(request: AxiosRequestConfig) {
    this.pendingRequests++;

    // stop request and return 401 response when no token exist except for login request
    if (
      !["auth/login", "config"].includes(request.url || "") &&
      !window.localStorage.getItem("token")
    ) {
      this.pendingRequests--;
    }
    return request;
  }

  responseFullfilled(response: AxiosResponse) {
    this.pendingRequests--;
    return response;
  }

  responseRejected(err: any) {
    // console.log("App.responseRejected", err);
    this.pendingRequests--;
    const { response } = err;
    if (!response) {
      if (err.message === "Network Error") {
        const message = err.message;
        this.$notify({ title: message, message: "", type: "error" });
      }
      return Promise.reject(err);
    }
    if (response.status >= 500) {
      const message = "Internal Server Error";
      this.$notify({ title: message, message: "", type: "error" });

      return Promise.reject(new Error(message));
    } else if (response.status >= 400) {
      const message = response.data.message || response.statusText;
      this.$notify({ title: message, message: "", type: "warning" });
      return Promise.reject(new Error(message));
    }
    return response;
  }

  async loadConfig() {
    const config = await loadConfig();
    if (config) this.$config = config;
  }
}
</script>

<style>
html {
  /* font-size: 16px !important; */
}
.capitalize {
  text-transform: capitalize;
}
.uppercase {
  text-transform: uppercase;
}
.sticky {
  position: sticky;
  top: 0;
}
.btn-fixed-fab {
  width: 50px;
  height: 50px;
  font-size: 20px;
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 1000;
  outline: none;
}
</style>