import React from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";

interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface ImportDetail {
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

const ImportDetail = () => {
  const { id } = useParams();

  // Mock data (replace with actual API call in production)
  const importDetail: ImportDetail = {
    id: 1,
    orderId: "IM001",
    totalValue: 1500000,
    shipper: "Dior Express",
    shippingDate: "15/03/2024",
    completionDate: "20/03/2024",
    notes: "Standard Import",
    status: "Completed",
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

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  return (
    <div className="container mx-auto p-6">
      {/* Back button */}
      <Link
        to="/import"
        className="inline-flex items-center text-indigo-600 hover:text-indigo-700 mb-6"
      >
        <ChevronLeftIcon className="h-5 w-5 mr-1" />
        Trở về danh sách
      </Link>

      <div className="bg-white rounded-lg shadow-md">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Chi tiết phiếu nhập #{importDetail.orderId}
            </h1>
            <span
              className={`px-4 py-2 rounded-full text-sm font-semibold ${
                importDetail.status === "Completed"
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {importDetail.status}
            </span>
          </div>
        </div>

        {/* General Information */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold mb-4">Thông tin chung</h2>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-600 mb-1">Đơn vị vận chuyển</p>
              <p className="font-medium">{importDetail.shipper}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Tổng giá trị</p>
              <p className="font-medium text-indigo-600">
                {formatCurrency(importDetail.totalValue)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Ngày vận chuyển</p>
              <p className="font-medium">{importDetail.shippingDate}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Ngày hoàn thành</p>
              <p className="font-medium">{importDetail.completionDate}</p>
            </div>
            <div className="col-span-2">
              <p className="text-sm text-gray-600 mb-1">Ghi chú</p>
              <p className="font-medium">{importDetail.notes}</p>
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
                {importDetail.products.map((product, index) => (
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
                    {formatCurrency(importDetail.totalValue)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportDetail;
