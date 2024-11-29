import AuthLayout from "../layouts/AuthLayout";
import DefaultLayout from "../layouts/DefaultLayout";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Product from "../pages/Product";

export const routes = [
  { path: "/", component: Dashboard, layout: DefaultLayout },
  { path: "/dashboard", component: Dashboard, layout: DefaultLayout },
  { path: "/login", component: Login, layout: AuthLayout },
  { path: "/product", component: Product, layout: DefaultLayout },
];
