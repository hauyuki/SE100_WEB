import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronLeftIcon, PencilIcon } from "@heroicons/react/24/outline";
import UpdateExportForm from "./components/UpdateExportForm";

interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface ExportData {
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

interface FormData {
  orderId: string;
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

  // Mock data (replace with actual API call in production)
  const mockData: ExportData = {
    id: 1,
    orderId: "EX001",
    totalValue: 3500000,
    shipper: "Fast Export",
    shippingDate: "18/03/2024",
    completionDate: "23/03/2024",
    notes: "Priority Export",
    status: "Completed",
    products: [
      {
        id: "PRD001",
        name: "Sản phẩm A",
        price: 1500000,
        quantity: 1,
      },
      {
        id: "PRD002",
        name: "Sản phẩm B",
        price: 1000000,
        quantity: 2,
      },
    ],
  };

  const [currentData, setCurrentData] = useState<ExportData>(mockData);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  const handleUpdate = (formData: FormData) => {
    // Trong thực tế, gọi API để cập nhật dữ liệu
    const updatedData: ExportData = {
      ...currentData,
      shipper: formData.shipper,
      shippingDate: formData.shippingDate,
      completionDate: formData.completionDate,
      notes: formData.notes,
      products: formData.products,
      status: formData.status,
      totalValue: formData.products.reduce(
        (sum: number, product: Product) =>
          sum + product.price * product.quantity,
        0
      ),
    };
    setCurrentData(updatedData);
    console.log("Updated data:", updatedData);
    setShowUpdateForm(false);
  };

  return (
    <div className="container mx-auto p-6">
      {/* Back button */}
      <div className="flex justify-between items-center mb-6">
        <Link
          to="/export"
          className="inline-flex items-center text-indigo-600 hover:text-indigo-700"
        >
          <ChevronLeftIcon className="h-5 w-5 mr-1" />
          Trở về danh sách
        </Link>
        <button
          onClick={() => setShowUpdateForm(true)}
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
              className={`px-4 py-2 rounded-full text-sm font-semibold ${
                currentData.status === "Completed"
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
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
              <p className="font-medium">{currentData.completionDate}</p>
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
                    Giá xuất
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

      <UpdateExportForm
        showForm={showUpdateForm}
        initialData={{
          orderId: currentData.orderId,
          shipper: currentData.shipper,
          shippingDate: currentData.shippingDate,
          completionDate: currentData.completionDate,
          notes: currentData.notes,
          products: currentData.products,
          status: currentData.status,
        }}
        onClose={() => setShowUpdateForm(false)}
        onSubmit={handleUpdate}
      />
    </div>
  );
};

export default ExportDetail;
