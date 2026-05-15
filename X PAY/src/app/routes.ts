import { createBrowserRouter } from "react-router";
import { Splash } from "./components/Splash";
import { Onboarding } from "./components/Onboarding";
import { Language } from "./components/Language";
import { Permissions } from "./components/Permissions";
import { Login } from "./components/Login";
import { Home } from "./components/Home";
import { SendMoney } from "./components/SendMoney";
import { QRScan } from "./components/QRScan";
import { Transactions } from "./components/Transactions";
import { Analytics } from "./components/Analytics";
import { Cards } from "./components/Cards";
import { Rewards } from "./components/Rewards";
import { Profile } from "./components/Profile";
import { Budget } from "./components/Budget";
import { Notifications } from "./components/Notifications";
import { AccountPreferences } from "./components/AccountPreferences";
import { Support } from "./components/Support";
import { PersonalInfo } from "./components/PersonalInfo";
import { LinkedDevices } from "./components/LinkedDevices";
import { Security } from "./components/Security";
import { AppSettings } from "./components/AppSettings";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Splash,
  },
  {
    path: "/onboarding",
    Component: Onboarding,
  },
  {
    path: "/language",
    Component: Language,
  },
  {
    path: "/permissions",
    Component: Permissions,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/home",
    Component: Home,
  },
  {
    path: "/send",
    Component: SendMoney,
  },
  {
    path: "/scan",
    Component: QRScan,
  },
  {
    path: "/transactions",
    Component: Transactions,
  },
  {
    path: "/analytics",
    Component: Analytics,
  },
  {
    path: "/cards",
    Component: Cards,
  },
  {
    path: "/rewards",
    Component: Rewards,
  },
  {
    path: "/profile",
    Component: Profile,
  },
  {
    path: "/budget",
    Component: Budget,
  },
  {
    path: "/notifications",
    Component: Notifications,
  },
  {
    path: "/preferences",
    Component: AccountPreferences,
  },
  {
    path: "/support",
    Component: Support,
  },
  {
    path: "/personal-info",
    Component: PersonalInfo,
  },
  {
    path: "/linked-devices",
    Component: LinkedDevices,
  },
  {
    path: "/security",
    Component: Security,
  },
  {
    path: "/app-settings",
    Component: AppSettings,
  },
]);
