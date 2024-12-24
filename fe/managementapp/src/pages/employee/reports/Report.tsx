import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import {
  ChevronDownIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";

const Report = () => {
  const [timeFilter, setTimeFilter] = useState("7 ngày qua");

  // Sample data for the line chart
  const chartData = [
    { day: "Wed", nhap: 10, xuat: 25 },
    { day: "Thu", nhap: 15, xuat: 20 },
    { day: "Fri", nhap: 20, xuat: 10 },
    { day: "Sat", nhap: 25, xuat: 15 },
    { day: "Sun", nhap: 22, xuat: 20 },
    { day: "Mon", nhap: 18, xuat: 30 },
    { day: "Tue", nhap: 5, xuat: 35 },
  ];

  // Sample data for the reports table
  const reports = [
    {
      stt: 1,
      name: "Content",
      type: "Content",
      dateCreated: "Content",
      createdBy: "Content",
    },
    {
      stt: 2,
      name: "Content",
      type: "Content",
      dateCreated: "Content",
      createdBy: "Content",
    },
    {
      stt: 3,
      name: "Content",
      type: "Content",
      dateCreated: "Content",
      createdBy: "Content",
    },
  ];

  return (
    <div className="p-6">
      {/* Statistics Section */}
      <div className="bg-white rounded-lg p-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-medium">Thống kê Nhập/Xuất</h2>
          <div className="relative">
            <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
              {timeFilter}
              <ChevronDownIcon className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Line Chart */}
        <div className="h-[400px]">
          <LineChart
            width={1000}
            height={350}
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis
              label={{
                value: "Triệu VND",
                angle: -90,
                position: "insideLeft",
                offset: 0,
              }}
            />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="nhap"
              name="Nhập"
              stroke="#4F46E5"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="xuat"
              name="Xuất"
              stroke="#EF4444"
              strokeWidth={2}
            />
          </LineChart>
        </div>
      </div>

      {/* Reports Table Section */}
      <div className="bg-white rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-medium">Danh sách báo cáo</h2>
          <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90">
            Tạo báo cáo
          </button>
        </div>

        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                STT
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Tên báo cáo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Loại báo cáo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Ngày lập
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Người lập
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {reports.map((report) => (
              <tr key={report.stt} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {report.stt}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-primary cursor-pointer hover:underline">
                  {report.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {report.type}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {report.dateCreated}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {report.createdBy}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <button className="text-gray-600 hover:text-primary">
                    <ArrowDownTrayIcon className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Report;
