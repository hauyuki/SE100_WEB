import React, { useState } from "react";
import { FaCalendarAlt, FaPlus, FaTimes } from "react-icons/fa";
import ImportForm from "./components/ImportForm";

interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface FormData {
  orderId: string;
  shipper: string;
  shippingDate: string;
  completionDate: string;
  notes: string;
  products: Product[];
}

const Import = () => {
  const [activeTab, setActiveTab] = useState("import");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    orderId: "",
    shipper: "",
    shippingDate: "",
    completionDate: "",
    notes: "",
    products: [],
  });

  const importData = [
    {
      id: 1,
      orderId: "IM001",
      totalValue: 1500000,
      shipper: "Dior Express",
      shippingDate: "15/03/2024",
      completionDate: "20/03/2024",
      notes: "Standard Import",
    },
    {
      id: 2,
      orderId: "IM002",
      totalValue: 2300000,
      shipper: "Content Logistics",
      shippingDate: "16/03/2024",
      completionDate: "21/03/2024",
      notes: "Express Import",
    },
  ];

  const exportData = [
    {
      id: 1,
      orderId: "EX001",
      totalValue: 3500000,
      shipper: "Fast Export",
      shippingDate: "18/03/2024",
      completionDate: "23/03/2024",
      notes: "Priority Export",
    },
    {
      id: 2,
      orderId: "EX002",
      totalValue: 4200000,
      shipper: "Swift Logistics",
      shippingDate: "19/03/2024",
      completionDate: "24/03/2024",
      notes: "Standard Export",
    },
  ];

  const shippingData = [
    {
      id: 1,
      orderId: "SH001",
      totalValue: 1800000,
      shipper: "Global Shipping",
      shippingDate: "20/03/2024",
      completionDate: "25/03/2024",
      notes: "International Shipping",
    },
    {
      id: 2,
      orderId: "SH002",
      totalValue: 2600000,
      shipper: "Ocean Freight",
      shippingDate: "21/03/2024",
      completionDate: "26/03/2024",
      notes: "Sea Shipping",
    },
  ];

  const [data, setData] = useState(importData);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    switch (tab) {
      case "import":
        setData(importData);
        break;
      case "export":
        setData(exportData);
        break;
      case "shipping":
        setData(shippingData);
        break;
      default:
        setData(importData);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const totalValue = formData.products.reduce(
      (sum, product) => sum + product.price * product.quantity,
      0
    );
    const newItem = {
      id: data.length + 1,
      orderId: formData.orderId,
      totalValue,
      shipper: formData.shipper,
      shippingDate: formData.shippingDate,
      completionDate: formData.completionDate,
      notes: formData.notes,
    };
    setData((prev) => [...prev, newItem]);
    setFormData({
      orderId: "",
      shipper: "",
      shippingDate: "",
      completionDate: "",
      notes: "",
      products: [],
    });
    setShowForm(false);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  const filteredData = data
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
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-8">
          <button
            className={`py-4 px-6 font-medium rounded-t-lg transition-all duration-300 ${
              activeTab === "import"
                ? "bg-indigo-500 text-white"
                : "text-gray-600 hover:bg-indigo-50"
            }`}
            onClick={() => handleTabChange("import")}
          >
            Danh sách phiếu nhập
          </button>
          <button
            className={`py-4 px-6 font-medium rounded-t-lg transition-all duration-300 ${
              activeTab === "export"
                ? "bg-indigo-500 text-white"
                : "text-gray-600 hover:bg-indigo-50"
            }`}
            onClick={() => handleTabChange("export")}
          >
            Danh sách phiếu xuất
          </button>
          <button
            className={`py-4 px-6 font-medium rounded-t-lg transition-all duration-300 ${
              activeTab === "shipping"
                ? "bg-indigo-500 text-white"
                : "text-gray-600 hover:bg-indigo-50"
            }`}
            onClick={() => handleTabChange("shipping")}
          >
            Danh sách vận chuyển
          </button>
        </nav>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Danh Sách Phiếu Nhập</h2>
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
          <button
            className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center hover:bg-indigo-600 transition-colors"
            onClick={() => setShowForm(true)}
          >
            <FaPlus className="text-white" />
          </button>
        </div>

        <ImportForm
          showForm={showForm}
          formData={formData}
          onClose={() => setShowForm(false)}
          onSubmit={handleSubmit}
          onChange={handleInputChange}
        />

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 uppercase text-sm">
                <th className="px-6 py-3 text-center">STT</th>
                <th className="px-6 py-3 text-left">Mã vận đơn</th>
                <th className="px-6 py-3 text-right">Tổng giá trị</th>
                <th className="px-6 py-3 text-left">Đơn vị vận chuyển</th>
                <th className="px-6 py-3 text-center">Ngày vận chuyển</th>
                <th className="px-6 py-3 text-center">Ngày hoàn thành</th>
                <th className="px-6 py-3 text-left">Ghi chú</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="px-6 py-4 text-center">{item.id}</td>
                  <td className="px-6 py-4">
                    <a href="#" className="text-indigo-500 underline">
                      {item.orderId}
                    </a>
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

export default Import;
