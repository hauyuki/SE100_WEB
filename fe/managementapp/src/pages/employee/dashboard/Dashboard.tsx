import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import StatsCard from "../../../components/StatsCard";
import {
  useGetCategoryStatistic,
  useGetStatistics,
  useGetWeekStatistic,
} from "../../../hooks/statistics";
import { useGetNeedInboundProducts } from "../../../hooks/products";

const Dashboard = () => {
  // Sample data for weekly stats
  const { data: weeklyData } = useGetWeekStatistic();
  const { data: pieData } = useGetCategoryStatistic();
  const { data: statistic } = useGetStatistics();
  const { data: products } = useGetNeedInboundProducts();
  // Sample data for pie chart

  const COLORS = ["#4F46E5", "#F97316", "#F43F5E", "#EC4899"];

  // Sample data for products table

  return (
    <div className="pt-6 px-6">
      {/* Welcome Section */}
      <div className="bg-primary rounded-lg p-6 text-white mb-8 relative overflow-hidden">
        <div>
          <h2 className="text-2xl font-semibold">
            Have a good day, Bích Huyền
          </h2>
          <p className="mt-2 text-gray-100">
            Chúng mình hãy xem các báo cáo hoạt động.
          </p>
          <p className="text-gray-100">Hãy tiếp tục phát triển nhé.</p>
          <button className="mt-4 bg-white text-primary font-bold px-4 py-2 rounded-lg">
            Tiến hành nhập hàng
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <StatsCard
          title="Sản phẩm đã nhập"
          value={statistic?.indboundNumber}
          percentage={statistic?.inboundPercentChange}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
              />
            </svg>
          }
        />
        <StatsCard
          title="Số lượng trong kho"
          value={statistic?.stockNumber}
          percentage={statistic?.stockPercentChange}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
              />
            </svg>
          }
        />
        <StatsCard
          title="Số lượng hàng cần nhập"
          value={statistic?.inboundNeededNumber}
          percentage={statistic?.inboundNeededPercentChange}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
              />
            </svg>
          }
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-600 mb-4">Trạng thái trong tuần</h3>
          <BarChart width={500} height={300} data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="nhap" name="Nhập" fill="#4F46E5" />
            <Bar dataKey="xuat" name="Xuất" fill="#06B6D4" />
          </BarChart>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-600 mb-4">Thống kê sản phẩm</h3>
          <PieChart width={400} height={340}>
            {pieData && (
              <Pie
                data={pieData}
                cx={200}
                cy={150}
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            )}
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-gray-600 font-bold mb-4">Sản phẩm cần nhập</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  STT
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  SKU
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tên sản phẩm
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hãng sản xuất
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Danh mục
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tồn kho
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Đơn giá (VND)
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products?.productList.map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{product.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-primary">
                    {product.sku}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {product.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {product.category?.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {product.company?.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {product.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {product.productionCost}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
