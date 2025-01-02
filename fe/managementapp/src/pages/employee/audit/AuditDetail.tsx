import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import Loading from "../../../components/Loading";
import Snackbar from "../../../components/Snackbar";

interface AuditProduct {
  sku: string;
  name: string;
  stockQuantity: number;
  actualQuantity: number;
  deficit: number;
  price: number;
}

interface AuditDetail {
  id: string;
  createdDate: string;
  createdBy: string;
  totalDeficit: number;
  notes: string;
  products: AuditProduct[];
}

const AuditDetail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [auditData, setAuditData] = useState<AuditDetail | null>(null);
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

  const handleUpdateSuccess = () => {
    setSnackbar({
      show: true,
      message: "Cập nhật phiếu kiểm toán thành công",
      type: "success",
    });
  };

  const handleUpdateError = (error: string) => {
    setSnackbar({
      show: true,
      message: error || "Cập nhật phiếu kiểm toán thất bại",
      type: "error",
    });
  };

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      setLoading(true);
      try {
        // In a real app, this would be an API call
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay

        // Mock data
        const data: AuditDetail = {
          id: "KT001",
          createdDate: "2024-03-15",
          createdBy: "Bích Huyền",
          totalDeficit: 1200000,
          notes: "Kiểm kê định kỳ tháng 3/2024",
          products: [
            {
              sku: "SKU001",
              name: "Cell Fusion C Toning Sunscreen 100",
              stockQuantity: 50,
              actualQuantity: 48,
              deficit: 2,
              price: 300000,
            },
            {
              sku: "SKU002",
              name: "La Roche-Posay Anthelios UVMUNE 400 Oil Control",
              stockQuantity: 60,
              actualQuantity: 57,
              deficit: 3,
              price: 200000,
            },
            {
              sku: "SKU003",
              name: "Vichy Capital Soleil Dry Touch Face Fluid SPF50",
              stockQuantity: 40,
              actualQuantity: 38,
              deficit: 2,
              price: 150000,
            },
          ],
        };
        setAuditData(data);
      } catch (error) {
        console.error("Error fetching audit data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  if (loading) {
    return <Loading />;
  }

  if (!auditData) {
    return (
      <div className="p-6 text-center text-gray-500">
        Không tìm thấy thông tin phiếu kiểm toán
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <Link
            to="/audit"
            className="inline-flex items-center text-indigo-600"
          >
            <ChevronLeftIcon className="h-5 w-5 mr-1" />
            Trở về
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 ml-4">
            Chi tiết phiếu kiểm toán #{auditData.id}
          </h1>
        </div>
      </div>

      {/* Audit Information */}
      <div className="bg-white rounded-lg p-6 mb-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Mã phiếu kiểm toán</p>
            <p className="font-medium">{auditData.id}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Ngày tạo phiếu</p>
            <p className="font-medium">
              {new Date(auditData.createdDate).toLocaleDateString("vi-VN")}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Người tạo phiếu</p>
            <p className="font-medium">{auditData.createdBy}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Tổng hao hụt</p>
            <p className="font-medium text-red-600">
              {formatCurrency(auditData.totalDeficit)}
            </p>
          </div>
          <div className="col-span-2">
            <p className="text-sm text-gray-500">Ghi chú</p>
            <p className="font-medium">{auditData.notes}</p>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-lg font-medium mb-4">Danh sách sản phẩm</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mã SKU
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tên sản phẩm
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tồn kho
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thực tế
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hao hụt
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Đơn giá
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Giá trị hao hụt
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {auditData.products.map((product) => (
                <tr key={product.sku}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {product.sku}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {product.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                    {product.stockQuantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                    {product.actualQuantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 text-right">
                    {product.deficit}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                    {formatCurrency(product.price)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 text-right">
                    {formatCurrency(product.deficit * product.price)}
                  </td>
                </tr>
              ))}
              <tr className="bg-gray-50 font-medium">
                <td
                  colSpan={6}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right"
                >
                  Tổng giá trị hao hụt
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 text-right">
                  {formatCurrency(auditData.totalDeficit)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <Snackbar
        show={snackbar.show}
        message={snackbar.message}
        type={snackbar.type}
        onClose={handleCloseSnackbar}
      />
    </div>
  );
};

export default AuditDetail;
