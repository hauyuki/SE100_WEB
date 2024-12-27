import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeftIcon, PencilIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import productImage1 from "../../../assets/images/itempic.png";

const ProductDetail = () => {
  const { sku } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState({
    name: "Beplain Clean Ocean Moisture Sunscreen",
    sku: sku,
    category: "Mỹ phẩm",
    origin: "Hàn Quốc",
    manufacturer: "Cosdenwhite Inc.",
    unit: "Hộp",
    tags: ["Mỹ phẩm"],
    images: [productImage1, productImage1, productImage1, productImage1],
    details: [
      {
        stt: 1,
        importId: "IM001",
        color: "Xanh dương",
        capacity: "100ml",
        quantity: 20,
        importPrice: "500,000",
        retailPrice: "750,000",
        location: "A.A1",
      },
      {
        stt: 2,
        importId: "IM002",
        color: "Hồng nhạt",
        capacity: "100ml",
        quantity: 15,
        importPrice: "500,000",
        retailPrice: "750,000",
        location: "A.A2",
      },
      {
        stt: 3,
        importId: "IM003",
        color: "Trắng",
        capacity: "50ml",
        quantity: 30,
        importPrice: "300,000",
        retailPrice: "450,000",
        location: "A.A3",
      },
    ],
    description: `
      Thành phần chủ yếu:
      1. Kem Chống Nắng Beplain Sunmune Tone Up & Correcting Sunscreen SPF50+ PA++++ Nâng Tông, Cấp Ẩm Công Nghệ Bông Sơn
      (Màu Tím Sáng)

      Thành phần chủ yếu:
      Chứa thành phần chính Daucus Carota Sativa (Carrot) Root Extract (chiết xuất Cà rốt) kết hợp công nghệ Microfine giúp bổ sung độ ẩm và hỗ trợ làm dịu da.

      Sản phẩm với thành phần Macadamia (Vitamin B5) hỗ trợ tăng tông da, mang lại làn da sáng mịn và mềm mại.

      Water (Aqua), Ethylhexyl Triazone 4, Dibutyl Adipate, Propanediol, Diethylamino Hydroxybenzoyl Hexyl Benzoate 3, Butylene Glycol 3, Butyloctyl Salicylate 3, Bis-Ethylhexyloxyphenol Methoxyphenyl Triazine 3, Niacinamide, Hexyl Benzoate 3, Butyloctyl Salicylate 3, Bis-Ethylhexyloxyphenol Methoxyphenyl Triazine 3, Butylene Glycol 3
    `,
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // TODO: Implement save functionality
    console.log("Saving changes:", editedProduct);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      // TODO: Implement delete functionality
      console.log("Deleting product:", sku);
      navigate("/product");
    }
  };

  const handleInputChange = (field: string, value: string | string[]) => {
    setEditedProduct((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDetailChange = (
    index: number,
    field: string,
    value: string | number
  ) => {
    setEditedProduct((prev) => ({
      ...prev,
      details: prev.details.map((detail, i) =>
        i === index ? { ...detail, [field]: value } : detail
      ),
    }));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <Link to="/product" className="inline-flex items-center text-primary">
          <ChevronLeftIcon className="h-5 w-5 mr-1" />
          Trở về
        </Link>
        <button
          onClick={handleEdit}
          className="inline-flex items-center text-indigo-600 hover:text-indigo-900"
        >
          <PencilIcon className="h-5 w-5 mr-1" />
          Sửa
        </button>
      </div>

      {/* Rest of the existing code until the general information section */}

      {/* General information */}
      <div className="bg-white rounded-lg p-6 mb-6">
        <h2 className="text-lg font-medium mb-4">Thông tin chung</h2>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-gray-600 mb-2">Danh mục</p>
            {isEditing ? (
              <input
                type="text"
                value={editedProduct.category}
                onChange={(e) => handleInputChange("category", e.target.value)}
                className="w-full p-2 border rounded"
              />
            ) : (
              <p>{editedProduct.category}</p>
            )}
          </div>
          <div>
            <p className="text-gray-600 mb-2">Xuất xứ</p>
            {isEditing ? (
              <input
                type="text"
                value={editedProduct.origin}
                onChange={(e) => handleInputChange("origin", e.target.value)}
                className="w-full p-2 border rounded"
              />
            ) : (
              <p>{editedProduct.origin}</p>
            )}
          </div>
          <div>
            <p className="text-gray-600 mb-2">Hãng sản xuất</p>
            {isEditing ? (
              <input
                type="text"
                value={editedProduct.manufacturer}
                onChange={(e) =>
                  handleInputChange("manufacturer", e.target.value)
                }
                className="w-full p-2 border rounded"
              />
            ) : (
              <p>{editedProduct.manufacturer}</p>
            )}
          </div>
          <div>
            <p className="text-gray-600 mb-2">Đơn vị tính</p>
            {isEditing ? (
              <input
                type="text"
                value={editedProduct.unit}
                onChange={(e) => handleInputChange("unit", e.target.value)}
                className="w-full p-2 border rounded"
              />
            ) : (
              <p>{editedProduct.unit}</p>
            )}
          </div>
          <div className="col-span-2">
            <p className="text-gray-600 mb-2">Loại tag</p>
            <div className="flex gap-2">
              {isEditing ? (
                <input
                  type="text"
                  value={editedProduct.tags.join(", ")}
                  onChange={(e) =>
                    handleInputChange("tags", e.target.value.split(", "))
                  }
                  className="w-full p-2 border rounded"
                  placeholder="Nhập các tag, phân cách bằng dấu phẩy"
                />
              ) : (
                editedProduct.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Detailed information */}
      <div className="bg-white rounded-lg p-6 mb-6">
        <h2 className="text-lg font-medium mb-4">Thông tin chi tiết</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  STT
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Mã phiếu nhập
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Màu sắc
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Dung tích
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Số lượng
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Giá nhập
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Giá bán lẻ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Vị trí
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {editedProduct.details.map((detail, index) => (
                <tr key={detail.stt}>
                  <td className="px-6 py-4 whitespace-nowrap">{detail.stt}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-primary">
                    {detail.importId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {detail.color}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {detail.capacity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {detail.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {detail.importPrice}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {detail.retailPrice}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {detail.location}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Description */}
      <div className="bg-white rounded-lg p-6 mb-6">
        <h2 className="text-lg font-medium mb-4">Mô tả</h2>
        {isEditing ? (
          <textarea
            value={editedProduct.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            className="w-full p-2 border rounded min-h-[200px]"
          />
        ) : (
          <div className="whitespace-pre-line text-gray-600">
            {editedProduct.description}
          </div>
        )}
      </div>

      {/* Action buttons */}
      <div className="bg-white rounded-lg p-6 flex justify-end gap-4">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Lưu
        </button>
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Xóa
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
