import React, { useState } from "react";
import { MagnifyingGlassIcon, PencilIcon } from "@heroicons/react/24/outline";

const Product = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Sample product data
  const products = [
    {
      stt: 1,
      sku: "SKU0001",
      name: "Content",
      image: "/product-images/1.png", // You'll need to add these images
      brand: "Dior",
      stock: 5,
      location: "A.A1",
      actions: true,
    },
    {
      stt: 2,
      sku: "SKU0001",
      name: "Content",
      image: "/product-images/2.png",
      brand: "Content",
      stock: 20,
      location: "A.A1",
      actions: true,
    },
    // Add more sample data as needed
  ];

  return (
    <div className="p-6">
      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Tìm kiếm"
            className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                STT
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                SKU
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tên sản phẩm
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ảnh
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Hãng sản xuất
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Số lượng
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Khu vực lưu trữ
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.stt}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {product.stt}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-primary">
                  {product.sku}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {product.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="h-12 w-12 rounded-lg bg-gray-100 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {product.brand}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {product.stock}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {product.location}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <button className="text-gray-600 hover:text-primary">
                    <PencilIcon className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-end items-center px-6 py-3 border-t">
          <button className="px-3 py-1 border rounded-l-lg hover:bg-gray-50">
            &lt;
          </button>
          <button className="px-3 py-1 border-t border-b bg-primary text-white">
            1
          </button>
          <button className="px-3 py-1 border hover:bg-gray-50">2</button>
          <button className="px-3 py-1 border rounded-r-lg hover:bg-gray-50">
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
