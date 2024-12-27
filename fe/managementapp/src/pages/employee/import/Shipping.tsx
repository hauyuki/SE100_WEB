import React, { useState, useEffect } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import ImportTabs from "./components/ImportTabs";

interface ShippingData {
  id: number;
  orderId: string;
  totalValue: number;
  shipper: string;
  shippingDate: string;
  completionDate: string;
  notes: string;
  type: "import" | "export";
}

const Shipping = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [combinedData, setCombinedData] = useState<ShippingData[]>([]);

  // Dữ liệu mẫu cho phiếu nhập
  const importData = [
    {
      id: 1,
      orderId: "IM001",
      totalValue: 1500000,
      shipper: "Dior Express",
      shippingDate: "15/03/2024",
      completionDate: "20/03/2024",
      notes: "Standard Import",
      type: "import" as const,
    },
    {
      id: 2,
      orderId: "IM002",
      totalValue: 2300000,
      shipper: "Content Logistics",
      shippingDate: "16/03/2024",
      completionDate: "21/03/2024",
      notes: "Express Import",
      type: "import" as const,
    },
  ];

  // Dữ liệu mẫu cho phiếu xuất
  const exportData = [
    {
      id: 3,
      orderId: "EX001",
      totalValue: 3500000,
      shipper: "Fast Export",
      shippingDate: "18/03/2024",
      completionDate: "23/03/2024",
      notes: "Priority Export",
      type: "export" as const,
    },
    {
      id: 4,
      orderId: "EX002",
      totalValue: 4200000,
      shipper: "Swift Logistics",
      shippingDate: "19/03/2024",
      completionDate: "24/03/2024",
      notes: "Standard Export",
      type: "export" as const,
    },
  ];

  // Kết hợp dữ liệu từ cả phiếu nhập và xuất
  useEffect(() => {
    const combined = [...importData, ...exportData].sort((a, b) => {
      const dateA = new Date(a.shippingDate.split("/").reverse().join("-"));
      const dateB = new Date(b.shippingDate.split("/").reverse().join("-"));
      return dateB.getTime() - dateA.getTime();
    });
    setCombinedData(combined);
  }, []);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  const filteredData = combinedData
    .filter(
      (item) =>
        item.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.shipper.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.notes.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (selectedValue === "asc") {
        return a.totalValue - b.totalValue;
      } else if (selectedValue === "desc") {
        return b.totalValue - a.totalValue;
      }
      return 0;
    });

  return (
    <div className="container mx-auto p-6">
      <ImportTabs />
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Danh Sách Vận Chuyển</h2>
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative w-1/3">
            <input
              type="text"
              placeholder="Tìm kiếm theo mã vận đơn, đơn vị vận chuyển hoặc ghi chú"
              className="w-full border rounded-md pl-4 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          <select
            className="w-1/5 border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer transition-colors hover:bg-gray-50"
            value={selectedValue}
            onChange={(e) => setSelectedValue(e.target.value)}
          >
            <option value="">Tổng giá trị</option>
            <option value="asc">Tăng dần</option>
            <option value="desc">Giảm dần</option>
          </select>
          <div className="relative w-1/6">
            <input
              type="date"
              className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <FaCalendarAlt className="absolute right-3 top-3 text-gray-400" />
          </div>
          <div className="relative w-1/6">
            <input
              type="date"
              className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
            <FaCalendarAlt className="absolute right-3 top-3 text-gray-400" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 uppercase text-sm">
                <th className="px-6 py-3 text-center">STT</th>
                <th className="px-6 py-3 text-left">Mã vận đơn</th>
                <th className="px-6 py-3 text-center">Loại</th>
                <th className="px-6 py-3 text-right">Tổng giá trị</th>
                <th className="px-6 py-3 text-left">Đơn vị vận chuyển</th>
                <th className="px-6 py-3 text-center">Ngày vận chuyển</th>
                <th className="px-6 py-3 text-center">Ngày hoàn thành</th>
                <th className="px-6 py-3 text-left">Ghi chú</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr
                  key={item.id}
                  className="border-b border-gray-200 hover:bg-gray-100 cursor-pointer"
                >
                  <td className="px-6 py-4 text-center">{index + 1}</td>
                  <td className="px-6 py-4">
                    <Link
                      to={`/${item.type}/${item.id}`}
                      className="text-indigo-500 hover:text-indigo-600"
                    >
                      {item.orderId}
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        item.type === "import"
                          ? "bg-green-100 text-green-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {item.type === "import" ? "Nhập" : "Xuất"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {formatCurrency(item.totalValue)}
                  </td>
                  <td className="px-6 py-4">{item.shipper}</td>
                  <td className="px-6 py-4 text-center">{item.shippingDate}</td>
                  <td className="px-6 py-4 text-center">
                    {item.completionDate}
                  </td>
                  <td className="px-6 py-4">{item.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Shipping;
