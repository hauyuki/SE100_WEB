import React from "react";
import { FaTimes } from "react-icons/fa";
import { InboundReport, ShipmentRequest } from "../../../../models";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateShipmentSchema } from "../../../../schemas/auth";
import { useUpdateShipment } from "../../../../hooks/shipments";
import { UpdateShipmentRequest } from "../../../../models/Shipment";
import ButtonPrimary from "../../../../components/Button/ButtonPrimary";
interface UpdateImportFormProps {
  showForm: boolean;
  importData: InboundReport;
  onClose: () => void;
  onSuccess?: () => void;
  onError?: () => void;
}

const UpdateImportForm: React.FC<UpdateImportFormProps> = ({
  showForm,
  importData,
  onClose,
  onSuccess,
  onError,
}) => {
  const { mutate: updateShipment, isPending } = useUpdateShipment();
  const form = useForm<UpdateShipmentRequest>({
    resolver: zodResolver(UpdateShipmentSchema),
    defaultValues: {
      date: importData.shipment.date.toISOString(),
      completedDate: importData.shipment.completedDate
        ? importData.shipment.completedDate.toISOString()
        : "",
      carrier: importData.shipment.carrier,
      fromLocation: importData.shipment.fromPosition ?? "",
      toLocation: importData.shipment.toPosition ?? "",
      employeeId: importData.shipment.pic.id,
      status: importData.shipment.status,
      type: importData.shipment.type,
    },
  });

  const onSubmit = (data: UpdateShipmentRequest) => {
    console.log("Form Data:", data);
    updateShipment(
      { ...data, id: importData.shipment.id },
      {
        onSuccess: () => {
          console.log("success");
          onClose();
          onSuccess?.();
        },
        onError: () => {
          console.log("err");
          onError?.();
        },
      }
    );
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = form;
  console.log(form.formState.errors);
  const shipmentStatus = watch("status");
  if (!showForm) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 w-full max-w-lg">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">Sửa Phiếu Nhập</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes />
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Trạng thái vận chuyển
            </label>
            <select
              {...register("status")}
              className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            >
              <option value="PENDING">Đang chờ</option>
              <option value="IN_PROGRESS">Đang vận chuyển</option>
              <option value="CANCELLED">Vận chuyển thất bại</option>
              <option value="COMPLETED">Vận chuyển thành công</option>
            </select>
          </div>

          {shipmentStatus === "COMPLETED" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ngày hoàn thành
              </label>
              <input
                type="date"
                {...register("completedDate")}
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
            <ButtonPrimary
              type="submit"
              disabled={isPending}
              loading={isPending}
              className="px-6 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none"
            >
              Lưu
            </ButtonPrimary>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateImportForm;
