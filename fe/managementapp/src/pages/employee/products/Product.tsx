import React, { useState, useMemo } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { Product } from "../../../models/Product";
import { useGetProducts } from "../../../hooks/products";
import AddProductForm from "../../admin/products/component/AddProductForm";
import { FaPlus } from "react-icons/fa";
import { useGetStatistics } from "../../../hooks/statistics";
import Loading from "../../../components/Loading";

const ProductPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedStorageArea, setSelectedStorageArea] = useState("");
  const [sortQuantity, setSortQuantity] = useState<"asc" | "desc" | "">("");
  const productsPerPage = 10;
  const navigate = useNavigate();
  const { data: statistic } = useGetStatistics();
  const {
    data: products,
    isPending: loading,
    isError: error,
  } = useGetProducts();
  const [showForm, setShowForm] = useState(false);
  const { user } = useAuthContext();
  // Get unique categories, companies, and storage areas for filters
  const categories = useMemo(() => {
    if (!products?.productList) return [];
    return Array.from(
      new Set(products.productList.map((p) => p.category.name))
    );
  }, [products?.productList]);

  const companies = useMemo(() => {
    if (!products?.productList) return [];
    return Array.from(new Set(products.productList.map((p) => p.company.name)));
  }, [products?.productList]);

  const storageAreas = useMemo(() => {
    if (!products?.productList) return [];
    return Array.from(new Set(products.productList.map((p) => p.storageArea)));
  }, [products?.productList]);

  // Filter products based on all criteria
  const filteredProducts = useMemo(() => {
    if (!products?.productList) return [];

    return products.productList
      .filter((product) =>
        Object.values(product).some((value) =>
          value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
      .filter((product) =>
        selectedCategory ? product.category.name === selectedCategory : true
      )
      .filter((product) =>
        selectedCompany ? product.company.name === selectedCompany : true
      )
      .filter((product) =>
        selectedStorageArea ? product.storageArea === selectedStorageArea : true
      )
      .sort((a, b) => {
        if (sortQuantity === "asc") {
          return a.quantity - b.quantity;
        } else if (sortQuantity === "desc") {
          return b.quantity - a.quantity;
        }
        return 0;
      });
  }, [
    products?.productList,
    searchTerm,
    selectedCategory,
    selectedCompany,
    selectedStorageArea,
    sortQuantity,
  ]);

  //Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleQuantitySort = () => {
    if (sortQuantity === "") setSortQuantity("asc");
    else if (sortQuantity === "asc") setSortQuantity("desc");
    else setSortQuantity("");
  };
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handleRowClick = (id: number) => {
    if (user?.role === Role.ADMIN_ROLE) {
      navigate(`/admin/product/${id}`);
    } else {
      navigate(`/product/${id}`);
    }
  };

  return (
    <>
      <div className="p-6">
        {/* Search and Filters */}
        <div className="mb-6">
          {/* Search Bar and Filters in one row */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Tất cả danh mục</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <select
              value={selectedCompany}
              onChange={(e) => setSelectedCompany(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Tất cả hãng sản xuất</option>
              {companies.map((company) => (
                <option key={company} value={company}>
                  {company}
                </option>
              ))}
            </select>
            <select
              value={selectedStorageArea}
              onChange={(e) => setSelectedStorageArea(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Tất cả khu vực</option>
              {storageAreas.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>
            <button
              onClick={handleQuantitySort}
              className={`px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                sortQuantity ? "bg-indigo-50" : ""
              }`}
            >
              Số lượng{" "}
              {sortQuantity === "asc"
                ? "↑"
                : sortQuantity === "desc"
                ? "↓"
                : ""}
            </button>
            {user && user.role === Role.ADMIN_ROLE && (
              <button
                className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center hover:bg-indigo-600 transition-colors"
                onClick={() => setShowForm(true)}
              >
                <FaPlus className="text-white" />
              </button>
            )}{" "}
          </div>
        </div>
        <AddProductForm
          showForm={showForm}
          onClose={() => setShowForm(false)}
        />

        {loading ? (
          <Loading />
        ) : error ? (
          <div className="text-red-500 text-center py-4">{error}</div>
        ) : (
          <div className="bg-white rounded-lg shadow">
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
                    Tên sản phẩm
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Danh mục
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Hãng sản xuất
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Số lượng
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Khu vực lưu trữ
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentProducts.map((product, index) => (
                  <tr
                    key={product.id}
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleRowClick(product.id)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {indexOfFirstProduct + index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-primary">
                      {product.sku}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {product.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {product.category.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {product.company.name}
                    </td>
                    <td
                      className={`px-6 py-4 whitespace-nowrap text-sm ${
                        product.quantity <= product.minQuantity
                          ? "text-red-500"
                          : "text-gray-900"
                      }`}
                    >
                      {product.quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {product.tags?.[0]?.area.name ?? "A1"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-end items-center px-6 py-3 border-t">
              <button
                className="px-3 py-1 border rounded-l-lg hover:bg-gray-50 disabled:opacity-50"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                &lt;
              </button>
              {pageNumbers.map((number) => (
                <button
                  key={number}
                  className={`px-3 py-1 border-t border-b ${
                    currentPage === number
                      ? "bg-primary text-white"
                      : "hover:bg-gray-50"
                  }`}
                  onClick={() => handlePageChange(number)}
                >
                  {number}
                </button>
              ))}
              <button
                className="px-3 py-1 border rounded-r-lg hover:bg-gray-50 disabled:opacity-50"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                &gt;
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductPage;
