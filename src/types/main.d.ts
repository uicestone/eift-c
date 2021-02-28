import Vue from "vue";
import { User, Config } from "@/resources/interfaces";

declare module "vue/types/vue" {
  interface Vue {
    $config: Config;
    $user: User;
    $version: string;
    $isDev: boolean;
  }
}
