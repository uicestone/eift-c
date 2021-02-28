import { http } from "@/resources";
import { Config, User } from "@/resources/interfaces";

async function getHttpData(path: string) {
  return new Promise((resolve) => {
    http
      .get(path)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        console.error(err.message);
        resolve(true);
      });
  });
}

const loadConfig = async (loaded: Config | null = null) => {
  const configLoaded: Partial<Config> = loaded || {};
  const [config, user] = await Promise.all([
    Object.keys(configLoaded).length ? configLoaded : getHttpData("config"),
    configLoaded.user || (localStorage.token && getHttpData("auth/user")),
  ]);

  const configAggregated = {
    ...(config as Config),
    user: user as User,
  } as Config;

  globalThis.localStorage.setItem("config", JSON.stringify(configAggregated));

  return configAggregated;
};

export function getLocalConfig() {
  const val = globalThis.localStorage.getItem("config");
  if (!val) return {} as Config;
  else return JSON.parse(val) as Config;
}

export default loadConfig;

export const defaultConfig = {
  daysPerMonth: 20,
  weeksPerMonth: 4,
  techFee: 299,
  minPrincipal: 10000,
  houseOriginationFee: 0.02,
  vb: 0.01,
  repCommissionDiscount: [],
  repCommissionDiscountByMtdVolume: [],
  stipLabels: [],
  entityTags: [],
  usStates: {},
  mcaContractRules: [],
  docusign: {
    accessToken: "",
    expiresAt: new Date(),
  },
  experian: {
    accessToken: "",
    expiresAt: new Date(),
  },
  applicationIdAutoIncrement: 1,
  riskModelDesc: {},
  buyRateAdjustment: [],
  schedulePISplitTheta: {
    weekly: 5 / 261,
    dailyDoubleDebit: 1 / 261,
    dailyNonDoubleDebit: 1 / 251,
  },
};
