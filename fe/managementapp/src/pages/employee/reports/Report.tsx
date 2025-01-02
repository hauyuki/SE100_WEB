import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
      name: "Báo cáo nhập xuất tháng 3/2024",
      type: "Báo cáo nhập xuất",
      dateCreated: "15/03/2024",
    },
    {
      stt: 2,
      name: "Báo cáo tồn kho Q1/2024",
      type: "Báo cáo tồn kho",
      dateCreated: "20/03/2024",
    },
    {
      stt: 3,
      name: "Báo cáo doanh thu Q1/2024",
      type: "Báo cáo doanh thu",
      dateCreated: "25/03/2024",
    },
  ];

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

        <div className="overflow-x-auto">
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
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-600">
                    {report.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {report.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {report.dateCreated}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                    <button
                      className="text-gray-600 hover:text-indigo-600 transition-colors"
                      title="Tải xuống"
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
    </div>
  );
};

export default Report;
