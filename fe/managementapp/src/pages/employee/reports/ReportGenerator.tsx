import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CalendarIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";

const ReportGenerator = () => {
  const [reportType, setReportType] = useState("week");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedContents, setSelectedContents] = useState({
    imports: false,
    exports: false,
    products: false,
    revenue: false,
  });

  const handleContentChange = (content: keyof typeof selectedContents) => {
    setSelectedContents((prev) => ({
      ...prev,
      [content]: !prev[content],
    }));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Back button */}
      <div className="mb-6">
        <Link
          to="/report"
          className="inline-flex items-center text-indigo-600 hover:text-indigo-700"
        >
          <ChevronLeftIcon className="h-5 w-5 mr-1" />
          Trở về
        </Link>
      </div>

      <div className="bg-white rounded-lg p-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-8">
          Tạo báo cáo mới
        </h1>

        <div className="space-y-6">
          {/* Report Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Chọn loại báo cáo
            </label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="week">Tuần</option>
              <option value="month">Tháng</option>
              <option value="custom">Giai đoạn</option>
            </select>
          </div>

          {/* Date Selection */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Chọn ngày bắt đầu
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                <CalendarIcon className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Chọn ngày kết thúc
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                <CalendarIcon className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Report Contents */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Chọn nội dung báo cáo
            </label>
            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedContents.imports}
                  onChange={() => handleContentChange("imports")}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-gray-700">Nhập hàng</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedContents.exports}
                  onChange={() => handleContentChange("exports")}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-gray-700">Xuất hàng</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedContents.products}
                  onChange={() => handleContentChange("products")}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-gray-700">Sản phẩm</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedContents.revenue}
                  onChange={() => handleContentChange("revenue")}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-gray-700">Doanh thu</span>
              </label>
            </div>
          </div>

          {/* Generate Button */}
          <div className="pt-4">
            <button className="w-full bg-indigo-600 text-white py-2.5 rounded-lg hover:bg-indigo-700 transition-colors">
              Tạo báo cáo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportGenerator;
