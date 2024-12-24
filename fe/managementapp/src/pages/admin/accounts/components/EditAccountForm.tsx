import React from "react";
import { FiX } from "react-icons/fi";

interface Account {
  id: number;
  fullName: string;
  position: string;
  department: string;
  email: string;
  phone: string;
  createdDate: string;
}

interface EditAccountFormProps {
  isOpen: boolean;
  onClose: () => void;
  editingAccount: Account | null;
  setEditingAccount: (account: Account | null) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const EditAccountForm: React.FC<EditAccountFormProps> = ({
  isOpen,
  onClose,
  editingAccount,
  setEditingAccount,
  onSubmit,
}) => {
  if (!isOpen || !editingAccount) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Edit Account</h2>
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
              Họ và tên
            </label>
            <input
              type="text"
              value={editingAccount.fullName}
              onChange={(e) =>
                setEditingAccount({
                  ...editingAccount,
                  fullName: e.target.value,
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phòng ban
            </label>
            <input
              type="text"
              value={editingAccount.department}
              onChange={(e) =>
                setEditingAccount({
                  ...editingAccount,
                  department: e.target.value,
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Chức vụ
            </label>
            <input
              type="text"
              value={editingAccount.position}
              onChange={(e) =>
                setEditingAccount({
                  ...editingAccount,
                  position: e.target.value,
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email liên hệ
            </label>
            <input
              type="email"
              value={editingAccount.email}
              onChange={(e) =>
                setEditingAccount({
                  ...editingAccount,
                  email: e.target.value,
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Số điện thoại liên hệ
            </label>
            <input
              type="tel"
              value={editingAccount.phone}
              onChange={(e) =>
                setEditingAccount({
                  ...editingAccount,
                  phone: e.target.value,
                })
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
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAccountForm;
