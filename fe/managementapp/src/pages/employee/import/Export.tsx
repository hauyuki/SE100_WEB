import React, { useState } from "react";
import { FaCalendarAlt, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import ImportTabs from "./components/ImportTabs";
import UpdateExportForm from "./components/UpdateExportForm";
import OutboundReportForm from "../../../components/OutboundReportForm";
import { useGetOutboundReports } from "../../../hooks/outboundReports";
import { OutboundReport } from "../../../models/OutboundReport";
import Loading from "../../../components/Loading";
import Snackbar from "../../../components/Snackbar";
import { Role } from "../../../models/Auth";
import { useAuthContext } from "../../../contexts/AuthContext";

interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface FormData {
  orderId: string;
  shipper: string;
  shippingDate: string;
  completionDate: string;
  status: string;
  notes: string;
  products: Product[];
}

const Export = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedValue, setSelectedValue] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedExport, setSelectedExport] = useState<OutboundReport | null>(
    null
  );
  const [formData, setFormData] = useState<FormData>({
    orderId: "",
    shipper: "",
    shippingDate: "",
    completionDate: "",
    status: "Đang vận chuyển",
    notes: "",
    products: [],
  });
  const [snackbar, setSnackbar] = useState<{
    show: boolean;
    message: string;
    type: "success" | "error";
  }>({
    show: false,
    message: "",
    type: "success",
  });

  const [data, setData] = useState([
    {
      id: 1,
      orderId: "EX001",
      totalValue: 1500000,
      shipper: "Dior Express",
      shippingDate: "15/03/2024",
      completionDate: "20/03/2024",
      status: "Vận chuyển thành công",
      notes: "Standard Export",
    },
    {
      id: 2,
      orderId: "EX002",
      totalValue: 2300000,
      shipper: "Content Logistics",
      shippingDate: "16/03/2024",
      completionDate: "",
      status: "Đang vận chuyển",
      notes: "Express Export",
    },
  ]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const generateOrderId = () => {
    const lastExport = data[data.length - 1];
    if (!lastExport) return "EX001";

    const lastNumber = parseInt(lastExport.orderId.slice(2));
    const newNumber = lastNumber + 1;
    return `EX${newNumber.toString().padStart(3, "0")}`;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const totalValue = formData.products.reduce(
      (sum, product) => sum + product.price * product.quantity,
      0
    );
    const newItem = {
      id: data.length + 1,
      orderId: generateOrderId(),
      totalValue,
      shipper: formData.shipper,
      shippingDate: formData.shippingDate,
      completionDate: formData.completionDate,
      status: formData.status,
      notes: formData.notes,
    };
    setData((prev) => [...prev, newItem]);
    setFormData({
      orderId: "",
      shipper: "",
      shippingDate: "",
      completionDate: "",
      status: "Đang vận chuyển",
      notes: "",
      products: [],
    });
    setShowForm(false);
  };
  const {
    data: outboundData,
    isPending: loading,
    isError,
    isRefetching,
    isLoading,
  } = useGetOutboundReports();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  const filteredData = outboundData?.data
    ?.filter((item) => {
      const carrierMatch = item?.shipment?.carrier
        ?.toLowerCase()
        .includes(searchQuery?.toLowerCase());
      const fromPositionMatch = item?.shipment?.fromPosition
        ?.toLowerCase()
        .includes(searchQuery?.toLowerCase());
      const toPositionMatch = item?.shipment?.toPosition
        ?.toLowerCase()
        .includes(searchQuery?.toLowerCase());

      const shipmentDate = new Date(item?.shipment?.date);
      const isWithinDateRange =
        (!startDate || shipmentDate >= new Date(startDate)) &&
        (!endDate || shipmentDate <= new Date(endDate));

      return (
        (carrierMatch || fromPositionMatch || toPositionMatch) &&
        isWithinDateRange
      );
    })
    ?.sort((a, b) => {
      if (selectedValue === "asc") {
        return a.quantity - b.quantity;
      } else if (selectedValue === "desc") {
        return b.quantity - a.quantity;
      }
      return 0;
    });

  const handleEdit = (id: number) => {
    const itemToEdit = outboundData?.data.find((item) => item.id === id);
    if (itemToEdit) {
      setSelectedExport(itemToEdit);
      setShowUpdateForm(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, show: false }));
  };

  const handleAddSuccess = () => {
    setShowForm(false);
    setSnackbar({
      show: true,
      message: "Thêm phiếu xuất thành công",
      type: "success",
    });
  };

  const handleAddError = () => {
    setSnackbar({
      show: true,
      message: "Có lỗi xảy ra khi thêm phiếu xuất",
      type: "error",
    });
  };

  const handleUpdateSuccess = () => {
    setShowUpdateForm(false);
    setSelectedExport(null);
    setSnackbar({
      show: true,
      message: "Cập nhật phiếu xuất thành công",
      type: "success",
    });
  };

  const handleUpdateError = () => {
    setSnackbar({
      show: true,
      message: "Có lỗi xảy ra khi cập nhật phiếu xuất",
      type: "error",
    });
  };
  const { user } = useAuthContext();

  return (
    <div className="container mx-auto p-6">
      <ImportTabs />
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Danh sách phiếu xuất</h2>
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative w-1/3">
            <input
              type="text"
              placeholder="Tìm kiếm theo mã phiếu xuất, đơn vị vận chuyển hoặc ghi chú"
              className="w-full border rounded-md pl-4 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value ?? "")}
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
            value={selectedValue}
            onChange={(e) => setSelectedValue(e.target.value)}
          >
            <option value="">Tổng giá trị</option>
            <option value="asc">Tăng dần</option>
            <option value="desc">Giảm dần</option>
          </select>
          <div className="relative w-1/6">
            <input
              type="date"
              className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <FaCalendarAlt className="absolute right-3 top-3 text-gray-400" />
          </div>
          <div className="relative w-1/6">
            <input
              type="date"
              className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
            <FaCalendarAlt className="absolute right-3 top-3 text-gray-400" />
          </div>
          <button
            className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center hover:bg-indigo-600 transition-colors"
            onClick={() => setShowForm(true)}
          >
            <FaPlus className="text-white" />
          </button>
        </div>

        <OutboundReportForm
          showForm={showForm}
          onClose={() => setShowForm(false)}
          onSuccess={handleAddSuccess}
          onError={handleAddError}
        />

        {selectedExport && (
          <UpdateExportForm
            showForm={showUpdateForm}
            outboundData={selectedExport}
            onClose={() => {
              setShowUpdateForm(false);
              setSelectedExport(null);
            }}
            onSuccess={handleUpdateSuccess}
            onError={handleUpdateError}
          />
        )}
        {loading || isRefetching ? (
          <Loading />
        ) : isError ? (
          <div className="text-red-500 text-center py-4">Đã có lỗi xảy ra</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-500 uppercase text-sm">
                  <th className="px-6 py-3 text-center">Mã phiếu xuất</th>
                  <th className="px-6 py-3 text-center">Tổng giá trị</th>
                  <th className="px-6 py-3 text-center">Đơn vị vận chuyển</th>
                  <th className="px-6 py-3 text-center">Ngày vận chuyển</th>
                  <th className="px-6 py-3 text-center">Ngày hoàn thành</th>
                  <th className="px-6 py-3 text-center">Trạng thái</th>
                  <th className="px-6 py-3 text-center">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {outboundData?.data.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-gray-200 hover:bg-gray-100"
                  >
                    <td className="px-6 py-4">
                      <Link
                        to={
                          user?.role === Role.ADMIN_ROLE
                            ? `/admin/import/${item.id}`
                            : `/import/${item.id}`
                        }
                        className="text-indigo-500 hover:text-indigo-600"
                      >
                        {item.id}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {formatCurrency(item.totalPrice)}
                    </td>
                    <td className="px-6 py-4">{item.shipment.carrier}</td>
                    <td className="px-6 py-4 text-center">
                      {new Date(item.shipment.date).toDateString()}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {item.shipment.completedDate
                        ? new Date(item.shipment.date).toDateString()
                        : "Pending"}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`inline-flex items-center justify-center px-3 py-1 text-sm font-medium rounded-full ${
                          item.shipment.status === "COMPLETED"
                            ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20"
                            : item.shipment.status === "IN_PROGRESS"
                            ? "bg-amber-50 text-amber-700 ring-1 ring-amber-600/20"
                            : item.shipment.status === "PENDING"
                            ? "bg-blue-50 text-blue-700 ring-1 "
                            : "bg-rose-50 text-rose-700 ring-1 ring-rose-600/20"
                        }`}
                      >
                        {item.shipment.status}
                      </span>
                    </td>
                    {/* <td className="px-6 py-4">{item.}</td> */}
                    <td className="px-6 py-4 text-center">
                      {item.shipment?.status !== "CANCELLED" && (
                        <button
                          onClick={() => handleEdit(item.id)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Sửa
                        </button>
                      )}{" "}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
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

export default Export;
