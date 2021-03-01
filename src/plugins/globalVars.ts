import { VueConstructor } from "vue";
import { User } from "@/resources/interfaces";
import Component from "vue-class-component";

const GlobalLibrariesPlugins = {
  install(Vue: VueConstructor) {
    Component.registerHooks([
      "beforeRouteEnter",
      "beforeRouteUpdate",
      "beforeRouteLeave",
    ]);

    // global library setup
    Object.defineProperty(Vue.prototype, "$version", {
      get() {
        return process.env.VERSION;
      },
    });

    Object.defineProperty(Vue.prototype, "$isDev", {
      get() {
        return process.env.NODE_ENV === "development";
      },
    });

    Object.defineProperty(Vue.prototype, "$pendingRequests", {
      get() {
        if (!this.$root.pendingRequests) this.$root.pendingRequests = 0;
        return this.$root.pendingRequests;
      },
      set(val) {
        this.$root.pendingRequests = val;
      },
    });

    Object.defineProperty(Vue.prototype, "$config", {
      get() {
        return this.$root.config;
      },
      set(v) {
        this.$root.config = v;
      },
    });

    const can = function (this: User, cap: string) {
      const roleCaps: Record<string, string> = {
        admin: ".*",
        scrubber: "view-(dashboard|iso|business|application)|edit-application",
        uwer:
          "view-(dashboard|iso|business|application|user)|create-offer|edit-application",
        rep: "view-(application)|review-mod-request|fine-tune",
        iso: "view-(business|application)|add-(business)",
      };
      return this.role && cap.match(new RegExp(`^${roleCaps[this.role]}$`));
    };

    Object.defineProperty(Vue.prototype, "$user", {
      get() {
        if (!this.$root.config.user) {
          this.$root.config.user = {};
        }
        this.$root.config.user.can = can;
        return this.$root.config.user;
      },
      set(v) {
        this.$root.config.user = v;
      },
    });

    Object.defineProperty(Vue.prototype, "$clipboard", {
      get() {
        return (v: string, name: string = "Text") => {
          this.$copyText(v);
          this.$notify(`${name} 已复制`);
        };
      },
    });
  },
};

export default GlobalLibrariesPlugins;
