import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeftIcon, PencilIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import productImage1 from "../../../assets/images/itempic.png";
import { useDeleteProduct, useGetProductDetail } from "../../../hooks/products";
import EditProductForm from "../../admin/products/component/EditProductForm";
import { Role } from "../../../models/Auth";
import { useAuthContext } from "../../../contexts/AuthContext";
import Loading from "../../../components/Loading";
import Snackbar from "../../../components/Snackbar";
import { ProductApis } from "../../../api/ProductApis";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [isShowEditForm, setIsShowEditForm] = useState(false);
  const { user } = useAuthContext();
  const [snackbar, setSnackbar] = useState<{
    show: boolean;
    message: string;
    type: "success" | "error";
  }>({
    show: false,
    message: "",
    type: "success",
  });
  const {
    data: editedProduct,
    isLoading,
    isRefetching,
    isError,
  } = useGetProductDetail(Number(id));

  console.log('Product detail raw:', editedProduct);

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, show: false }));
  };

  const handleUpdateSuccess = () => {
    setIsShowEditForm(false);
    setSnackbar({
      show: true,
      message: "Cập nhật sản phẩm thành công",
      type: "success",
    });
  };

  const handleUpdateError = (error: string) => {
    setSnackbar({
      show: true,
      message: error || "Cập nhật sản phẩm thất bại",
      type: "error",
    });
  };

  const handleEdit = () => {
    // setIsEditing(true);
    setIsShowEditForm(true);
  };

  const handleSave = () => {
    // TODO: Implement save functionality
    console.log("Saving changes:", editedProduct);
    setIsEditing(false);
  };

  const handleDelete = async(id:number) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      await ProductApis.deleteProduct(id)
      navigate("/product");
    }
  };

  const handleInputChange = (field: string, value: string | string[]) => {
    // setEditedProduct((prev) => ({
    //   ...prev,
    //   [field]: value,
    // }));
  };

  const handleDetailChange = (
    index: number,
    field: string,
    value: string | number
  ) => {
    // setEditedProduct((prev) => ({
    //   ...prev,
    //   details: prev.details.map((detail, i) =>
    //     i === index ? { ...detail, [field]: value } : detail
    //   ),
    // }));
  };

  console.log('Product detail:', editedProduct);

  return (
    <>
      {isLoading || isRefetching ? (
        <Loading />
      ) : isError ? (
        <div className="text-red-500 text-center py-4">Đã có lỗi xảy ra</div>
      ) : (
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <Link
              to={
                user?.role == Role.EMPLOYEE_ROLE
                  ? "/product"
                  : "/admin/products"
              }
              className="inline-flex items-center text-primary"
            >
              <ChevronLeftIcon className="h-5 w-5 mr-1" />
              Trở về
            </Link>
            {user?.role == Role.ADMIN_ROLE && editedProduct && (
              <button
                onClick={handleEdit}
                className="inline-flex items-center text-indigo-600 hover:text-indigo-900"
              >
                <PencilIcon className="h-5 w-5 mr-1" />
                Sửa
              </button>
            )}{" "}
          </div>
          {editedProduct && (
            <EditProductForm
              showForm={isShowEditForm}
              onClose={() => setIsShowEditForm(false)}
              product={editedProduct}
              onSuccess={handleUpdateSuccess}
              onError={handleUpdateError}
            />
          )}{" "}
          {/* Rest of the existing code until the general information section */}
          {/* General information */}
          <div className="bg-white rounded-lg p-6 mb-6">
            <h2 className="text-lg font-medium mb-4">Thông tin chung</h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-gray-600 mb-2">Tên sản phẩm</p>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedProduct?.category?.name}
                    // onChange={(e) => handleInputChange("category", e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                ) : (
                  <p>{editedProduct?.name}</p>
                )}
              </div>
              <div>
                <p className="text-gray-600 mb-2">Danh mục</p>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedProduct?.category?.name}
                    // onChange={(e) => handleInputChange("category", e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                ) : (
                  <p>{editedProduct?.category?.name}</p>
                )}
              </div>
              <div>
                <p className="text-gray-600 mb-2">Xuất xứ</p>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedProduct?.company?.address}
                    onChange={(e) =>
                      handleInputChange("origin", e.target.value)
                    }
                    className="w-full p-2 border rounded"
                  />
                ) : (
                  <p>{editedProduct?.company?.address}</p>
                )}
              </div>
              <div>
                <p className="text-gray-600 mb-2">Hãng sản xuất</p>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedProduct?.company?.name}
                    onChange={(e) =>
                      handleInputChange("manufacturer", e.target.value)
                    }
                    className="w-full p-2 border rounded"
                  />
                ) : (
                  <p>{editedProduct?.company?.name}</p>
                )}
              </div>
              <div>
                <p className="text-gray-600 mb-2">Số lượng nhỏ nhất</p>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedProduct?.company?.name}
                    onChange={(e) =>
                      handleInputChange("manufacturer", e.target.value)
                    }
                    className="w-full p-2 border rounded"
                  />
                ) : (
                  <p>{editedProduct?.minQuantity}</p>
                )}
              </div>
              <div>
                <p className="text-gray-600 mb-2">Số lượng lớn nhất</p>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedProduct?.company?.name}
                    onChange={(e) =>
                      handleInputChange("manufacturer", e.target.value)
                    }
                    className="w-full p-2 border rounded"
                  />
                ) : (
                  <p>{editedProduct?.maxQuantity}</p>
                )}
              </div>
              <div>
                <p className="text-gray-600 mb-2">Giá thị trường</p>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedProduct?.company?.name}
                    onChange={(e) =>
                      handleInputChange("manufacturer", e.target.value)
                    }
                    className="w-full p-2 border rounded"
                  />
                ) : (
                  <p>{editedProduct?.marketPrice}</p>
                )}
              </div>
              <div>
                <p className="text-gray-600 mb-2">Giá sản xuất</p>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedProduct?.company?.name}
                    onChange={(e) =>
                      handleInputChange("manufacturer", e.target.value)
                    }
                    className="w-full p-2 border rounded"
                  />
                ) : (
                  <p>{editedProduct?.productionCost}</p>
                )}
              </div>
              <div>
                <p className="text-gray-600 mb-2">Mã SKU</p>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedProduct?.sku}
                    onChange={(e) => handleInputChange("unit", e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                ) : (
                  <p>{editedProduct?.sku}</p>
                )}
              </div>
              <div className="col-span-2">
                <p className="text-gray-600 mb-2">Loại tag</p>
                <div className="flex gap-2">
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedProduct?.tags.join(", ")}
                      onChange={(e) =>
                        handleInputChange("tags", e.target.value.split(", "))
                      }
                      className="w-full p-2 border rounded"
                      placeholder="Nhập các tag, phân cách bằng dấu phẩy"
                    />
                  ) : (
                    editedProduct?.tags?.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-sm"
                      >
                        {tag.name}
                      </span>
                    ))
                  )}
                </div>
              </div>
              <div>
                <p className="text-gray-600 mb-2">Loại sản phẩm</p>
                <p>
                  {editedProduct?.type === 'CREAM' && 'Dạng kem'}
                  {editedProduct?.type === 'SPRAY' && 'Dạng xịt'}
                  {editedProduct?.type === 'LOTION' && 'Dạng lotion'}
                  {editedProduct?.type === 'POWDER' && 'Dạng bột'}
                  {editedProduct?.type === 'OTHER' && 'Dạng khác'}
                </p>
              </div>
              {editedProduct?.type && ['CREAM', 'SPRAY', 'LOTION'].includes(editedProduct.type) && (
                <div>
                  <p className="text-gray-600 mb-2">Dung tích</p>
                  <p>{editedProduct?.volume || editedProduct?.capacity}</p>
                </div>
              )}
              {editedProduct?.type === 'POWDER' && (
                <div>
                  <p className="text-gray-600 mb-2">Khối lượng</p>
                  <p>{editedProduct?.weight}</p>
                </div>
              )}
            </div>
          </div>
          {/* Detailed information */}
          <div className="bg-white rounded-lg p-6 mb-6">
            <h2 className="text-lg font-medium mb-4">Thông tin chi tiết</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50">
                    {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  STT
                </th> */}
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Mã phiếu nhập
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Số lượng nhập
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Số lượng tồn
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Giá nhập
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Tổng tiền
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Ngày sản xuất
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Ngày hết hạn
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {editedProduct?.items?.map((detail, index) => (
                    <tr key={detail.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {detail.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-primary">
                        {detail.quantity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {detail.stockQuantity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {detail.unitPrice}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {detail.totalPrice}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {new Date(detail.expirationDate).toDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {new Date(detail.expirationDate).toDateString()}
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
                value={editedProduct?.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                className="w-full p-2 border rounded min-h-[200px]"
              />
            ) : (
              <div className="whitespace-pre-line text-gray-600">
                {editedProduct?.description}
              </div>
            )}
          </div>
          {/* Action buttons */}
          <div className="bg-white rounded-lg p-6 flex justify-end gap-4">
            {/* <button
          onClick={handleSave}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Lưu
        </button> */}
            {user?.role === Role.ADMIN_ROLE && (
              <button
                onClick={()=>handleDelete(Number(editedProduct?.id))}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Xóa
              </button>
            )}{" "}
          </div>
          <Snackbar
            show={snackbar.show}
            message={snackbar.message}
            type={snackbar.type}
            onClose={handleCloseSnackbar}
          />
        </div>
      )}
    </>
  );
};

export default ProductDetail;
