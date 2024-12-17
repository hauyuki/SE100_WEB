import React, { useState, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface EditTagModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (tagData: { name: string; meaning: string }) => void;
  initialData: {
    name: string;
    meaning: string;
    date: string;
  };
}

const EditTagModal: React.FC<EditTagModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) => {
  const [tagName, setTagName] = useState(initialData.name);
  const [meaning, setMeaning] = useState(initialData.meaning);

  useEffect(() => {
    setTagName(initialData.name);
    setMeaning(initialData.meaning);
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name: tagName, meaning });
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
            <h2 className="text-lg font-medium">Chỉnh sửa thẻ tag</h2>
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

              <div>
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-gray-700"
                >
                  Ngày tạo
                </label>
                <input
                  type="text"
                  id="date"
                  value={initialData.date}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 bg-gray-50 text-gray-500 cursor-not-allowed"
                  disabled
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
                Lưu
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditTagModal;
