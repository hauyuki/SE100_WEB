import React from "react";
import { FiX, FiTrash2 } from "react-icons/fi";

interface Tag {
  id: number;
  tagName: string;
  meaning: string;
  createdDate: string;
}

interface EditTagFormProps {
  isOpen: boolean;
  onClose: () => void;
  editingTag: Tag | null;
  setEditingTag: (tag: Tag | null) => void;
  onSubmit: (e: React.FormEvent) => void;
  onDelete: (id: number) => void;
}

const EditTagForm: React.FC<EditTagFormProps> = ({
  isOpen,
  onClose,
  editingTag,
  setEditingTag,
  onSubmit,
  onDelete,
}) => {
  if (!isOpen || !editingTag) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Edit Tag</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition duration-200"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tag Name
            </label>
            <input
              type="text"
              value={editingTag.tagName}
              onChange={(e) =>
                setEditingTag({ ...editingTag, tagName: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Meaning
            </label>
            <input
              type="text"
              value={editingTag.meaning}
              onChange={(e) =>
                setEditingTag({ ...editingTag, meaning: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ngày tạo
            </label>
            <input
              type="date"
              value={
                editingTag.createdDate
                  ? new Date(editingTag.createdDate).toISOString().split("T")[0]
                  : ""
              }
              onChange={(e) =>
                setEditingTag({
                  ...editingTag,
                  createdDate: new Date(e.target.value).toLocaleDateString(),
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              required
            />
          </div>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => onDelete(editingTag.id)}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 flex items-center gap-2"
            >
              <FiTrash2 className="w-4 h-4" />
              Delete
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTagForm;
