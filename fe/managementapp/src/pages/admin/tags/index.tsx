import React, { useState } from "react";
import { FiEdit2, FiPlus } from "react-icons/fi";
import AddTagForm from "./components/AddTagForm";
import EditTagForm from "./components/EditTagForm";

interface Tag {
  id: number;
  tagName: string;
  meaning: string;
  createdDate: string;
}

const TagManagementPage = () => {
  const dummyData = Array.from({ length: 10 }, (_, index) => ({
    id: index + 1,
    tagName: "Perishable",
    meaning: "Dễ hỏng",
    createdDate: "05/12/2024",
  }));

  const [tags, setTags] = useState<Tag[]>(dummyData);
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [newTag, setNewTag] = useState({ tagName: "", meaning: "" });
  const [editingTag, setEditingTag] = useState<Tag | null>(null);

  const handleCreateTag = () => {
    setIsAddPopupOpen(true);
  };

  const handleEditTag = (tag: Tag) => {
    setEditingTag(tag);
    setIsEditPopupOpen(true);
  };

  const handleDeleteTag = (tagId: number) => {
    const updatedTags = tags.filter((tag) => tag.id !== tagId);
    setTags(updatedTags);
    setIsEditPopupOpen(false);
    setEditingTag(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tagToAdd = {
      id: tags.length + 1,
      tagName: newTag.tagName,
      meaning: newTag.meaning,
      createdDate: new Date().toLocaleDateString(),
    };
    setTags([...tags, tagToAdd]);
    setNewTag({ tagName: "", meaning: "" });
    setIsAddPopupOpen(false);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTag) return;

    const updatedTags = tags.map((tag) =>
      tag.id === editingTag.id
        ? {
            ...editingTag,
            createdDate: editingTag.createdDate,
          }
        : tag
    );
    setTags(updatedTags);
    setIsEditPopupOpen(false);
    setEditingTag(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Tag Management</h1>
        <button
          onClick={handleCreateTag}
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 flex items-center gap-2"
        >
          <FiPlus className="w-5 h-5" />
          <span>Tạo mới Tag</span>
        </button>
      </div>

      <AddTagForm
        isOpen={isAddPopupOpen}
        onClose={() => setIsAddPopupOpen(false)}
        newTag={newTag}
        setNewTag={setNewTag}
        onSubmit={handleSubmit}
      />

      <EditTagForm
        isOpen={isEditPopupOpen}
        onClose={() => setIsEditPopupOpen(false)}
        editingTag={editingTag}
        setEditingTag={setEditingTag}
        onSubmit={handleEditSubmit}
        onDelete={handleDeleteTag}
      />

      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  STT
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Tên thẻ tag
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Ý nghĩa
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Ngày tạo
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Edit
                </th>
              </tr>
            </thead>
            <tbody>
              {tags.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-gray-200 hover:bg-gray-50 transition duration-200"
                >
                  <td className="px-6 py-4 text-sm text-gray-600">{item.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {item.tagName}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {item.meaning}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {item.createdDate}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <button
                      onClick={() => handleEditTag(item)}
                      className="text-gray-600 hover:text-purple-600 transition duration-200"
                    >
                      <FiEdit2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TagManagementPage;
