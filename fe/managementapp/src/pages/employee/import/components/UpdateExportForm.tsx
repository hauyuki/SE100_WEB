import React from "react";
import { FaTimes } from "react-icons/fa";

interface UpdateExportFormProps {
  showForm: boolean;
  exportData: {
    orderId: string;
    status: string;
    completionDate?: string;
  };
  onClose: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

const UpdateExportForm: React.FC<UpdateExportFormProps> = ({
  showForm,
  exportData,
  onClose,
  onSubmit,
  onChange,
}) => {
  if (!showForm) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 w-full max-w-lg">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">
            Sửa Phiếu Xuất {exportData.orderId}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes />
          </button>
        </div>
        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Trạng thái vận chuyển
            </label>
            <select
              name="status"
              value={exportData.status}
              onChange={onChange}
              className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            >
              <option value="Đang vận chuyển">Đang vận chuyển</option>
              <option value="Vận chuyển thành công">
                Vận chuyển thành công
              </option>
              <option value="Vận chuyển thất bại">Vận chuyển thất bại</option>
            </select>
          </div>

          {exportData.status === "Vận chuyển thành công" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ngày hoàn thành
              </label>
              <input
                type="date"
                name="completionDate"
                value={exportData.completionDate || ""}
                onChange={onChange}
                className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
          )}

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-50"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
            >
              Lưu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateExportForm;
