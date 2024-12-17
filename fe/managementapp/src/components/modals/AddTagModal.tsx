import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface AddTagModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (tagData: { name: string; meaning: string }) => void;
}

const AddTagModal: React.FC<AddTagModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [tagName, setTagName] = useState("");
  const [meaning, setMeaning] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name: tagName, meaning });
    setTagName("");
    setMeaning("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        {/* Overlay */}
        <div
          className="fixed inset-0 bg-black opacity-30"
          onClick={onClose}
        ></div>

        {/* Modal */}
        <div className="relative bg-white rounded-lg w-full max-w-md p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">Thêm thẻ tag mới</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="tagName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Tên thẻ tag
                </label>
                <input
                  type="text"
                  id="tagName"
                  value={tagName}
                  onChange={(e) => setTagName(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="meaning"
                  className="block text-sm font-medium text-gray-700"
                >
                  Ý nghĩa
                </label>
                <input
                  type="text"
                  id="meaning"
                  value={meaning}
                  onChange={(e) => setMeaning(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none"
                  required
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
              >
                Tạo mới
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTagModal;
