import React, { useEffect, useState } from "react";
import { FaTimes, FaPlus } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InventoryCheckRequestSchema } from "../../../../schemas/auth";
import {
  InventoryCheckRequest,
  InventoryCheckRequestItem,
} from "../../../../models/InventoryCheck";
import { useAuthContext } from "../../../../contexts/AuthContext";
import { usePostInventoryChecks } from "../../../../hooks/inventoryChecks";
import { useGetProducts } from "../../../../hooks/products";
import { Product } from "../../../../models/Product";
import ButtonPrimary from "../../../../components/Button/ButtonPrimary";

const InventoryCheckForm = ({
  onClose,
  showForm,
}: {
  onClose: () => void;
  showForm: boolean;
}) => {
  // Setup for the form
  const { user } = useAuthContext();
  useEffect(() => {
    setValue("employeeId", user?.id ?? 2);
  }, [user]);

  const form = useForm<InventoryCheckRequest>({
    resolver: zodResolver(InventoryCheckRequestSchema),
    defaultValues: {
      date: new Date().toISOString(),
      name: "Bao cao", // Default name can be set to Bao cao or anything dynamic you want
      employeeId: user?.id ?? 2,
      items: [], // Initially no items
    },
  });

  const { mutate: addInventoryCheckRequest, isPending } =
    usePostInventoryChecks();
  const { data: products } = useGetProducts();
  const [stockDatas, setStockDatas] = useState<Product[]>([]);

  useEffect(() => {
    let availableProducts =
      products?.productList.filter((item) => item.quantity > 0) ?? [];
    setStockDatas(availableProducts);
  }, [products]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = form;

  const items = watch("items"); // Watching the items array to dynamically add products

  const [currentItem, setCurrentItem] = useState<InventoryCheckRequestItem>({
    productId: stockDatas.length > 0 ? stockDatas[0].id : 0,
    loss: 0,
  });

  const [validationError, setValidationError] = useState<string>("");

  useEffect(() => {
    setCurrentItem({
      ...currentItem,
      productId: stockDatas.length > 0 ? stockDatas[0].id : 0,
    });
  }, [stockDatas]);

  const handleItemChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setCurrentItem({
      ...currentItem,
      [name]: name === "loss" ? parseInt(value, 10) : parseInt(value, 10),
    });
  };

  const handleRemoveProduct = (index: number) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setValue("items", updatedItems);
  };

  const addItem = () => {
    const product = stockDatas.find((p) => p.id === currentItem.productId);

    if (!product) return;

    // Validate loss quantity
    if (currentItem.loss <= 0) {
      setValidationError("Số lượng mất phải lớn hơn 0.");
      return;
    }

    if (currentItem.loss > product.quantity) {
      setValidationError(
        `Số lượng mất không thể lớn hơn số lượng tồn (${product.quantity}).`
      );
      return;
    }

    setValidationError(""); // Clear validation error if everything is correct

    const updatedItems = [...items, currentItem];
    setValue("items", updatedItems); // Update the form state with new items

    setCurrentItem({
      productId: stockDatas.length > 0 ? stockDatas[0].id : 0,
      loss: 0,
    }); // Reset current item with first product as default
  };

  const onSubmit = (data: InventoryCheckRequest) => {
    addInventoryCheckRequest(
      { ...data },
      {
        onSuccess: () => {
          console.log("Inventory check request created successfully.");
          onClose();
        },
        onError: () => {
          console.log("Error creating inventory check request.");
        },
      }
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // TODO: Implement API call
      console.log("Form submitted:", {
        products,
        totalDeficit: calculateTotalDeficit(),
      });
      onClose();
      onSuccess?.();
    } catch (error: any) {
      console.error("Error creating audit:", error);
      onError?.(error.message || "Error creating audit");
    }
  };

  if (!showForm) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">Thêm Phiếu Kiểm Kê Kho</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes />
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tên kiểm kê
              </label>
              <input
                type="text"
                {...register("name")}
                className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
                placeholder="Nhập tên báo cáo"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
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
                <div className="grid grid-cols-10 gap-4">
                  <div className="col-span-9">
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
                            <option key={p.id} value={p.id}>
                              {p.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Số lượng mất
                        </label>
                        <input
                          type="number"
                          {...register(`items.${index}.loss` as const)}
                          className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          min="1"
                          disabled
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-span-1 mt-6 flex items-center justify-end">
                    <button
                      type="button"
                      onClick={() => handleRemoveProduct(index)}
                      className="p-2 rounded-md bg-red-50 hover:bg-red-100  text-red-600 hover:text-red-800 "
                    >
                      <FaTimes />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {stockDatas.length > 0 && (
              <div className="border rounded-lg p-4 mb-4">
                <div className="grid grid-cols-10 gap-4">
                  <div className="col-span-9">
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
                          {stockDatas?.map((product) => (
                            <option key={product.id} value={product.id}>
                              {product.name} - {product.quantity}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Số lượng mất
                        </label>
                        <input
                          type="number"
                          name="loss"
                          value={currentItem.loss}
                          onChange={handleItemChange}
                          className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-span-1 flex items-center justify-end">
                    <button
                      type="button"
                      onClick={addItem}
                      className="p-2 rounded-md mt-5 bg-blue-50 hover:bg-blue-100  text-indigo-600 hover:text-indigo-700 "
                    >
                      <FaPlus className="w-4 h-4" />
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
              Lưu Phiếu Kiểm Kê
            </ButtonPrimary>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InventoryCheckForm;
