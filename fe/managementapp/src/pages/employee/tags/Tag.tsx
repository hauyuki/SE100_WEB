import React, { useState } from "react";
import { PencilIcon, PlusIcon } from "@heroicons/react/24/outline";
import EditTagModal from "../../../components/modals/EditTagModal";
import AddTagModal from "../../../components/modals/AddTagModal";

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
  const [selectedArea, setSelectedArea] = useState<WarehouseArea | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState<{
    name: string;
    meaning: string;
    date: string;
  } | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

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
  const tags = [
    {
      stt: 1,
      name: "Perishable",
      meaning: "Dễ hỏng",
      dateCreated: "13/07/2024",
    },
    {
      stt: 2,
      name: "Refrigerated",
      meaning: "Bảo quản lạnh",
      dateCreated: "09/05/2020",
    },
    {
      stt: 3,
      name: "Fragile",
      meaning: "Dễ vỡ",
      dateCreated: "19/11/2020",
    },
    {
      stt: 4,
      name: "Flammable",
      meaning: "Dễ cháy",
      dateCreated: "13/12/2022",
    },
    {
      stt: 5,
      name: "Hazardous",
      meaning: "Nguy hiểm",
      dateCreated: "04/08/2022",
    },
  ];

  const handleAreaClick = (area: WarehouseArea) => {
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
    // Handle the edit submission here
    console.log("Updated tag:", tagData);
    // You would typically make an API call here to update the tag
  };

  const handleAddSubmit = (tagData: { name: string; meaning: string }) => {
    // Handle the add submission here
    console.log("New tag:", tagData);
    // You would typically make an API call here to create the tag
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-6">SƠ ĐỒ NHÀ KHO</h2>

      {/* Warehouse Layout */}
      <div className="bg-white rounded-lg p-6 mb-6">
        <div className="border-2 border-primary rounded-lg p-4">
          <div className="grid grid-cols-2 gap-4 mb-4">
            {/* A1 and A2 */}
            <div
              className={`border p-4 rounded-lg cursor-pointer hover:bg-gray-50 ${
                selectedArea?.id === "A1" ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => handleAreaClick(warehouseAreas[0])}
            >
              <h3 className="font-medium mb-2">A1</h3>
              <div className="flex gap-2 flex-wrap">
                {warehouseAreas[0].tags.map((tag) => (
                  <span
                    key={tag}
                    className={`px-2 py-1 rounded-full text-xs ${getTagColor(
                      tag
                    )}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div
              className={`border p-4 rounded-lg cursor-pointer hover:bg-gray-50 ${
                selectedArea?.id === "A2" ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => handleAreaClick(warehouseAreas[1])}
            >
              <h3 className="font-medium mb-2">A2</h3>
              <div className="flex gap-2 flex-wrap">
                {warehouseAreas[1].tags.map((tag) => (
                  <span
                    key={tag}
                    className={`px-2 py-1 rounded-full text-xs ${getTagColor(
                      tag
                    )}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* A3 and A4 */}
            <div
              className={`border p-4 rounded-lg cursor-pointer hover:bg-gray-50 ${
                selectedArea?.id === "A3" ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => handleAreaClick(warehouseAreas[2])}
            >
              <h3 className="font-medium mb-2">A3</h3>
              <div className="flex gap-2 flex-wrap">
                {warehouseAreas[2].tags.map((tag) => (
                  <span
                    key={tag}
                    className={`px-2 py-1 rounded-full text-xs ${getTagColor(
                      tag
                    )}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div
              className={`border p-4 rounded-lg cursor-pointer hover:bg-gray-50 ${
                selectedArea?.id === "A4" ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => handleAreaClick(warehouseAreas[3])}
            >
              <h3 className="font-medium mb-2">A4</h3>
              <div className="flex gap-2 flex-wrap">
                {warehouseAreas[3].tags.map((tag) => (
                  <span
                    key={tag}
                    className={`px-2 py-1 rounded-full text-xs ${getTagColor(
                      tag
                    )}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

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
              {selectedArea.products.map((product, index) => (
                <div key={index} className="border p-3 rounded-lg">
                  <p className="font-medium">{product.name}</p>
                  <div className="flex gap-2 mt-2 flex-wrap">
                    {product.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`px-2 py-1 rounded-full text-xs ${getTagColor(
                          tag
                        )}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Tags Table */}
      <div className="bg-white rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-medium">DANH SÁCH THẺ TAG</h2>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90"
          >
            Tạo mới Tag
          </button>
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
                Ngày tạo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Ghi chú
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {tags.map((tag) => (
              <tr key={tag.stt} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {tag.stt}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-primary">
                  {tag.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {tag.meaning}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {tag.dateCreated}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <button
                    className="text-gray-600 hover:text-primary"
                    onClick={() => handleEditClick(tag)}
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Add Modal */}
        <AddTagModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSubmit={handleAddSubmit}
        />

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
  );
};

export default Tag;
