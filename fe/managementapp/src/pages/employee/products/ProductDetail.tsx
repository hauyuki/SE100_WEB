import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import productImage1 from "../../../assets/images/itempic.png";

const ProductDetail = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);

  const product = {
    name: "Beplain Clean Ocean Moisture Sunscreen",
    sku: "SKU001",
    importDate: "19/06/2023",
    supplier: "JameCo",
    manufacturer: "Cosdenwhite Inc.",
    expiryDate: "01/06/2025",
    images: [productImage1, productImage1, productImage1, productImage1],
    details: [
      {
        stt: 1,
        sku: "SKU001",
        brand: "Content",
        quantity: 20,
        price: "500,000",
        sellPrice: "500,000",
        location: "A.A1",
        lotNumber: "L201024",
      },
      {
        stt: 2,
        sku: "SKU002",
        brand: "Content",
        quantity: 20,
        price: "500,000",
        sellPrice: "500,000",
        location: "A.A1",
        lotNumber: "L201024",
      },
      {
        stt: 3,
        sku: "SKU003",
        brand: "Content",
        quantity: 20,
        price: "500,000",
        sellPrice: "500,000",
        location: "A.A1",
        lotNumber: "L201024",
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
  };

  return (
    <div className="p-6">
      {/* Back button */}
      <Link
        to="/product"
        className="inline-flex items-center text-primary mb-6"
      >
        <ChevronLeftIcon className="h-5 w-5 mr-1" />
        Trở về
      </Link>

      {/* Product title */}
      <h1 className="text-2xl font-semibold mb-8">{product.name}</h1>

      {/* Product images - Moved above general information */}
      <div className="bg-white rounded-lg p-6 mb-6">
        <div className="grid grid-cols-12 gap-4">
          {/* Main large image */}
          <div className="col-span-8">
            <div className="bg-gray-50 rounded-lg p-4">
              <img
                src={product.images[selectedImage]}
                alt={`Product main view`}
                className="w-full h-[400px] object-contain"
              />
            </div>
          </div>

          {/* Thumbnail images */}
          <div className="col-span-4">
            <div className="grid grid-cols-2 gap-4">
              {product.images.map((image, index) => (
                <div
                  key={index}
                  className={`bg-gray-50 rounded-lg p-2 cursor-pointer ${
                    selectedImage === index ? "ring-2 ring-primary" : ""
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img
                    src={image}
                    alt={`Product thumbnail ${index + 1}`}
                    className="w-full h-[100px] object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* General information */}
      <div className="bg-white rounded-lg p-6 mb-6">
        <h2 className="text-lg font-medium mb-4">Thông tin chung</h2>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-gray-600 mb-2">Đơn vị nhập hàng</p>
            <p>{product.supplier}</p>
          </div>
          <div>
            <p className="text-gray-600 mb-2">Hãng sản xuất</p>
            <p>{product.manufacturer}</p>
          </div>
          <div>
            <p className="text-gray-600 mb-2">Ngày sản xuất</p>
            <p>{product.importDate}</p>
          </div>
          <div>
            <p className="text-gray-600 mb-2">Hạn sử dụng</p>
            <p>{product.expiryDate}</p>
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
                  SKU
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Mã lô
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
              {product.details.map((detail) => (
                <tr key={detail.stt}>
                  <td className="px-6 py-4 whitespace-nowrap">{detail.stt}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-primary">
                    {detail.sku}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {detail.lotNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {detail.brand}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {detail.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {detail.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {detail.sellPrice}
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
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-lg font-medium mb-4">Mô tả</h2>
        <div className="whitespace-pre-line text-gray-600">
          {product.description}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
