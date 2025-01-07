import React from "react";
import { Link, useParams } from "react-router-dom";
import {
  ChevronLeftIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { useGetStockReportDetail } from "../../../hooks/stocks";
import { useAuthContext } from "../../../contexts/AuthContext";
import { Role } from "../../../models/Auth";
import { handleGenerateReport } from "../../../utils/generate_report";

interface ReportData {
  id: string;
  title: string;
  type: string;
  createdDate: string;
  createdBy: string;
  content: {
    imports?: {
      total: number;
      items: Array<{
        id: string;
        date: string;
        value: number;
      }>;
    };
    exports?: {
      total: number;
      items: Array<{
        id: string;
        date: string;
        value: number;
      }>;
    };
    products?: {
      total: number;
      items: Array<{
        sku: string;
        name: string;
        quantity: number;
        value: number;
      }>;
    };
    revenue?: {
      total: number;
      items: Array<{
        date: string;
        income: number;
        expense: number;
      }>;
    };
  };
}

const ReportDetail = () => {
  const { id } = useParams();
  const { data: report } = useGetStockReportDetail(Number(id));
  // Mock data - replace with actual API call
  const reportData: ReportData = {
    id: "BC001",
    title: "Báo cáo tháng 3/2024",
    type: "Tháng",
    createdDate: "2024-03-15",
    createdBy: "Bích Huyền",
    content: {
      imports: {
        total: 15000000,
        items: [
          { id: "IM001", date: "2024-03-01", value: 5000000 },
          { id: "IM002", date: "2024-03-10", value: 10000000 },
        ],
      },
      exports: {
        total: 18000000,
        items: [
          { id: "EX001", date: "2024-03-05", value: 8000000 },
          { id: "EX002", date: "2024-03-15", value: 10000000 },
        ],
      },
      products: {
        total: 150,
        items: [
          {
            sku: "SKU001",
            name: "Cell Fusion C Toning Sunscreen 100",
            quantity: 50,
            value: 6000000,
          },
          {
            sku: "SKU002",
            name: "La Roche-Posay Anthelios UVMUNE 400 Oil Control",
            quantity: 60,
            value: 7200000,
          },
          {
            sku: "SKU003",
            name: "Vichy Capital Soleil Dry Touch Face Fluid SPF50",
            quantity: 40,
            value: 4800000,
          },
        ],
      },
      revenue: {
        total: 3000000,
        items: [
          { date: "2024-03-01", income: 8000000, expense: 5000000 },
          { date: "2024-03-15", income: 10000000, expense: 10000000 },
        ],
      },
    },
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  const handleDownloadPDF = async () => {
    if (report) handleGenerateReport(report);
    // const element = document.getElementById("report-content");
    // if (!element) return;

    // const canvas = await html2canvas(element);
    // const imgData = canvas.toDataURL("image/png");
    // const pdf = new jsPDF("p", "mm", "a4");
    // const imgProps = pdf.getImageProperties(imgData);
    // const pdfWidth = pdf.internal.pageSize.getWidth();
    // const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    // pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    // pdf.save(`report-${reportData.id}.pdf`);
  };
  const { user } = useAuthContext();
  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <Link
          to={user?.role === Role.ADMIN_ROLE ? "/admin/reports" : "/report"}
          className="inline-flex items-center text-indigo-600"
        >
          <ChevronLeftIcon className="h-5 w-5 mr-1" />
          Trở về
        </Link>
        <button
          onClick={handleDownloadPDF}
          className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
          Tải xuống PDF
        </button>
      </div>

      {/* Report Content */}
      <div id="report-content" className="space-y-6">
        {/* Report Header */}
        <div className="bg-white rounded-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {report?.name}
          </h1>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Mã báo cáo</p>
              <p className="font-medium">{report?.id}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Tên báo cáo</p>
              <p className="font-medium">{report?.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Ngày bắt đầu</p>
              <p className="font-medium">
                {" "}
                {report?.startDate
                  ? new Date(report?.startDate).toLocaleDateString("vi-VN")
                  : ""}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Ngày kết thúc</p>
              <p className="font-medium">
                {report?.endDate
                  ? new Date(report?.endDate).toLocaleDateString("vi-VN")
                  : ""}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Tổng tiền nhập </p>
              <p className="font-medium">
                {report && formatCurrency(report?.inboundPrice)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Tổng tiền xuất </p>
              <p className="font-medium">
                {report && formatCurrency(report?.outboundPrice)}
              </p>
            </div>
            {/* <div>
              <p className="text-sm text-gray-500">Tổng doanh thu </p>
              <p className="font-medium">
                {report && formatCurrency(report?.totalPrice)}
              </p>
            </div> */}
            {/* <div>
              <p className="text-sm text-gray-500">Người tạo</p>
              <p className="font-medium">{report.}</p>
            </div> */}
          </div>
        </div>

        {/* Imports Section */}
        {report?.items && (
          <div className="bg-white rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Nội dung báo cáo </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50 ">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Mã phiếu nhập
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Tên sản phẩm
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Số lượng nhập
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Số lượng xuất
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Tổng tiền nhập
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Tổng tiền xuất
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {report?.items.map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap">{item.id}</td>
                      {/* <td className="px-6 py-4 whitespace-nowrap">
                        {new Date(item.createdDate).toLocaleDateString("vi-VN")}
                      </td> */}
                      <td className="px-6 py-4 whitespace-nowrap text-left">
                        {item.product.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-left">
                        {item.quantity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-left">
                        {item.outboundQuantity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-left">
                        {formatCurrency(item.inboundPrice)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-left">
                        {formatCurrency(item.outboundPrice)}
                      </td>
                    </tr>
                  ))}
                  {/* <tr className="bg-gray-50 font-medium">
                    <td colSpan={5} className="px-6 py-4 text-right">
                      Tổng nhập
                    </td>
                    <td className="px-6 py-4 text-right">
                      {formatCurrency(report?.inboundPrice)}
                    </td>
                  </tr>
                  <tr className="bg-gray-50 font-medium">
                    <td colSpan={5} className="px-6 py-4 text-right">
                      Tổng xuất
                    </td>
                    <td className="px-6 py-4 text-right">
                      {formatCurrency(report?.outboundPrice)}
                    </td>
                  </tr> */}
                  <tr className="bg-gray-50 font-medium">
                    <td colSpan={5} className="px-6 py-4 text-right">
                      Tổng cộng
                    </td>
                    <td className="px-6 py-4 text-right">
                      {formatCurrency(report?.totalPrice)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Exports Section */}
        {/* {reportData.content.exports && (
          <div className="bg-white rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Xuất hàng</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Mã phiếu xuất
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Ngày xuất
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                      Giá trị
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {reportData.content.exports.items.map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap">{item.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {new Date(item.date).toLocaleDateString("vi-VN")}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        {formatCurrency(item.value)}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-gray-50 font-medium">
                    <td colSpan={2} className="px-6 py-4 text-right">
                      Tổng cộng
                    </td>
                    <td className="px-6 py-4 text-right">
                      {formatCurrency(reportData.content.exports.total)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )} */}

        {/* Products Section */}
        {/* {reportData.content.products && (
          <div className="bg-white rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Sản phẩm</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Mã SKU
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Tên sản phẩm
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                      Số lượng
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                      Giá trị
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {reportData.content.products.items.map((item) => (
                    <tr key={item.sku}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.sku}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        {item.quantity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        {formatCurrency(item.value)}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-gray-50 font-medium">
                    <td colSpan={2} className="px-6 py-4 text-right">
                      Tổng cộng
                    </td>
                    <td className="px-6 py-4 text-right">
                      {reportData.content.products.total}
                    </td>
                    <td className="px-6 py-4 text-right">
                      {formatCurrency(
                        reportData.content.products.items.reduce(
                          (sum, item) => sum + item.value,
                          0
                        )
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )} */}

        {/* Revenue Section */}
        {/* {reportData.content.revenue && (
          <div className="bg-white rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Doanh thu</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Ngày
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                      Thu
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                      Chi
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                      Lợi nhuận
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {reportData.content.revenue.items.map((item) => (
                    <tr key={item.date}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {new Date(item.date).toLocaleDateString("vi-VN")}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        {formatCurrency(item.income)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        {formatCurrency(item.expense)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        {formatCurrency(item.income - item.expense)}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-gray-50 font-medium">
                    <td className="px-6 py-4 text-right">Tổng cộng</td>
                    <td className="px-6 py-4 text-right">
                      {formatCurrency(
                        reportData.content.revenue.items.reduce(
                          (sum, item) => sum + item.income,
                          0
                        )
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      {formatCurrency(
                        reportData.content.revenue.items.reduce(
                          (sum, item) => sum + item.expense,
                          0
                        )
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      {formatCurrency(reportData.content.revenue.total)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default ReportDetail;
