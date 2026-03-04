import { createBrowserRouter, redirect } from "react-router";
import OnboardingPage from "./pages/OnboardingPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import OTPPage from "./pages/OTPPage";
import PINPage from "./pages/PINPage";
import AppLayout from "./pages/AppLayout";
import HomePage from "./pages/HomePage";
import SendPage from "./pages/SendPage";
import RequestPage from "./pages/RequestPage";
import BillsPage from "./pages/BillsPage";
import QRPage from "./pages/QRPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import CardsPage from "./pages/CardsPage";
import ProfilePage from "./pages/ProfilePage";

export const router = createBrowserRouter([
  {
    path: "/",
    loader: () => redirect("/onboarding"),
  },
  {
    path: "/onboarding",
    Component: OnboardingPage,
  },
  {
    path: "/signin",
    Component: SignInPage,
  },
  {
    path: "/signup",
    Component: SignUpPage,
  },
  {
    path: "/otp",
    Component: OTPPage,
  },
  {
    path: "/pin",
    Component: PINPage,
  },
  {
    path: "/app",
    Component: AppLayout,
    children: [
      {
        index: true,
        loader: () => redirect("/app/home"),
      },
      {
        path: "home",
        Component: HomePage,
      },
      {
        path: "send",
        Component: SendPage,
      },
      {
        path: "request",
        Component: RequestPage,
      },
      {
        path: "bills",
        Component: BillsPage,
      },
      {
        path: "qr",
        Component: QRPage,
      },
      {
        path: "analytics",
        Component: AnalyticsPage,
      },
      {
        path: "cards",
        Component: CardsPage,
      },
      {
        path: "profile",
        Component: ProfilePage,
      },
    ],
  },
]);
