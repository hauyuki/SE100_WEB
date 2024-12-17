import AuthLayout from "../layouts/AuthLayout";
import DefaultLayout from "../layouts/DefaultLayout";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Product from "../pages/Product";
import ProductDetail from "../pages/ProductDetail";
import Import from "../pages/Import";
import Report from "../pages/Report";
import Tag from "../pages/Tag";

export const routes = [
  { path: "/", component: Login, layout: AuthLayout },
  { path: "/dashboard", component: Dashboard, layout: DefaultLayout },
  { path: "/product", component: Product, layout: DefaultLayout },
  { path: "/product/:id", component: ProductDetail, layout: DefaultLayout },
  { path: "/import", component: Import, layout: DefaultLayout },
  { path: "/report", component: Report, layout: DefaultLayout },
  { path: "/tag", component: Tag, layout: DefaultLayout },
];
