import React, { useState } from "react";
import { PencilIcon } from "@heroicons/react/24/outline";
import EditTagModal from "../../../components/modals/EditTagModal";
import AddTagForm from "../../admin/tags/components/AddTagForm";
import { useGetTags } from "../../../hooks/tags";
import { useGetProducts } from "../../../hooks/products";
import { useGetAreas } from "../../../hooks/areas";
import { Area } from "../../../models/Area";
import { useAuthContext } from "../../../contexts/AuthContext";
import { Role } from "../../../models/Auth";
import Snackbar from "../../../components/Snackbar";

interface AreaProduct {
  name: string;
  tags: string[];
}

interface WarehouseArea {
  id: string;
  name: string;
  tags: string[];
  products: AreaProduct[];
}

const Tag = () => {
  const [selectedArea, setSelectedArea] = useState<Area | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState<{
    name: string;
    meaning: string;
    date: string;
  } | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({
    show: false,
    message: "",
    type: "success" as "success" | "error",
  });

  // Warehouse areas data
  const warehouseAreas: WarehouseArea[] = [
    {
      id: "A1",
      name: "A1",
      tags: ["PERISHABLE", "REFRIGERATED"],
      products: [
        { name: "Milk", tags: ["PERISHABLE", "REFRIGERATED"] },
        { name: "Yogurt", tags: ["PERISHABLE", "REFRIGERATED"] },
      ],
    },
    {
      id: "A2",
      name: "A2",
      tags: ["FLAMMABLE", "HAZARDOUS"],
      products: [
        { name: "Paint", tags: ["FLAMMABLE"] },
        { name: "Chemicals", tags: ["HAZARDOUS"] },
      ],
    },
    {
      id: "A3",
      name: "A3",
      tags: ["FRAGILE"],
      products: [
        { name: "Glass Items", tags: ["FRAGILE"] },
        { name: "Ceramics", tags: ["FRAGILE"] },
      ],
    },
    {
      id: "A4",
      name: "A4",
      tags: ["HIGH VALUE"],
      products: [
        { name: "Electronics", tags: ["HIGH VALUE"] },
        { name: "Jewelry", tags: ["HIGH VALUE"] },
      ],
    },
  ];

  // Tag list data
  const { data: tags } = useGetTags();
  const { data: areas } = useGetAreas();
  const {
    data: products,
    isPending: loading,
    isError: error,
  } = useGetProducts();
  const { user } = useAuthContext();
  const handleAreaClick = (area: Area) => {
    setSelectedArea(area);
  };

  const getTagColor = (tag: string) => {
    const colors: { [key: string]: string } = {
      PERISHABLE: "bg-yellow-100 text-yellow-800",
      REFRIGERATED: "bg-blue-100 text-blue-800",
      FLAMMABLE: "bg-red-100 text-red-800",
      HAZARDOUS: "bg-orange-100 text-orange-800",
      FRAGILE: "bg-purple-100 text-purple-800",
      "HIGH VALUE": "bg-green-100 text-green-800",
    };
    return colors[tag] || "bg-gray-100 text-gray-800";
  };

  const handleEditClick = (tag: {
    name: string;
    meaning: string;
    dateCreated: string;
  }) => {
    setSelectedTag({
      name: tag.name,
      meaning: tag.meaning,
      date: tag.dateCreated,
    });
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = (tagData: { name: string; meaning: string }) => {
    try {
      // Handle the edit submission here
      console.log("Updated tag:", tagData);
      // You would typically make an API call here to update the tag
      setSnackbar({
        show: true,
        message: "Cập nhật tag thành công!",
        type: "success",
      });
      setIsEditModalOpen(false);
    } catch (error) {
      setSnackbar({
        show: true,
        message: "Có lỗi xảy ra khi cập nhật tag!",
        type: "error",
      });
    }
  };

  const handleAddSubmit = (tagData: { name: string; meaning: string }) => {
    try {
      // Handle the add submission here
      console.log("New tag:", tagData);
      // You would typically make an API call here to create the tag
      setSnackbar({
        show: true,
        message: "Thêm tag mới thành công!",
        type: "success",
      });
      setIsAddModalOpen(false);
    } catch (error) {
      setSnackbar({
        show: true,
        message: "Có lỗi xảy ra khi thêm tag mới!",
        type: "error",
      });
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-6">SƠ ĐỒ NHÀ KHO</h2>

      {/* Warehouse Layout */}
      <div className="bg-white rounded-lg p-6 mb-6">
        <div className="border-2 border-primary rounded-lg p-4">
          <div className="grid grid-cols-2 gap-4 mb-4">
            {/* A1 and A2 */}
            {areas?.map((area) => (
              <div
                className={`border p-4 rounded-lg cursor-pointer hover:bg-gray-50 ${
                  selectedArea?.id === area.id ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => handleAreaClick(area)}
              >
                <h3 className="font-medium mb-2">{area.name}</h3>
                <div className="flex gap-2 flex-wrap">
                  {area?.tags?.map((tag) => (
                    <span
                      key={tag.id}
                      className={`px-2 py-1 rounded-full text-xs ${getTagColor(
                        tag.name
                      )}`}
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}

            {/* Admin Office */}
            <div className="border p-4 rounded-lg w-1/3 mx-auto text-center">
              <h3 className="font-medium">Văn phòng quản lý</h3>
            </div>
          </div>

          {/* Selected Area Products */}
          {selectedArea && (
            <div className="mt-6 p-4 border rounded-lg">
              <h3 className="font-medium mb-4">
                Sản phẩm trong khu vực {selectedArea.name}:
              </h3>
              <div className="grid grid-cols-3 gap-4">
                {products?.productList?.map((product, index) => {
                  if (
                    selectedArea.tags?.some((tag) =>
                      product?.tags?.some(
                        (productTag) => productTag.id === tag.id
                      )
                    ) ||
                    (selectedArea.name === "A2" && product?.tags.length === 0)
                  ) {
                    return (
                      <div key={index} className="border p-3 rounded-lg">
                        <p className="font-medium">{product.name}</p>
                        <div className="flex gap-2 mt-2 flex-wrap">
                          {product.tags?.map((tag) => (
                            <span
                              key={tag.id}
                              className={`px-2 py-1 rounded-full text-xs ${getTagColor(
                                tag.name
                              )}`}
                            >
                              {tag.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  } else return <></>;
                })}
              </div>
            </div>
          )}
        </div>

        {/* Tags Table */}
        <div className="bg-white rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-medium">DANH SÁCH THẺ TAG</h2>
            {user?.role === Role.ADMIN_ROLE && (
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90"
              >
                Tạo mới Tag
              </button>
            )}{" "}
          </div>

          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  STT
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Tên thẻ tag
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Ý nghĩa
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Khu vực
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Ngày tạo
                </th>
                {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Ghi chú
                </th> */}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {tags?.map((tag) => (
                <tr key={tag.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {tag.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-primary">
                    {tag.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {tag.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {tag?.area?.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(tag.createdDate).toDateString()}
                  </td>
                  {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"> */}
                  {/* <button
                      className="text-gray-600 hover:text-primary"
                      // onClick={() => handleEditClick(tag)}
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button> */}
                  {/* </td> */}
                </tr>
              ))}
            </tbody>
          </table>

          {/* Add Modal */}
          {user?.role === Role.ADMIN_ROLE && (
            <AddTagForm
              isOpen={isAddModalOpen}
              onClose={() => setIsAddModalOpen(false)}
            />
          )}
          {/* Edit Modal */}
          {selectedTag && (
            <EditTagModal
              isOpen={isEditModalOpen}
              onClose={() => {
                setIsEditModalOpen(false);
                setSelectedTag(null);
              }}
              onSubmit={handleEditSubmit}
              initialData={selectedTag}
            />
          )}
        </div>
      </div>

      <Snackbar
        show={snackbar.show}
        message={snackbar.message}
        type={snackbar.type}
        onClose={() => setSnackbar({ ...snackbar, show: false })}
      />
    </div>
  );
};

export default Tag;
