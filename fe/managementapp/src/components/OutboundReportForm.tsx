import React, { useEffect, useMemo, useState } from "react";
import { FaTimes, FaPlus } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { OutboundReportRequestSchema } from "../schemas/auth";
import { useGetProducts } from "../hooks/products";
import ButtonPrimary from "./Button/ButtonPrimary";
import { usePostOutboundReports } from "../hooks/outboundReports";
import { useAuthContext } from "../contexts/AuthContext";
import { ItemRequest, OutboundReportRequest } from "../models/OutboundReport";
import { Product } from "../models/Product";

interface OutboundReportFormProps {
  showForm: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  onError?: () => void;
}

const OutboundReportForm: React.FC<OutboundReportFormProps> = ({
  showForm,
  onClose,
  onSuccess,
  onError,
}) => {
  // Setup for the form
  const { user } = useAuthContext();
  useEffect(() => {
    setValue("shipment.employeeId", user?.id ?? 2);
  }, [user]);
  const form = useForm<OutboundReportRequest>({
    resolver: zodResolver(OutboundReportRequestSchema),
    defaultValues: {
      date: new Date().toISOString(),
      shipment: {
        date: "",
        carrier: "",
        fromLocation: "",
        toLocation: "",
        employeeId: user?.id ?? 2,
      },
      items: [], // Initially no items
    },
  });

  const { mutate: addOutboundReport, isPending } = usePostOutboundReports();
  const { data: products } = useGetProducts();
  const [stockDatas, setStockDatas] = useState<Product[]>([]);
  useEffect(() => {
    let ee = products?.productList.filter((item) => item.quantity > 0) ?? [];
    setStockDatas(ee);
  }, [products]);
  console.log(form.formState.errors);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = form;
  const items = watch("items"); // Watching the items array to dynamically add products
  const availableProducts = useMemo(() => {
    if (!stockDatas) return [];
    return stockDatas.filter(
      (item) =>
        !items.some((selected) => Number(selected.productId) === item.id)
    );
  }, [stockDatas, items]);

  const [currentItem, setCurrentItem] = useState<ItemRequest>({
    productId: availableProducts.length > 0 ? availableProducts[0].id : 0,
    quantity: 0,
    unitPrice: 0,
  });

  const [validationError, setValidationError] = useState<string>("");

  useEffect(() => {
    setCurrentItem({
      ...currentItem,
      productId: availableProducts.length > 0 ? availableProducts[0].id : 0,
    });
  }, [availableProducts]);

  const handleItemChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setCurrentItem({
      ...currentItem,
      [name]: name === "unitPrice" ? parseFloat(value) : parseInt(value, 10),
    });
  };

  const handleRemoveProduct = (index: number) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setValue("items", updatedItems);
  };
  const addItem = () => {
    console.log("call this");
    const product = availableProducts.find(
      (p) => p.id === currentItem.productId
    );

    if (!product) return;

    // Check if quantity is 0 or unitPrice is <= 0
    if (currentItem.quantity <= 0) {
      setValidationError("Số lượng sản phẩm phải lớn hơn 0.");
      return;
    }

    if (currentItem.unitPrice <= 0) {
      setValidationError("Đơn giá phải lớn hơn 0.");
      return;
    }

    if (currentItem.quantity > product.quantity) {
      setValidationError(
        `Số lượng sản phẩm vượt quá số lượng tồn kho (${product.quantity}).`
      );
      return;
    }

    setValidationError(""); // Clear validation error if everything is correct

    const updatedItems = [...items, currentItem];
    setValue("items", updatedItems); // Update the form state with new items

    setCurrentItem({
      productId: availableProducts.length > 0 ? availableProducts[0].id : 0,
      quantity: 0,
      unitPrice: 0,
    }); // Reset current item with first product as default
  };

  const onSubmit = (data: OutboundReportRequest) => {
    addOutboundReport(
      { ...data },
      {
        onSuccess: () => {
          console.log("success");
          onClose();
          onSuccess?.();
        },
        onError: (error) => {
          console.error("Error creating outbound report:", error);
          onError?.();
        },
      }
    );
  };

  if (!showForm) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">Thêm Phiếu Xuất Mới</h3>
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
          </div>
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
                      disabled
                    >
                      {products?.productList.map((p) => (
                        <option value={p.id}>{p.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Số lượng
                    </label>
                    <input
                      type="number"
                      {...register(`items.${index}.quantity` as const)}
                      className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      min="1"
                      disabled
                    />
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
                      disabled
                    />
                  </div>

                  <div className="flex items-center justify-end">
                    <button
                      type="button"
                      onClick={() => handleRemoveProduct(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTimes />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {availableProducts.length > 0 && (
              <div className="border rounded-lg p-4 mb-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Sản phẩm
                    </label>
                    <select
                      name="productId"
                      value={currentItem.productId}
                      onChange={handleItemChange}
                      className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      {availableProducts?.map((product) => (
                        <option key={product.id} value={product.id}>
                          {product.name} - {product.marketPrice} -{" "}
                          {product.quantity}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Số lượng
                    </label>
                    <input
                      type="number"
                      name="quantity"
                      value={currentItem.quantity}
                      onChange={handleItemChange}
                      className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Đơn giá
                    </label>
                    <input
                      type="number"
                      name="unitPrice"
                      value={currentItem.unitPrice}
                      onChange={handleItemChange}
                      className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div className="flex items-center justify-end">
                    <button
                      type="button"
                      onClick={addItem}
                      className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700"
                    >
                      <FaPlus className="w-4 h-4" />
                      Thêm sản phẩm
                    </button>
                  </div>
                </div>
                {/* Show Validation Error */}
                {validationError && (
                  <div className="text-red-500 text-sm mt-2">
                    {validationError}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex justify-end">
            <ButtonPrimary
              type="submit"
              disabled={isPending}
              loading={isPending}
              className="px-6 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none"
            >
              Lưu Phiếu Xuất
            </ButtonPrimary>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OutboundReportForm;
