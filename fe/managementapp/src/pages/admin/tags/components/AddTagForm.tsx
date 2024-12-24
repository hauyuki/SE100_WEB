import React from "react";
import { FiX } from "react-icons/fi";

interface AddTagFormProps {
  isOpen: boolean;
  onClose: () => void;
  newTag: { tagName: string; meaning: string };
  setNewTag: (tag: { tagName: string; meaning: string }) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const AddTagForm: React.FC<AddTagFormProps> = ({
  isOpen,
  onClose,
  newTag,
  setNewTag,
  onSubmit,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Create New Tag
          </h2>
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
              value={newTag.tagName}
              onChange={(e) =>
                setNewTag({ ...newTag, tagName: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Meaning
            </label>
            <input
              type="text"
              value={newTag.meaning}
              onChange={(e) =>
                setNewTag({ ...newTag, meaning: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              required
            />
          </div>
          <div className="flex justify-end gap-3">
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTagForm;
