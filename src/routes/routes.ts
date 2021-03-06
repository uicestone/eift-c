import DashboardLayout from "@/views/Layout/DashboardLayout.vue";
import AuthLayout from "@/views/Pages/AuthLayout.vue";
// GeneralViews
import NotFound from "@/views/GeneralViews/NotFoundPage.vue";

const CapitalList = () =>
  import(/* webpackChunkName: "capital" */ "@/views/Capital/CapitalList.vue");
// Charts
const CapitalDetail = () =>
  import(/* webpackChunkName: "capital" */ "@/views/Capital/CapitalDetail.vue");

const BusinessList = () =>
  import(
    /* webpackChunkName: "business" */ "@/views/Business/BusinessList.vue"
  );
// Charts
const BusinessDetail = () =>
  import(
    /* webpackChunkName: "business" */ "@/views/Business/BusinessDetail.vue"
  );

// Calendar
const Calendar = () =>
  import(/* webpackChunkName: "extra" */ "@/views/Calendar/Calendar.vue");
// Charts
const Charts = () =>
  import(/* webpackChunkName: "dashboard" */ "@/views/Charts.vue");

// Components pages
const Buttons = () =>
  import(/* webpackChunkName: "components" */ "@/views/Components/Buttons.vue");
const Cards = () =>
  import(/* webpackChunkName: "components" */ "@/views/Components/Cards.vue");
const GridSystem = () =>
  import(
    /* webpackChunkName: "components" */ "@/views/Components/GridSystem.vue"
  );
const Notifications = () =>
  import(
    /* webpackChunkName: "components" */ "@/views/Components/Notifications.vue"
  );
const Icons = () =>
  import(/* webpackChunkName: "components" */ "@/views/Components/Icons.vue");
const Typography = () =>
  import(
    /* webpackChunkName: "components" */ "@/views/Components/Typography.vue"
  );

// Dashboard pages
const Dashboard = () =>
  import(/* webpackChunkName: "dashboard" */ "@/views/Dashboard/Dashboard.vue");
const AlternativeDashboard = () =>
  import(
    /* webpackChunkName: "dashboard" */ "@/views/Dashboard/AlternativeDashboard.vue"
  );
const Widgets = () =>
  import(/* webpackChunkName: "dashboard" */ "@/views/Widgets.vue");

// Forms pages
const FormElements = () =>
  import(/* webpackChunkName: "forms" */ "@/views/Forms/FormElements.vue");
const FormComponents = () =>
  import(/* webpackChunkName: "forms" */ "@/views/Forms/FormComponents.vue");
const FormValidation = () =>
  import(/* webpackChunkName: "forms" */ "@/views/Forms/FormValidation.vue");

// Maps pages
const GoogleMaps = () =>
  import(/* webpackChunkName: "extra" */ "@/views/Maps/GoogleMaps.vue");
const VectorMaps = () =>
  import(/* webpackChunkName: "extra" */ "@/views/Maps/VectorMaps.vue");

// Pages
const User = () =>
  import(/* webpackChunkName: "pages" */ "@/views/Pages/UserProfile.vue");
const Pricing = () =>
  import(/* webpackChunkName: "pages" */ "@/views/Pages/Pricing.vue");
const TimeLine = () =>
  import(/* webpackChunkName: "pages" */ "@/views/Pages/TimeLinePage.vue");
const Login = () =>
  import(/* webpackChunkName: "pages" */ "@/views/Pages/Login.vue");
const Home = () =>
  import(/* webpackChunkName: "pages" */ "@/views/Pages/Home.vue");
const Register = () =>
  import(/* webpackChunkName: "pages" */ "@/views/Pages/Register.vue");
const Lock = () =>
  import(/* webpackChunkName: "pages" */ "@/views/Pages/Lock.vue");

// TableList pages
const RegularTables = () =>
  import(/* webpackChunkName: "tables" */ "@/views/Tables/RegularTables.vue");
const SortableTables = () =>
  import(/* webpackChunkName: "tables" */ "@/views/Tables/SortableTables.vue");
const PaginatedTables = () =>
  import(/* webpackChunkName: "tables" */ "@/views/Tables/PaginatedTables.vue");
let componentsMenu = {
  path: "/components",
  component: DashboardLayout,
  redirect: "/components/buttons",
  name: "Components",
  children: [
    {
      path: "buttons",
      name: "Buttons",
      component: Buttons,
    },
    {
      path: "cards",
      name: "Cards",
      component: Cards,
    },
    {
      path: "grid-system",
      name: "Grid System",
      component: GridSystem,
    },
    {
      path: "notifications",
      name: "Notifications",
      component: Notifications,
    },
    {
      path: "icons",
      name: "Icons",
      component: Icons,
    },
    {
      path: "typography",
      name: "Typography",
      component: Typography,
    },
  ],
};
let formsMenu = {
  path: "/forms",
  component: DashboardLayout,
  redirect: "/forms/elements",
  name: "Forms",
  children: [
    {
      path: "elements",
      name: "Form elements",
      component: FormElements,
    },
    {
      path: "components",
      name: "Form components",
      component: FormComponents,
    },
    {
      path: "validation",
      name: "Form validation",
      component: FormValidation,
    },
  ],
};

let tablesMenu = {
  path: "/tables",
  component: DashboardLayout,
  redirect: "/table/regular",
  name: "Tables menu",
  children: [
    {
      path: "regular",
      name: "Tables",
      component: RegularTables,
    },
    {
      path: "sortable",
      name: "Sortable",
      component: SortableTables,
    },
    {
      path: "paginated",
      name: "Paginated Tables",
      component: PaginatedTables,
    },
  ],
};

let mapsMenu = {
  path: "/maps",
  component: DashboardLayout,
  name: "Maps",
  redirect: "/maps/google",
  children: [
    {
      path: "google",
      name: "Google Maps",
      component: GoogleMaps,
    },
    {
      path: "vector",
      name: "Vector Map",
      component: VectorMaps,
    },
  ],
};

let pagesMenu = {
  path: "/pages",
  component: DashboardLayout,
  name: "Pages",
  redirect: "/pages/user",
  children: [
    {
      path: "user",
      name: "User Page",
      component: User,
    },
    {
      path: "timeline",
      name: "Timeline Page",
      component: TimeLine,
    },
  ],
};

let capitalMenu = {
  path: "/capital",
  component: DashboardLayout,
  name: "投资机构",
  redirect: "/capital/index",
  children: [
    {
      path: "index",
      name: "投资机构列表",
      component: CapitalList,
      meta: { keepAlive: true },
    },
    {
      path: ":id",
      name: "投资机构详情",
      component: CapitalDetail,
    },
  ],
};

let businessMenu = {
  path: "/business",
  component: DashboardLayout,
  name: "被投企业",
  redirect: "/business/index",
  children: [
    {
      path: "index",
      name: "被投企业列表",
      component: BusinessList,
      meta: { keepAlive: true },
    },
    {
      path: ":id",
      name: "被投企业详情",
      component: BusinessDetail,
    },
  ],
};

let authPages = {
  path: "/",
  component: AuthLayout,
  name: "Authentication",
  children: [
    // {
    //   path: "/home",
    //   name: "Home",
    //   component: Home,
    //   meta: {
    //     noBodyBackground: true,
    //   },
    // },
    {
      path: "/login",
      name: "Login",
      component: Login,
    },
    {
      path: "/register",
      name: "Register",
      component: Register,
    },
    {
      path: "/pricing",
      name: "Pricing",
      component: Pricing,
    },
    {
      path: "/lock",
      name: "Lock",
      component: Lock,
    },
    { path: "*", component: NotFound },
  ],
};

const routes = [
  {
    path: "/",
    redirect: "/dashboard",
    name: "Home",
  },
  componentsMenu,
  formsMenu,
  tablesMenu,
  mapsMenu,
  pagesMenu,
  capitalMenu,
  businessMenu,
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/dashboard",
    name: "首页",
    children: [
      {
        path: "dashboard",
        name: "数据统计",
        component: Dashboard,
      },
      {
        path: "alternative",
        name: "Alternative",
        component: AlternativeDashboard,
        meta: {
          navbarType: "light",
        },
      },
      {
        path: "calendar",
        name: "Calendar",
        component: Calendar,
      },
      {
        path: "charts",
        name: "Charts",
        component: Charts,
      },
      {
        path: "widgets",
        name: "Widgets",
        component: Widgets,
      },
    ],
  },
  authPages,
];

export default routes;
