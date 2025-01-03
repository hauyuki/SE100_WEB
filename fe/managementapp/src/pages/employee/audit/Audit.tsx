import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import CreateAuditForm from "./components/CreateAuditForm";
import { useNavigate } from "react-router-dom";
import Loading from "../../../components/Loading";
import { useGetInventoryChecks } from "../../../hooks/inventoryChecks";
import { useAuthContext } from "../../../contexts/AuthContext";
import { Role } from "../../../models/Auth";
import InventoryCheckForm from "./components/CreateAuditForm";
import Snackbar from "../../../components/Snackbar";

const Audit = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortValue, setSortValue] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const {
    data: inventoryChecks,
    isLoading: loading,
    isError,
  } = useGetInventoryChecks();
  const { user } = useAuthContext();
  const [snackbar, setSnackbar] = useState<{
    show: boolean;
    message: string;
    type: "success" | "error";
  }>({
    show: false,
    message: "",
    type: "success",
  });

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, show: false }));
  };

  const handleCreateSuccess = () => {
    setShowCreateForm(false);
  };

  const handleCreateError = (error: string) => {
    setSnackbar({
      show: true,
      message: error || "Tạo phiếu kiểm toán thất bại",
      type: "error",
    });
  };

  const filteredRecords = inventoryChecks?.data
    .filter(
      (record) =>
        record.employee.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        record.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortValue === "asc") {
        return a.totalPrice - b.totalPrice;
      } else if (sortValue === "desc") {
        return b.totalPrice - a.totalPrice;
      }
      return 0;
    });

  const handleRowClick = (id: number) => {
    if (user?.role === Role.ADMIN_ROLE) {
      navigate(`/admin/audit/${id}`);
    } else {
      navigate(`/audit/${id}`);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

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

        {loading ? (
          <Loading />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-500 uppercase text-sm">
                  <th className="px-6 py-3 text-left">Mã phiếu kiểm toán</th>
                  <th className="px-6 py-3 text-left">Ngày tạo phiếu</th>
                  <th className="px-6 py-3 text-left">Người tạo phiếu</th>
                  <th className="px-6 py-3 text-left">Tổng hao hụt</th>
                  <th className="px-6 py-3 text-left">Ghi chú</th>
                  <th className="px-6 py-3 text-center">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredRecords?.map((record) => (
                  <tr
                    key={record.id}
                    className="border-b border-gray-200 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleRowClick(record.id)}
                  >
                    <td className="px-6 py-4">{record.id}</td>
                    <td className="px-6 py-4">
                      {new Date(record.createdDate).toDateString()}
                    </td>
                    <td className="px-6 py-4">{record.employee?.name}</td>
                    <td className="px-6 py-4">
                      {formatCurrency(record.totalPrice)}
                    </td>
                    <td className="px-6 py-4">{record.name}</td>
                    <td className="px-6 py-4 text-center">
                      <button className="text-indigo-600 hover:text-indigo-900">
                        Chi tiết
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <InventoryCheckForm
        showForm={showCreateForm}
        onClose={() => setShowCreateForm(false)}
      />

      <Snackbar
        show={snackbar.show}
        message={snackbar.message}
        type={snackbar.type}
        onClose={handleCloseSnackbar}
      />
    </div>
  );
};

export default Audit;
