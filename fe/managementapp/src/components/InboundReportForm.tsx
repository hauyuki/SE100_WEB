import { FaTimes, FaPlus } from "react-icons/fa"; // Assuming these are imported for icons
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { InboundReportRequest } from "../models";
import { InboundReportRequestSchema } from "../schemas/auth";
import { useGetProducts } from "../hooks/products";
import ButtonPrimary from "./Button/ButtonPrimary";
import { usePostInboundReports } from "../hooks/inboundReports";
import { useAuthContext } from "../contexts/AuthContext";

const InboundReportForm = ({
  onClose,
  showForm,
}: {
  onClose: () => void;
  showForm: boolean;
}) => {
  // Setup for the form
  const { user } = useAuthContext();
  const form = useForm<InboundReportRequest>({
    resolver: zodResolver(InboundReportRequestSchema),
    defaultValues: {
      date: new Date().toISOString(),
      shipment: {
        date: "",
        carrier: "",
        fromLocation: "",
        toLocation: "",
        employeeId: user?.id ?? 2, // Adjust if necessary
      },
      items: [], // Initially no items
    },
  });
  // useEffect(() => {
  //   setValue("shipment.employeeId", user?.id ?? 2);
  // }, [user]);

  const { mutate: addInboundReport, isPending } = usePostInboundReports();

  const { data: productDatas } = useGetProducts();

  if (!showForm) return null;
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = form;
  console.log(form.formState.errors);
  const items = watch("items"); // Watching the items array to dynamically add products
  const handleAddProduct = () => {
    const newItem = {
      quantity: 0,
      unitPrice: 0,
      manufactoringDate: "",
      expirationDate: "",
      productId: productDatas?.productList
        ? productDatas.productList[0]?.id
        : 1, // Default to first product if available
    };

    // Add the new item to the items array
    setValue("items", [...items, newItem]);
  };
  const onSubmit = (data: InboundReportRequest) => {
    console.log("Form Data:", data);
    addInboundReport(
      { ...data },
      {
        onSuccess: () => {
          console.log("success");
          onClose();
        },
        onError: () => {
          console.log("err");
        },
      }
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">Thêm Phiếu Nhập Mới</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes />
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Đơn vị vận chuyển
              </label>
              <input
                type="text"
                {...register("shipment.carrier")}
                className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
                placeholder="Nhập đơn vị vận chuyển"
              />
              {errors.shipment?.carrier && (
                <p className="text-red-500 text-sm">
                  {errors.shipment.carrier.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ngày vận chuyển
              </label>
              <input
                type="date"
                {...register("shipment.date")}
                className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
              {errors.shipment?.date && (
                <p className="text-red-500 text-sm">
                  {errors.shipment.date.message}
                </p>
              )}
            </div>
          </div>{" "}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Vận chuyển từ
              </label>
              <input
                type="text"
                {...register("shipment.fromLocation")}
                className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
                placeholder="Vận chuyển từ"
              />
              {errors.shipment?.fromLocation && (
                <p className="text-red-500 text-sm">
                  {errors.shipment.fromLocation.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Vận chuyển đến
              </label>
              <input
                type="text"
                {...register("shipment.toLocation")}
                className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
                placeholder="Vận chuyển đến"
              />
              {errors.shipment?.toLocation && (
                <p className="text-red-500 text-sm">
                  {errors.shipment.toLocation.message}
                </p>
              )}
            </div>
          </div>
          {/* Products Section */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="text-lg font-medium">Danh sách sản phẩm</h4>
              <button
                type="button"
                onClick={handleAddProduct}
                className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700"
              >
                <FaPlus className="w-4 h-4" />
                Thêm sản phẩm
              </button>
            </div>
            {errors?.items && (
              <p className="text-red-500 text-sm">{errors.items?.message}</p>
            )}

            {items.map((item, index) => (
              <div key={index} className="border rounded-lg p-4 mb-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Sản phẩm
                    </label>
                    <select
                      {...register(`items.${index}.productId` as const)}
                      className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      {productDatas?.productList?.map((product) => (
                        <option key={product.id} value={product.id}>
                          {product.name} - {product.marketPrice}
                        </option>
                      ))}
                    </select>
                    {errors.items?.[index]?.productId && (
                      <p className="text-red-500 text-sm">
                        {errors.items?.[index]?.productId?.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Số lượng
                    </label>
                    <input
                      type="number"
                      {...register(`items.${index}.quantity` as const)}
                      className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      min="0"
                      required
                    />
                    {errors.items?.[index]?.quantity && (
                      <p className="text-red-500 text-sm">
                        {errors.items?.[index]?.quantity?.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Đơn giá
                    </label>
                    <input
                      type="number"
                      {...register(`items.${index}.unitPrice` as const)}
                      className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      min="0"
                    />
                    {errors.items?.[index]?.unitPrice && (
                      <p className="text-red-500 text-sm">
                        {errors.items?.[index]?.unitPrice?.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Ngày sản xuất
                    </label>
                    <input
                      type="date"
                      {...register(`items.${index}.manufactoringDate` as const)}
                      className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                    {errors.items?.[index]?.manufactoringDate && (
                      <p className="text-red-500 text-sm">
                        {errors.items?.[index]?.manufactoringDate?.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Ngày hết hạn
                    </label>
                    <input
                      type="date"
                      {...register(`items.${index}.expirationDate` as const)}
                      className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                    {errors.items?.[index]?.expirationDate && (
                      <p className="text-red-500 text-sm">
                        {errors.items?.[index]?.expirationDate?.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-end">
            <ButtonPrimary
              type="submit"
              disabled={isPending}
              loading={isPending}
              className="px-6 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none"
            >
              Lưu Phiếu Nhập
            </ButtonPrimary>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InboundReportForm;
