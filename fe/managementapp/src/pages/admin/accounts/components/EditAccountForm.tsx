import React from "react";
import { FiX } from "react-icons/fi";
import { useCreateEmployee } from "../../../../hooks/employees";
import { Employee, EmployeeRequest } from "../../../../models/Employee";
import { EmployeeRequestSchema } from "../../../../schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import ButtonPrimary from "../../../../components/Button/ButtonPrimary";

interface EditAccountFormProps {
  isOpen: boolean;
  onClose: () => void;
  employee: Employee;
}

const EditAccountForm: React.FC<EditAccountFormProps> = ({
  isOpen,
  onClose,
  employee,
}) => {
  const { mutate: createEmployee, isPending } = useCreateEmployee();

  const form = useForm<EmployeeRequest>({
    resolver: zodResolver(EmployeeRequestSchema),
    defaultValues: {
      name: employee.name,
      position: employee.position,
      phone: employee.phone,
      department: employee.department,
      address: employee.address,
      avatar:
        "https://cbpdizdmebasivufwuer.supabase.co/storage/v1/object/sign/default/avatar.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZWZhdWx0L2F2YXRhci5wbmciLCJpYXQiOjE3MzU3MzI3MDMsImV4cCI6MjA1MTA5MjcwM30.noj-wPlNid8enMv1c-BzIia8k7XNdCpDOq3JmW-spQk",
      username: employee.username,
      password: employee.password,
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = (data: EmployeeRequest) => {
    console.log(data);
    createEmployee(data, {
      onSuccess: () => onClose(),
      onError: () => console.error("Error creating employee"),
    });
  };
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Tạo Tài Khoản Mới
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition duration-200"
            aria-label="Close"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-4"
        >
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Họ và tên
            </label>
            <input
              type="text"
              placeholder="Nhập họ và tên của bạn"
              {...register("name")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phòng ban
            </label>
            <input
              type="text"
              placeholder="Nhập phòng ban"
              {...register("department")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Địa chỉ
            </label>
            <input
              type="text"
              placeholder="Nhập địa chỉ"
              {...register("address")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ngày sinh
            </label>
            <input
              type="date"
              {...register("dob")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Chức vụ
            </label>
            <input
              type="text"
              placeholder="Nhập chức vụ"
              {...register("position")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email liên hệ
            </label>
            <input
              type="email"
              placeholder="Nhập email liên hệ"
              {...register("username")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Số điện thoại liên hệ
            </label>
            <input
              type="tel"
              placeholder="Nhập số điện thoại"
              {...register("phone")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mật khẩu
            </label>
            <input
              type="password"
              placeholder="Nhập mật khẩu"
              {...register("password")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div className="col-span-2 flex justify-end gap-3">
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

export default EditAccountForm;
