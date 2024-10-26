import AuthLayout from "../layouts/AuthLayout";
import DefaultLayout from "../layouts/DefaultLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";

export const routes = [
  { path: "/home", component: Home, layout: DefaultLayout },
  { path: "/", component: Login, layout: AuthLayout },
];
