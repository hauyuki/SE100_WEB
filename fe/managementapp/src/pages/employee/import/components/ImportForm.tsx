import React from "react";
import { FaTimes } from "react-icons/fa";

interface FormData {
  orderId: string;
  totalValue: string;
  shipper: string;
  shippingDate: string;
  completionDate: string;
  notes: string;
}

interface ImportFormProps {
  showForm: boolean;
  formData: FormData;
  onClose: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ImportForm: React.FC<ImportFormProps> = ({
  showForm,
  formData,
  onClose,
  onSubmit,
  onChange,
}) => {
  if (!showForm) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">Thêm Phiếu Nhập Mới</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes />
          </button>
        </div>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mã vận đơn
              </label>
              <input
                type="text"
                name="orderId"
                value={formData.orderId}
                onChange={onChange}
                className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tổng giá trị
              </label>
              <input
                type="number"
                name="totalValue"
                value={formData.totalValue}
                onChange={onChange}
                className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Đơn vị vận chuyển
              </label>
              <input
                type="text"
                name="shipper"
                value={formData.shipper}
                onChange={onChange}
                className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ngày vận chuyển
              </label>
              <input
                type="date"
                name="shippingDate"
                value={formData.shippingDate}
                onChange={onChange}
                className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ngày hoàn thành
              </label>
              <input
                type="date"
                name="completionDate"
                value={formData.completionDate}
                onChange={onChange}
                className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ghi chú
              </label>
              <input
                type="text"
                name="notes"
                value={formData.notes}
                onChange={onChange}
                className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-4 mt-6">
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
              Thêm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ImportForm;
