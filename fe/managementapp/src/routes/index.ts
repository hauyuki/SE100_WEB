import AuthLayout from "../layouts/AuthLayout";
import DefaultLayout from "../layouts/DefaultLayout";
import AdminLayout from "../layouts/AdminLayout";
import Login from "../pages/Login";
import Dashboard from "../pages/employee/dashboard/Dashboard";
import Product from "../pages/employee/products/Product";
import ProductDetail from "../pages/employee/products/ProductDetail";
import Import from "../pages/employee/import/Import";
import Export from "../pages/employee/import/Export";
import Shipping from "../pages/employee/import/Shipping";
import ImportDetail from "../pages/employee/import/ImportDetail";
import Report from "../pages/employee/reports/Report";
import ReportGenerator from "../pages/employee/reports/ReportGenerator";
import Tag from "../pages/employee/tags/Tag";
import AdminDashboard from "../pages/admin/dashboard";
import TagManagementPage from "../pages/admin/tags";
import AccountManagementPage from "../pages/admin/accounts";
import ExportDetail from "../pages/employee/import/ExportDetail";
import Audit from "../pages/employee/audit/Audit";

export const routes = [
  { path: "/", component: Login, layout: AuthLayout },
  { path: "/dashboard", component: Dashboard, layout: DefaultLayout },
  { path: "/product", component: Product, layout: DefaultLayout },
  { path: "/product/:id", component: ProductDetail, layout: DefaultLayout },
  { path: "/import", component: Import, layout: DefaultLayout },
  { path: "/export", component: Export, layout: DefaultLayout },
  { path: "/shipping", component: Shipping, layout: DefaultLayout },
  { path: "/import/:id", component: ImportDetail, layout: DefaultLayout },
  { path: "/report", component: Report, layout: DefaultLayout },
  {
    path: "/report/generate",
    component: ReportGenerator,
    layout: DefaultLayout,
  },
  { path: "/tag", component: Tag, layout: DefaultLayout },
  { path: "/audit", component: Audit, layout: DefaultLayout },

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
  {
    path: "/export/:id",
    component: ExportDetail,
    layout: DefaultLayout,
  },
];
