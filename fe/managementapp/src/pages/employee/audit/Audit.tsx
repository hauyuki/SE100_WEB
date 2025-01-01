import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import CreateAuditForm from "./components/CreateAuditForm";

interface AuditProduct {
  sku: string;
  name: string;
  stockQuantity: number;
  actualQuantity: number;
  deficit: number;
}

interface AuditRecord {
  id: number;
  auditId: string;
  createdDate: string;
  createdBy: string;
  totalDeficit: number;
  notes: string;
}

const Audit = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortValue, setSortValue] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);

  // Sample data
  const [auditRecords] = useState<AuditRecord[]>([
    {
      id: 1,
      auditId: "KT001",
      createdDate: "16/01/2021",
      createdBy: "Sarah Hill",
      totalDeficit: 42,
      notes: "Postman",
    },
    {
      id: 2,
      auditId: "KT001",
      createdDate: "22/01/2022",
      createdBy: "Stephanie Johnson",
      totalDeficit: 63,
      notes: "Account Manager",
    },
    {
      id: 3,
      auditId: "KT001",
      createdDate: "08/02/2021",
      createdBy: "Jacob Jackson",
      totalDeficit: 33,
      notes: "Industrial Designer",
    },
    {
      id: 4,
      auditId: "KT001",
      createdDate: "05/11/2024",
      createdBy: "Daniel Jackson",
      totalDeficit: 33,
      notes: "Clinical Psychologist",
    },
    {
      id: 5,
      auditId: "KT001",
      createdDate: "06/02/2020",
      createdBy: "William Davis",
      totalDeficit: 56,
      notes: "Public Health Inspector",
    },
  ]);

  const filteredRecords = auditRecords
    .filter(
      (record) =>
        record.auditId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.createdBy.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.notes.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortValue === "asc") {
        return a.totalDeficit - b.totalDeficit;
      } else if (sortValue === "desc") {
        return b.totalDeficit - a.totalDeficit;
      }
      return 0;
    });

  return (
    <div className="p-6">
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">
          DANH SÁCH PHIẾU KIỂM TOÁN
        </h2>
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative w-1/3">
            <input
              type="text"
              placeholder="Tìm kiếm"
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
            value={sortValue}
            onChange={(e) => setSortValue(e.target.value)}
          >
            <option value="">Tổng hao hụt</option>
            <option value="asc">Tăng dần</option>
            <option value="desc">Giảm dần</option>
          </select>
          <input
            type="date"
            className="w-1/5 border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Ngày tạo phiếu"
          />
          <button
            onClick={() => setShowCreateForm(true)}
            className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center hover:bg-indigo-600 transition-colors"
          >
            <FaPlus className="text-white" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 uppercase text-sm">
                <th className="px-6 py-3 text-left">STT</th>
                <th className="px-6 py-3 text-left">Mã phiếu kiểm toán</th>
                <th className="px-6 py-3 text-left">Ngày tạo phiếu</th>
                <th className="px-6 py-3 text-left">Người tạo phiếu</th>
                <th className="px-6 py-3 text-left">Tổng hao hụt</th>
                <th className="px-6 py-3 text-left">Ghi chú</th>
                <th className="px-6 py-3 text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map((record) => (
                <tr
                  key={record.id}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="px-6 py-4">{record.id}</td>
                  <td className="px-6 py-4 text-indigo-600">
                    {record.auditId}
                  </td>
                  <td className="px-6 py-4">{record.createdDate}</td>
                  <td className="px-6 py-4">{record.createdBy}</td>
                  <td className="px-6 py-4">{record.totalDeficit}đ</td>
                  <td className="px-6 py-4">{record.notes}</td>
                  <td className="px-6 py-4 text-center">
                    <button className="text-indigo-600 hover:text-indigo-900">
                      Sửa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <CreateAuditForm
        showForm={showCreateForm}
        onClose={() => setShowCreateForm(false)}
      />
    </div>
  );
};

export default Audit;
