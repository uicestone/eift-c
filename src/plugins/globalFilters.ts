import moment from "moment";
import { VueConstructor } from "vue";

moment.locale("zh-cn");

const CommonFiltersPlugin = {
  install(Vue: VueConstructor) {
    Vue.filter("date", (value: any, format: string) => {
      if (!value) {
        return null;
      }
      return moment(value).format(format || "YYYY-MM-DD HH:mm");
    });

    Vue.filter("duration", (value: any) => {
      return moment.duration(value).humanize();
    });

    Vue.filter("round", (value: any, digits: number) => {
      if (!value) {
        return (0).toFixed(digits);
      }
      return value.toFixed(digits || 0);
    });

    Vue.filter(
      "currency",
      (value: any, precision: number = 2, lazyPrecision: boolean = false) => {
        if (value === undefined || value === null) return "-";
        let fixed = (+value).toFixed(precision);
        if (lazyPrecision) fixed = (+fixed).toString();
        return "¥ " + fixed;
      }
    );
  },
};

export default CommonFiltersPlugin;
