import React, { useState } from "react";
import {
  MagnifyingGlassIcon,
  PlusIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

type TabType = "import" | "export" | "shipping";

const Import = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedCompletionDate, setSelectedCompletionDate] = useState("");
  const [activeTab, setActiveTab] = useState<TabType>("shipping");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  // Sample data
  const allShipments = [
    {
      stt: 1,
      code: "S001",
      totalValue: "8,795 đ",
      carrier: "Dior",
      shipDate: "13/07/2024",
      completionDate: "16/12/2022",
      notes: "Postman",
    },
    {
      stt: 2,
      code: "S001",
      totalValue: "7,655 đ",
      carrier: "Content",
      shipDate: "09/05/2020",
      completionDate: "10/11/2022",
      notes: "Account Manager",
    },
    {
      stt: 3,
      code: "S001",
      totalValue: "4,502 đ",
      carrier: "Content",
      shipDate: "19/11/2020",
      completionDate: "28/01/2024",
      notes: "Industrial Designer",
    },
    {
      stt: 4,
      code: "S001",
      totalValue: "9,040 đ",
      carrier: "Content",
      shipDate: "13/12/2022",
      completionDate: "01/03/2024",
      notes: "Clinical Psychologist",
    },
    {
      stt: 5,
      code: "S001",
      totalValue: "5,698 đ",
      carrier: "Content",
      shipDate: "04/08/2022",
      completionDate: "08/04/2021",
      notes: "Public Health Inspector",
    },
    {
      stt: 6,
      code: "S001",
      totalValue: "1,296 đ",
      carrier: "Content",
      shipDate: "01/10/2021",
      completionDate: "07/05/2020",
      notes: "Waiter",
    },
    {
      stt: 7,
      code: "S001",
      totalValue: "1,440 đ",
      carrier: "Content",
      shipDate: "01/09/2020",
      completionDate: "23/03/2024",
      notes: "Air Traffic Controller",
    },
    {
      stt: 8,
      code: "S001",
      totalValue: "5,440 đ",
      carrier: "Content",
      shipDate: "24/09/2023",
      completionDate: "23/02/2021",
      notes: "Computer Security Specialist",
    },
    {
      stt: 9,
      code: "S001",
      totalValue: "6,399 đ",
      carrier: "Content",
      shipDate: "08/12/2022",
      completionDate: "01/11/2023",
      notes: "Business Analyst",
    },
    {
      stt: 10,
      code: "S001",
      totalValue: "7,056 đ",
      carrier: "Content",
      shipDate: "01/10/2021",
      completionDate: "23/11/2020",
      notes: "Insurance Agent",
    },
  ];

  const handleSortClick = () => {
    if (sortOrder === null) {
      setSortOrder("asc");
    } else if (sortOrder === "asc") {
      setSortOrder("desc");
    } else {
      setSortOrder(null);
    }
  };

  // Sort items based on total value if sort order is set
  const sortedItems = [...allShipments].sort((a, b) => {
    if (sortOrder === null) return 0;
    const valueA = parseFloat(a.totalValue.replace(/[^\d]/g, ""));
    const valueB = parseFloat(b.totalValue.replace(/[^\d]/g, ""));
    return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
  });

  // Pagination logic
  const totalPages = Math.ceil(sortedItems.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedItems.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="p-6">
      {/* Tabs Navigation */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab("import")}
              className={`${
                activeTab === "import"
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Danh sách phiếu nhập
            </button>
            <button
              onClick={() => setActiveTab("export")}
              className={`${
                activeTab === "export"
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Danh sách phiếu xuất
            </button>
            <button
              onClick={() => setActiveTab("shipping")}
              className={`${
                activeTab === "shipping"
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Danh sách vận chuyển
            </button>
          </nav>
        </div>
      </div>

      {/* Header with title and add button */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">
          {activeTab === "import" && "DANH SÁCH PHIẾU NHẬP"}
          {activeTab === "export" && "DANH SÁCH PHIẾU XUẤT"}
          {activeTab === "shipping" && "DANH SÁCH VẬN CHUYỂN"}
        </h2>
        <button className="bg-primary text-white p-2 rounded-full hover:bg-primary/90">
          <PlusIcon className="h-6 w-6" />
        </button>
      </div>

      {/* Filters Section */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Tìm kiếm"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>

        {/* Total Value Filter with Sort */}
        <div className="relative">
          <input
            type="text"
            placeholder="Tổng giá trị"
            className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
            value={selectedValue}
            onChange={(e) => setSelectedValue(e.target.value)}
          />
          <button
            onClick={handleSortClick}
            className={`absolute right-3 top-2.5 ${
              sortOrder ? "text-primary" : "text-gray-400"
            } hover:text-primary`}
          >
            <ChevronUpDownIcon className="h-5 w-5" />
          </button>
        </div>

        {/* Ship Date Filter */}
        <div>
          <input
            type="date"
            placeholder="Ngày vận chuyển"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>

        {/* Completion Date Filter */}
        <div>
          <input
            type="date"
            placeholder="Ngày hoàn thành"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
            value={selectedCompletionDate}
            onChange={(e) => setSelectedCompletionDate(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                STT
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Mã vận đơn
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Tổng giá trị
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Đơn vị vận chuyển
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Ngày vận chuyển
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Ngày hoàn thành
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Ghi chú
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentItems.map((item) => (
              <tr key={item.stt} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.stt}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-primary cursor-pointer hover:underline">
                  {item.code}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.totalValue}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.carrier}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.shipDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.completionDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.notes}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-end items-center px-6 py-3 border-t">
          <button
            className="px-3 py-1 border rounded-l-lg hover:bg-gray-50 disabled:opacity-50"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &lt;
          </button>
          {pageNumbers.map((number) => (
            <button
              key={number}
              className={`px-3 py-1 border-t border-b ${
                currentPage === number
                  ? "bg-primary text-white"
                  : "hover:bg-gray-50"
              }`}
              onClick={() => handlePageChange(number)}
            >
              {number}
            </button>
          ))}
          <button
            className="px-3 py-1 border rounded-r-lg hover:bg-gray-50 disabled:opacity-50"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Import;
