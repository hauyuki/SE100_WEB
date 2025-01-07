import React, { useState, useEffect } from "react";
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
import {
  useGetStockReportDateRanges,
  useGetStockReports,
} from "../../../hooks/stocks";
import { useAuthContext } from "../../../contexts/AuthContext";
import { Role } from "../../../models/Auth";

const Report = () => {
  const navigate = useNavigate();

  const [timeFilter, setTimeFilter] = useState<string>("7 ngày qua");
  const [showTimeFilterDropdown, setShowTimeFilterDropdown] = useState(false);
  const [showCustomDateRange, setShowCustomDateRange] = useState(false);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const { data: chartData, refetch } = useGetStockReportDateRanges({
    startDate: startDate,
    endDate: endDate,
  });

  const timeFilterOptions = ["7 ngày qua", "30 ngày qua", "Tùy chọn"];
  useEffect(() => {
    const calculateDateRange = (days: number) => {
      const currentDate = new Date();
      const pastDate = new Date();
      pastDate.setDate(currentDate.getDate() - days);
      setStartDate(pastDate.toISOString().split("T")[0]); // Format: YYYY-MM-DD
      setEndDate(currentDate.toISOString().split("T")[0]); // Format: YYYY-MM-DD
    };

    if (timeFilter === "7 ngày qua") {
      calculateDateRange(7);
    } else if (timeFilter === "30 ngày qua") {
      calculateDateRange(30);
    }
  }, [timeFilter]);
  useEffect(() => {
    if (startDate && endDate) {
      refetch();
    }
  }, [startDate, endDate, refetch]);
  const handleTimeFilterSelect = (option: string) => {
    setTimeFilter(option);
    setShowTimeFilterDropdown(false);

    if (option === "Tùy chọn") {
      setShowCustomDateRange(true);
      setStartDate(""); // Clear existing dates for custom range
      setEndDate("");
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
  const { user } = useAuthContext();
  const { data: reports } = useGetStockReports();
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
      {/* Reports Table Section */}
      <div className="bg-white rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-medium">Danh sách báo cáo</h2>
          <button
            onClick={() => navigate("/admin/reports/generate")}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
          >
            Tạo báo cáo
          </button>
        </div>

        <div className="overflow-x-auto">
          {reports && (
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                    STT
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                    Tên báo cáo
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                    Ngày bắt đầu
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                    Ngày kết thúc
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                    Số lượng tồn
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                    Nhập
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                    Xuất
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                    Giá nhập
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                    Giá xuất
                  </th>
                  {/* <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                    Thao tác
                  </th> */}
                </tr>
              </thead>{" "}
              <tbody className="divide-y divide-gray-200">
                {reports?.map((report) => (
                  <tr key={report.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {report.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-600">
                      <Link
                        to={
                          user?.role === Role.ADMIN_ROLE
                            ? `/admin/report/${report.id}`
                            : `/report/${report.id}`
                        }
                        className="text-indigo-500 hover:text-indigo-600"
                      >
                        {report.name}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(report.startDate).toDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(report.endDate).toDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {report.stockQuantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {report.inboundQuantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {report.outboundQuantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {report.inboundPrice}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {report.outboundPrice}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Report;
