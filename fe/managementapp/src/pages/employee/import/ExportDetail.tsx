import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronLeftIcon, PencilIcon } from "@heroicons/react/24/outline";
import UpdateExportForm from "./components/UpdateExportForm";
import { Role } from "../../../models/Auth";
import { useAuthContext } from "../../../contexts/AuthContext";

interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface ExportDetail {
  id: number;
  orderId: string;
  totalValue: number;
  shipper: string;
  shippingDate: string;
  completionDate: string;
  notes: string;
  products: Product[];
  status: string;
}

const ExportDetail = () => {
  const { id } = useParams();
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedExport, setSelectedExport] = useState<{
    orderId: string;
    status: string;
    completionDate?: string;
  } | null>(null);

  // Mock data (replace with actual API call in production)
  const mockData: ExportDetail = {
    id: 1,
    orderId: "EX001",
    totalValue: 1500000,
    shipper: "Dior Express",
    shippingDate: "15/03/2024",
    completionDate: "20/03/2024",
    notes: "Standard Export",
    status: "Đang vận chuyển",
    products: [
      {
        id: "PRD001",
        name: "Sản phẩm A",
        price: 500000,
        quantity: 2,
      },
      {
        id: "PRD002",
        name: "Sản phẩm B",
        price: 250000,
        quantity: 2,
      },
    ],
  };

  const [currentData, setCurrentData] = useState<ExportDetail>(mockData);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  const handleEdit = () => {
    setSelectedExport({
      orderId: currentData.orderId,
      status: currentData.status,
      completionDate: currentData.completionDate,
    });
    setShowUpdateForm(true);
  };

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedExport) return;

    setCurrentData((prev) => ({
      ...prev,
      status: selectedExport.status,
      completionDate:
        selectedExport.status === "Vận chuyển thành công"
          ? selectedExport.completionDate || ""
          : "",
    }));
    setShowUpdateForm(false);
    setSelectedExport(null);
  };

  const handleUpdateChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (!selectedExport) return;
    setSelectedExport((prev) => ({
      ...prev!,
      [e.target.name]: e.target.value,
    }));
  };
  const { user } = useAuthContext();

  return (
    <div className="container mx-auto p-6">
      {/* Back button */}
      <div className="flex justify-between items-center mb-6">
        <Link
          to={user?.role === Role.EMPLOYEE_ROLE ? "/import" : "/admin/import"}
          className="inline-flex items-center text-indigo-600 hover:text-indigo-700"
        >
          <ChevronLeftIcon className="h-5 w-5 mr-1" />
          Trở về danh sách
        </Link>
        <button
          onClick={handleEdit}
          className="inline-flex items-center px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
        >
          <PencilIcon className="h-5 w-5 mr-2" />
          Sửa phiếu xuất
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Chi tiết phiếu xuất #{currentData.orderId}
            </h1>
            <span
              className={`inline-flex items-center justify-center px-3 py-1 text-sm font-medium rounded-full ${
                currentData.status === "Vận chuyển thành công"
                  ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20"
                  : currentData.status === "Đang vận chuyển"
                  ? "bg-amber-50 text-amber-700 ring-1 ring-amber-600/20"
                  : "bg-rose-50 text-rose-700 ring-1 ring-rose-600/20"
              }`}
            >
              {currentData.status}
            </span>
          </div>
        </div>

        {/* General Information */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold mb-4">Thông tin chung</h2>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-600 mb-1">Đơn vị vận chuyển</p>
              <p className="font-medium">{currentData.shipper}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Tổng giá trị</p>
              <p className="font-medium text-indigo-600">
                {formatCurrency(currentData.totalValue)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Ngày vận chuyển</p>
              <p className="font-medium">{currentData.shippingDate}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Ngày hoàn thành</p>
              <p className="font-medium">{currentData.completionDate || "-"}</p>
            </div>
            <div className="col-span-2">
              <p className="text-sm text-gray-600 mb-1">Ghi chú</p>
              <p className="font-medium">{currentData.notes}</p>
            </div>
          </div>
        </div>

        {/* Products List */}
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Danh sách sản phẩm</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    STT
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Mã sản phẩm
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Tên sản phẩm
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Đơn giá
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Số lượng
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Thành tiền
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentData.products.map((product, index) => (
                  <tr key={product.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {product.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {product.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatCurrency(product.price)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {product.quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-600 font-medium">
                      {formatCurrency(product.price * product.quantity)}
                    </td>
                  </tr>
                ))}
                <tr className="bg-gray-50">
                  <td
                    colSpan={5}
                    className="px-6 py-4 text-sm font-medium text-gray-900 text-right"
                  >
                    Tổng cộng
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-600 font-medium">
                    {formatCurrency(currentData.totalValue)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* {selectedExport && (
        <UpdateExportForm
          showForm={showUpdateForm}
          exportData={selectedExport}
          onClose={() => {
            setShowUpdateForm(false);
            setSelectedExport(null);
          }}
          onSubmit={handleUpdate}
          onChange={handleUpdateChange}
        />
      )} */}
    </div>
  );
};

export default ExportDetail;
