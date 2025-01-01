import React, { useState } from "react";
import { FaTimes, FaPlus } from "react-icons/fa";

interface AuditProduct {
  sku: string;
  name: string;
  stockQuantity: number;
  actualQuantity: number;
  deficit: number;
}

interface CreateAuditFormProps {
  showForm: boolean;
  onClose: () => void;
}

const CreateAuditForm: React.FC<CreateAuditFormProps> = ({
  showForm,
  onClose,
}) => {
  const [products, setProducts] = useState<AuditProduct[]>([
    {
      sku: "",
      name: "",
      stockQuantity: 0,
      actualQuantity: 0,
      deficit: 0,
    },
  ]);

  // Sample SKU list (replace with actual data from API)
  const sampleProducts = [
    { sku: "SKU001", name: "Product A", stockQuantity: 100 },
    { sku: "SKU002", name: "Product B", stockQuantity: 150 },
    { sku: "SKU003", name: "Product C", stockQuantity: 200 },
  ];

  const handleAddProduct = () => {
    setProducts([
      ...products,
      {
        sku: "",
        name: "",
        stockQuantity: 0,
        actualQuantity: 0,
        deficit: 0,
      },
    ]);
  };

  const handleRemoveProduct = (index: number) => {
    const newProducts = products.filter((_, i) => i !== index);
    setProducts(newProducts);
  };

  const handleProductChange = (
    index: number,
    field: keyof AuditProduct,
    value: string | number
  ) => {
    const newProducts = [...products];
    const product = { ...newProducts[index] };

    if (field === "sku") {
      const selectedProduct = sampleProducts.find((p) => p.sku === value);
      if (selectedProduct) {
        product.sku = selectedProduct.sku;
        product.name = selectedProduct.name;
        product.stockQuantity = selectedProduct.stockQuantity;
        product.deficit = 0;
      }
    } else if (field === "actualQuantity") {
      product.actualQuantity = Number(value);
      product.deficit =
        (product.stockQuantity - product.actualQuantity) * 10000; // Example price per unit
    }

    newProducts[index] = product;
    setProducts(newProducts);
  };

  const calculateTotalDeficit = () => {
    return products.reduce((sum, product) => sum + product.deficit, 0);
  };

  if (!showForm) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">Tạo phiếu kiểm toán mới</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes />
          </button>
        </div>

        <form className="space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mã phiếu kiểm toán
              </label>
              <input
                type="text"
                value="KT002"
                disabled
                className="w-full border rounded-md px-4 py-2 bg-gray-50 text-gray-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ngày tạo phiếu
              </label>
              <input
                type="text"
                value={new Date().toLocaleDateString("vi-VN")}
                disabled
                className="w-full border rounded-md px-4 py-2 bg-gray-50 text-gray-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Người tạo phiếu
              </label>
              <input
                type="text"
                value="Bích Huyền"
                disabled
                className="w-full border rounded-md px-4 py-2 bg-gray-50 text-gray-500"
              />
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

            {products.map((product, index) => (
              <div
                key={index}
                className="grid grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg"
              >
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sản phẩm
                  </label>
                  <select
                    value={product.sku}
                    onChange={(e) =>
                      handleProductChange(index, "sku", e.target.value)
                    }
                    className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  >
                    <option value="">Chọn sản phẩm</option>
                    {sampleProducts.map((p) => (
                      <option key={p.sku} value={p.sku}>
                        {p.sku} - {p.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Giá nhập
                  </label>
                  <input
                    type="number"
                    value={0}
                    disabled
                    className="w-full border rounded-md px-4 py-2 bg-gray-50 text-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Số lượng
                  </label>
                  <input
                    type="number"
                    value={1}
                    className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                    min="1"
                  />
                </div>
                <div className="flex items-end">
                  {products.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveProduct(index)}
                      className="text-red-500 hover:text-red-700 p-2"
                    >
                      <FaTimes />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Total Section */}
          <div className="flex justify-end items-center p-4 bg-gray-50 rounded-lg">
            <span className="font-medium text-lg mr-4">Tổng hao hụt:</span>
            <span className="text-xl font-semibold text-indigo-600">
              {calculateTotalDeficit().toLocaleString("vi-VN")}đ
            </span>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ghi chú
            </label>
            <textarea
              className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              rows={3}
            />
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-50"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
            >
              Tạo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAuditForm;
