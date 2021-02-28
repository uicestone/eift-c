<template>
  <div>
    <!-- Header -->
    <div class="header bg-gradient-primary py-7 py-lg-8 pt-lg-9">
      <div class="container">
        <div class="header-body text-center mb-7">
          <div class="row justify-content-center">
            <div class="col-xl-5 col-lg-6 col-md-8 px-5">
              <h1 class="text-white">E-Mobility</h1>
              <p class="text-lead text-white">流程跟踪系统</p>
            </div>
          </div>
        </div>
      </div>
      <div class="separator separator-bottom separator-skew zindex-100">
        <svg
          x="0"
          y="0"
          viewBox="0 0 2560 100"
          preserveAspectRatio="none"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon class="fill-default" points="2560 0 2560 100 0 100" />
        </svg>
      </div>
    </div>
    <!-- Page content -->
    <div class="container mt--8 pb-5">
      <div class="row justify-content-center">
        <div class="col-lg-5 col-md-7">
          <div class="card bg-secondary border-0 mb-0">
            <!-- <div class="card-header bg-transparent pb-5">
              <div class="text-muted text-center mt-2 mb-3">
                <small>Sign in with</small>
              </div>
              <div class="btn-wrapper text-center">
                <a href="#" class="btn btn-neutral btn-icon">
                  <span class="btn-inner--icon">
                    <img src="img/icons/common/github.svg" />
                  </span>
                  <span class="btn-inner--text">Github</span>
                </a>
                <a href="#" class="btn btn-neutral btn-icon">
                  <span class="btn-inner--icon">
                    <img src="img/icons/common/google.svg" />
                  </span>
                  <span class="btn-inner--text">Google</span>
                </a>
              </div>
            </div>-->
            <div class="card-body px-lg-5 py-lg-5">
              <!-- <div class="text-center text-muted mb-4">
                <small>Or sign in with credentials</small>
              </div>-->
              <validation-observer v-slot="{ handleSubmit }" ref="formValidator">
                <form role="form" @submit.prevent="handleSubmit(submitLogin)">
                  <base-input
                    alternative
                    class="mb-3"
                    name="用户名"
                    :rules="{ required: true }"
                    prepend-icon="ni ni-email-83"
                    placeholder="用户名"
                    v-model="login"
                  ></base-input>

                  <base-input
                    alternative
                    class="mb-3"
                    name="密码"
                    :rules="{ required: true, min: 4 }"
                    prepend-icon="ni ni-lock-circle-open"
                    type="password"
                    placeholder="密码"
                    v-model="password"
                  ></base-input>

                  <base-checkbox v-model="rememberMe">不再要求登录</base-checkbox>
                  <div class="text-center">
                    <base-button type="primary" native-type="submit" class="my-4">登录</base-button>
                  </div>
                </form>
              </validation-observer>
            </div>
          </div>
          <div class="row mt-3">
            <!-- <div class="col-6">
              <router-link to="/dashboard" class="text-light">
                <small>Forgot password?</small>
              </router-link>
            </div>
            <div class="col-6 text-right">
              <router-link to="/register" class="text-light">
                <small>Create new account</small>
              </router-link>
            </div>-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { http } from "@/resources";

@Component
export default class Login extends Vue {
  login = "";
  password = "";
  rememberMe = false;
  async submitLogin() {
    try {
      const { login, password } = this;
      const {
        data: { user, token },
      } = await http.post("auth/login", {
        login,
        password,
      });
      window.localStorage.setItem("token", token);
      this.$user = user;
      this.$router.push("/");
    } catch (err) {
      console.error(err.message);
    }
  }
}
</script>
