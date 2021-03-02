// Polyfills for js features used in the Dashboard but not supported in some browsers (mainly IE)
import "@/polyfills";
// Notifications plugin. Used on Notifications page
import Notifications from "@/components/NotificationPlugin";
// Validation plugin used to validate forms
import { configure } from "vee-validate";
// A plugin file where you could register global components used across the app
import GlobalComponents from "./globalComponents";
// A plugin file where you could register global directives
import GlobalDirectives from "./globalDirectives";

import GlobalVars from "./globalVars";

import GlobalFilter from "./globalFilters";

// Sidebar on the right. Used as a local plugin in DashboardLayout.vue
import SideBar from "@/components/SidebarPlugin";

// element ui language configuration
// @ts-ignore
import lang from "element-ui/lib/locale/lang/en";
// @ts-ignore
import locale from "element-ui/lib/locale";
locale.use(lang);

// asset imports
import "@/assets/sass/argon.scss";
import "@/assets/css/nucleo/css/nucleo.css";
import { extend } from "vee-validate";
import * as rules from "vee-validate/dist/rules";
// @ts-ignore
import { messages } from "vee-validate/dist/locale/zh_CN.json";
import { VueConstructor } from "vue/types/umd";

Object.keys(rules).forEach((rule) => {
  extend(rule, {
    // @ts-ignore
    ...rules[rule], // copies rule configuration
    message: messages[rule], // assign message
  });
});
export default {
  install(Vue: VueConstructor) {
    Vue.use(GlobalComponents);
    Vue.use(GlobalDirectives);
    Vue.use(GlobalVars);
    Vue.use(GlobalFilter);
    Vue.use(SideBar);
    Vue.use(Notifications);
    configure({
      classes: {
        valid: "is-valid",
        invalid: "is-invalid",
        dirty: ["is-dirty", "is-dirty"], // multiple classes per flag!
      },
    });
  },
};
