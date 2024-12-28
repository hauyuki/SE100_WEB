import React, { useState } from "react";
import { FaTimes, FaPlus } from "react-icons/fa";

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

interface ImportFormProps {
  showForm: boolean;
  formData: FormData;
  onClose: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

const ImportForm: React.FC<ImportFormProps> = ({
  showForm,
  formData,
  onClose,
  onSubmit,
  onChange,
}) => {
  const [products, setProducts] = useState<Product[]>([
    { id: "", name: "", price: 0, quantity: 1 },
  ]);

  const handleAddProduct = () => {
    setProducts([...products, { id: "", name: "", price: 0, quantity: 1 }]);
  };

  const handleRemoveProduct = (index: number) => {
    const newProducts = products.filter((_, i) => i !== index);
    setProducts(newProducts);
  };

  const handleProductChange = (
    index: number,
    field: keyof Product,
    value: string | number
  ) => {
    const newProducts = [...products];
    if (field === "price" || field === "quantity") {
      newProducts[index][field] = Number(value);
    } else {
      newProducts[index][field] = value as string;
    }
    setProducts(newProducts);
  };

  const calculateTotal = () => {
    return products.reduce(
      (sum, product) => sum + product.price * product.quantity,
      0
    );
  };

  if (!showForm) return null;

  // Danh sách sản phẩm mẫu (trong thực tế sẽ lấy từ API)
  const sampleProducts = [
    { id: "PRD001", name: "Sản phẩm A" },
    { id: "PRD002", name: "Sản phẩm B" },
    { id: "PRD003", name: "Sản phẩm C" },
  ];

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
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Đơn vị vận chuyển
              </label>
              <input
                type="text"
                name="shipper"
                value={formData.shipper}
                onChange={onChange}
                className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
                placeholder="Nhập đơn vị vận chuyển"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ngày vận chuyển
              </label>
              <input
                type="date"
                name="shippingDate"
                value={formData.shippingDate}
                onChange={onChange}
                className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ngày hoàn thành
              </label>
              <input
                type="date"
                name="completionDate"
                value={formData.completionDate}
                onChange={onChange}
                className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Trạng thái vận chuyển
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={onChange}
                className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              >
                <option value="Đang vận chuyển">Đang vận chuyển</option>
                <option value="Vận chuyển thành công">
                  Vận chuyển thành công
                </option>
                <option value="Vận chuyển thất bại">Vận chuyển thất bại</option>
              </select>
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
                className="grid grid-cols-5 gap-4 p-4 bg-gray-50 rounded-lg"
              >
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mã SKU
                  </label>
                  <select
                    value={product.id}
                    onChange={(e) =>
                      handleProductChange(index, "id", e.target.value)
                    }
                    className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  >
                    <option value="">Chọn sản phẩm</option>
                    {sampleProducts.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.id} - {p.name}
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
                    value={product.price}
                    onChange={(e) =>
                      handleProductChange(index, "price", e.target.value)
                    }
                    className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                    min="0"
                    placeholder="Nhập giá"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Số lượng
                  </label>
                  <input
                    type="number"
                    value={product.quantity}
                    onChange={(e) =>
                      handleProductChange(index, "quantity", e.target.value)
                    }
                    className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                    min="1"
                    placeholder="Nhập số lượng"
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

            {/* Total Section */}
            <div className="flex justify-end items-center p-4 bg-gray-50 rounded-lg">
              <span className="font-medium text-lg mr-4">Tổng giá trị:</span>
              <span className="text-xl font-semibold text-indigo-600">
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(calculateTotal())}
              </span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ghi chú
            </label>
            <input
              type="text"
              name="notes"
              value={formData.notes}
              onChange={onChange}
              className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
              Thêm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ImportForm;
