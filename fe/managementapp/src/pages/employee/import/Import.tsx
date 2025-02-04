import React, { useState } from "react";
import { FaCalendarAlt, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import ImportTabs from "./components/ImportTabs";
import UpdateImportForm from "./components/UpdateShipmentForm";
import InboundReportForm from "../../../components/InboundReportForm";
import { useGetInboundReports } from "../../../hooks/inboundReports";
import AddProductForm from "../../admin/products/component/AddProductForm";
import { InboundReport } from "../../../models";
import Loading from "../../../components/Loading";
import Snackbar from "../../../components/Snackbar";
import { useAuthContext } from "../../../contexts/AuthContext";
import { Role } from "../../../models/Auth";

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

const Import = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedImport, setSelectedImport] = useState<InboundReport | null>(
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
  const {
    data: inboundData,
    isPending: loading,
    isError,
    isRefetching,
  } = useGetInboundReports();
  const [data, setData] = useState([
    {
      id: 1,
      orderId: "IM001",
      totalValue: 1500000,
      shipper: "Dior Express",
      shippingDate: "15/03/2024",
      completionDate: "20/03/2024",
      status: "Vận chuyển thành công",
      notes: "Standard Import",
    },
    {
      id: 2,
      orderId: "IM002",
      totalValue: 2300000,
      shipper: "Content Logistics",
      shippingDate: "16/03/2024",
      completionDate: "",
      status: "Đang vận chuyển",
      notes: "Express Import",
    },
  ]);
  const [snackbar, setSnackbar] = useState<{
    show: boolean;
    message: string;
    type: "success" | "error";
  }>({
    show: false,
    message: "",
    type: "success",
  });

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
    const lastImport = data[data.length - 1];
    if (!lastImport) return "IM001";

    const lastNumber = parseInt(lastImport.orderId.slice(2));
    const newNumber = lastNumber + 1;
    return `IM${newNumber.toString().padStart(3, "0")}`;
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

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  const filteredData = inboundData?.data
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
    const itemToEdit = inboundData?.data.find((item) => item.id === id);
    if (itemToEdit) {
      setSelectedImport(itemToEdit);
      setShowUpdateForm(true);
    }
  };

  const handleUpdateSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedImport) return;

    setShowUpdateForm(false);
    setSelectedImport(null);
  };

  const handleUpdateChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (!selectedImport) return;
    setSelectedImport((prev) => ({
      ...prev!,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, show: false }));
  };

  const handleAddSuccess = () => {
    setShowForm(false);
    setSnackbar({
      show: true,
      message: "Thêm phiếu nhập thành công",
      type: "success",
    });
  };

  const handleAddError = () => {
    setSnackbar({
      show: true,
      message: "Có lỗi xảy ra khi thêm phiếu nhập",
      type: "error",
    });
  };

  const handleUpdateSuccess = () => {
    setShowUpdateForm(false);
    setSelectedImport(null);
    setSnackbar({
      show: true,
      message: "Cập nhật phiếu nhập thành công",
      type: "success",
    });
  };

  const handleUpdateError = () => {
    setSnackbar({
      show: true,
      message: "Có lỗi xảy ra khi cập nhật phiếu nhập",
      type: "error",
    });
  };
  const { user } = useAuthContext();
  return (
    <div className="container mx-auto p-6">
      <ImportTabs />

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Danh sách phiếu nhập</h2>
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative w-1/3">
            <input
              type="text"
              placeholder="Tìm kiếm theo mã vận đơn, đơn vị vận chuyển hoặc ghi chú"
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

        {/* <ImportForm
          showForm={showForm}
          formData={formData}
          onClose={() => setShowForm(false)}
          onSubmit={handleSubmit}
          onChange={handleInputChange}
        /> */}
        <InboundReportForm
          showForm={showForm}
          onClose={() => setShowForm(false)}
          onSuccess={handleAddSuccess}
          onError={handleAddError}
        />
        {/* <AddProductForm
          showForm={showForm}
          onClose={() => setShowForm(false)}
        /> */}
        {selectedImport && (
          <UpdateImportForm
            showForm={showUpdateForm}
            importData={selectedImport}
            onClose={() => {
              setShowUpdateForm(false);
              setSelectedImport(null);
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
                  <th className="px-6 py-3 text-center">Mã phiếu nhập</th>
                  <th className="px-6 py-3 text-center">Tổng giá trị</th>
                  <th className="px-6 py-3 text-center">Đơn vị vận chuyển</th>
                  <th className="px-6 py-3 text-center">Ngày vận chuyển</th>
                  <th className="px-6 py-3 text-center">Ngày hoàn thành</th>
                  <th className="px-6 py-3 text-center">Trạng thái</th>
                  <th className="px-6 py-3 text-center">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredData?.map((item) => (
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
                      {formatCurrency(item.price)}
                    </td>
                    <td className="px-6 py-4">{item.shipment.carrier}</td>
                    <td className="px-6 py-4 text-center">
                      {item.shipment.date.toDateString()}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {item.shipment.completedDate
                        ? item.shipment.completedDate.toDateString()
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
                    <td className="px-6 py-4 text-center">
                      {item.shipment?.status !== "COMPLETED" && (
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

export default Import;
