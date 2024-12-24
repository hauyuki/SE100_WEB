import AuthLayout from "../layouts/AuthLayout";
import DefaultLayout from "../layouts/DefaultLayout";
import AdminLayout from "../layouts/AdminLayout";
import Login from "../pages/Login";
import Dashboard from "../pages/employee/dashboard/Dashboard";
import Product from "../pages/employee/products/Product";
import ProductDetail from "../pages/employee/products/ProductDetail";
import Import from "../pages/employee/import/Import";
import Report from "../pages/employee/reports/Report";
import ReportGenerator from "../pages/employee/reports/ReportGenerator";
import Tag from "../pages/employee/tags/Tag";
import AdminDashboard from "../pages/admin/dashboard";
import TagManagementPage from "../pages/admin/tags";
import AccountManagementPage from "../pages/admin/accounts";

export const routes = [
  { path: "/", component: Login, layout: AuthLayout },
  { path: "/dashboard", component: Dashboard, layout: DefaultLayout },
  { path: "/product", component: Product, layout: DefaultLayout },
  { path: "/product/:id", component: ProductDetail, layout: DefaultLayout },
  { path: "/import", component: Import, layout: DefaultLayout },
  { path: "/report", component: Report, layout: DefaultLayout },
  {
    path: "/report/generate",
    component: ReportGenerator,
    layout: DefaultLayout,
  },
  { path: "/tag", component: Tag, layout: DefaultLayout },

  {
    path: "/admin/dashboard",
    component: AdminDashboard,
    layout: AdminLayout,
  },
  { path: "/admin/products", component: AdminDashboard, layout: AdminLayout },
  { path: "/admin/import", component: AdminDashboard, layout: AdminLayout },
  { path: "/admin/reports", component: AdminDashboard, layout: AdminLayout },
  { path: "/admin/tags", component: TagManagementPage, layout: AdminLayout },
  {
    path: "/admin/accounts",
    component: AccountManagementPage,
    layout: AdminLayout,
  },
  { path: "/admin/settings", component: AdminDashboard, layout: AdminLayout },
];
