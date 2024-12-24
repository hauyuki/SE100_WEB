import React, { useState } from "react";
import { FaBoxOpen, FaTruck, FaExclamationTriangle } from "react-icons/fa";
import { Bar } from "react-chartjs-2";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import AdminSidebar from "../../../components/Sidebar/AdminSidebar";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const AdminDashboard = () => {
  const [activeItem, setActiveItem] = useState("dashboard");

  const barChartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Import",
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: "#4F46E5",
      },
      {
        label: "Export",
        data: [45, 79, 50, 41, 76, 45, 80],
        backgroundColor: "#06B6D4",
      },
    ],
  };

  const pieChartData = {
    labels: ["Hàng điện tử", "Đồ gia dụng", "Thực phẩm", "Others"],
    datasets: [
      {
        data: [30, 20, 15, 35],
        backgroundColor: ["#4F46E5", "#06B6D4", "#10B981", "#6B7280"],
      },
    ],
  };

  const shipments = [
    {
      date: "9 Sep Thu",
      product: "iPhone 13 Pro",
      status: "Success",
    },
    {
      date: "10 Sep Fri",
      product: "Samsung TV",
      status: "Failed",
    },
  ];

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6">
      {/* Cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white shadow-md rounded-lg p-4 flex items-center">
          <div className="w-12 h-12 bg-indigo-100 rounded-md flex items-center justify-center mr-4">
            <FaBoxOpen className="w-6 h-6 text-indigo-500" />
          </div>
          <div>
            <div className="text-3xl font-semibold">250</div>
            <div className="text-sm text-gray-500">Hàng trong kho</div>
            <div className="text-green-500 text-xs">+20%</div>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4 flex items-center">
          <div className="w-12 h-12 bg-indigo-100 rounded-md flex items-center justify-center mr-4">
            <FaTruck className="w-6 h-6 text-indigo-500" />
          </div>
          <div>
            <div className="text-3xl font-semibold">10</div>
            <div className="text-sm text-gray-500">Vận chuyển</div>
            <div className="text-green-500 text-xs">+20%</div>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4 flex items-center">
          <div className="w-12 h-12 bg-indigo-100 rounded-md flex items-center justify-center mr-4">
            <FaExclamationTriangle className="w-6 h-6 text-indigo-500" />
          </div>
          <div>
            <div className="text-3xl font-semibold">200</div>
            <div className="text-sm text-gray-500">Số lượng hàng cần nhập</div>
            <div className="text-red-500 text-xs">+30%</div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="flex gap-4">
        <div className="w-2/3 bg-white shadow-md rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-4">Trạng thái trong tuần</h2>
          <Bar data={barChartData} />
        </div>
        <div className="w-1/3 bg-white shadow-md rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-4">Thống kê hàng hóa</h2>
          <Pie data={pieChartData} />
        </div>
      </div>

      {/* Shipment List */}
      <div className="grid grid-cols-2 gap-4">
        {shipments.map((shipment, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center"
          >
            <div>
              <div className="text-lg font-semibold">{shipment.product}</div>
              <div
                className={`text-sm ${
                  shipment.status === "Failed"
                    ? "text-red-500"
                    : "text-gray-500"
                }`}
              >
                {shipment.date}
              </div>
            </div>
            <div
              className={`px-2 py-1 rounded-md ${
                shipment.status === "Success" ? "bg-indigo-500" : "bg-red-500"
              } text-white`}
            >
              {shipment.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
