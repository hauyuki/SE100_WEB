import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

interface ReportItem {
  id: string;
  title: string;
  type: string;
  createdDate: string;
}

const Report = () => {
  const navigate = useNavigate();
  const [timeFilter, setTimeFilter] = useState("7 ngày qua");
  const [showTimeFilterDropdown, setShowTimeFilterDropdown] = useState(false);
  const [showCustomDateRange, setShowCustomDateRange] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const timeFilterOptions = ["7 ngày qua", "30 ngày qua", "Tùy chọn"];

  const handleTimeFilterSelect = (option: string) => {
    setTimeFilter(option);
    setShowTimeFilterDropdown(false);
    if (option === "Tùy chọn") {
      setShowCustomDateRange(true);
    } else {
      setShowCustomDateRange(false);
    }
  };

  const handleCustomDateSubmit = () => {
    if (startDate && endDate) {
      setTimeFilter(`${startDate} - ${endDate}`);
      setShowCustomDateRange(false);
    }
  };

  // Sample data for the line chart
  const chartData = [
    { day: "Wed", nhap: 1.5, xuat: 2.5 },
    { day: "Thu", nhap: 1.8, xuat: 2.0 },
    { day: "Fri", nhap: 2.0, xuat: 1.8 },
    { day: "Sat", nhap: 2.5, xuat: 1.5 },
    { day: "Sun", nhap: 2.2, xuat: 2.0 },
    { day: "Mon", nhap: 1.8, xuat: 3.0 },
    { day: "Tue", nhap: 0.5, xuat: 3.5 },
  ];

  // Mock data - replace with actual API call
  const reports: ReportItem[] = [
    {
      id: "BC001",
      title: "Báo cáo nhập xuất tháng 3/2024",
      type: "Báo cáo nhập xuất",
      createdDate: "2024-03-15",
    },
    {
      id: "BC002",
      title: "Báo cáo tồn kho Q1/2024",
      type: "Báo cáo tồn kho",
      createdDate: "2024-03-20",
    },
    {
      id: "BC003",
      title: "Báo cáo doanh thu Q1/2024",
      type: "Báo cáo doanh thu",
      createdDate: "2024-03-25",
    },
  ];

  const handleRowClick = (id: string) => {
    navigate(`/report/${id}`);
  };

  const handleDownload = async (id: string, event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent row click when clicking download button

    // In a real application, you would:
    // 1. Fetch the report data from the API
    // 2. Generate the PDF using the data
    // For now, we'll create a simple PDF

    const pdf = new jsPDF();
    pdf.text(`Báo cáo ${id}`, 20, 20);
    pdf.save(`report-${id}.pdf`);
  };

  return (
    <div className="p-6">
      {/* Statistics Section */}
      <div className="bg-white rounded-lg p-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-medium">Thống kê Nhập/Xuất</h2>
          <div className="relative">
            <button
              className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
              onClick={() => setShowTimeFilterDropdown(!showTimeFilterDropdown)}
            >
              {timeFilter}
              <ChevronDownIcon className="h-4 w-4" />
            </button>

            {/* Time Filter Dropdown */}
            {showTimeFilterDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-10">
                {timeFilterOptions.map((option) => (
                  <button
                    key={option}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                    onClick={() => handleTimeFilterSelect(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}

            {/* Custom Date Range Popup */}
            {showCustomDateRange && (
              <div className="absolute right-0 mt-2 p-4 bg-white rounded-lg shadow-lg border z-10">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Từ ngày
                    </label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Đến ngày
                    </label>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      className="px-3 py-2 text-sm border rounded-md hover:bg-gray-50"
                      onClick={() => setShowCustomDateRange(false)}
                    >
                      Hủy
                    </button>
                    <button
                      className="px-3 py-2 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                      onClick={handleCustomDateSubmit}
                    >
                      Áp dụng
                    </button>
                  </div>
                </div>
              </div>
            )}
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
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-medium">Danh sách báo cáo</h2>
          <Link
            to="/report/generate"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Tạo báo cáo
          </Link>
        </div>

        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                STT
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tên báo cáo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Loại báo cáo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ngày lập
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {reports.map((report, index) => (
              <tr
                key={report.id}
                onClick={() => handleRowClick(report.id)}
                className="hover:bg-gray-50 cursor-pointer"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {report.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {report.type}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(report.createdDate).toLocaleDateString("vi-VN")}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={(e) => handleDownload(report.id, e)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
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
