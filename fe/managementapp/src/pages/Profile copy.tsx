import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { useGetUserProfile } from "../hooks/auth/query";
import { Role } from "../models/Auth";
import { EmployeeRequest, EmployeeRequestSchema } from "../schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  useUpdateEmployee,
  useUpdateEmployeeWithPassword,
} from "../hooks/employees";
import { FiEdit2 } from "react-icons/fi";
import ButtonPrimary from "../components/Button/ButtonPrimary";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // setProfile((prev) => ({
    //   ...prev,
    //   [name]: value,
    // }));
  };
  const { data: profile, refetch } = useGetUserProfile();
  const { mutate: updateEmployee, isPending } = useUpdateEmployee();
  const { mutate: updateEmployeeWithPassword, isPending: isLoading } =
    useUpdateEmployeeWithPassword();
  const [isEditPassword, setIsEditPassword] = useState<boolean>(false);
  const form = useForm<EmployeeRequest>({
    resolver: zodResolver(EmployeeRequestSchema),
    defaultValues: {
      name: profile?.name,
      position: profile?.position ?? "",
      phone: profile?.phone ?? "",
      department: profile?.department,
      address: profile?.address,
      avatar:
        "https://cbpdizdmebasivufwuer.supabase.co/storage/v1/object/sign/default/avatar.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZWZhdWx0L2F2YXRhci5wbmciLCJpYXQiOjE3MzU3MzI3MDMsImV4cCI6MjA1MTA5MjcwM30.noj-wPlNid8enMv1c-BzIia8k7XNdCpDOq3JmW-spQk",
      username: profile?.username,
      dob: profile?.dob.toISOString(),
    },
  });
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = form;
  React.useEffect(() => {
    if (profile) {
      reset({
        name: profile?.name,
        position: profile?.position ?? "",
        phone: profile?.phone ?? "",
        department: profile?.department,
        address: profile?.address,
        avatar:
          "https://cbpdizdmebasivufwuer.supabase.co/storage/v1/object/sign/default/avatar.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZWZhdWx0L2F2YXRhci5wbmciLCJpYXQiOjE3MzU3MzI3MDMsImV4cCI6MjA1MTA5MjcwM30.noj-wPlNid8enMv1c-BzIia8k7XNdCpDOq3JmW-spQk",
        username: profile?.username,
        dob: profile?.dob.toISOString(),
      });
      setIsEditPassword(false);
    }
  }, [profile, reset]);

  const onSubmit = (data: EmployeeRequest) => {
    console.log(data);
    if (isEditPassword) {
      updateEmployeeWithPassword(
        { ...data, id: profile?.id },
        {
          onSuccess: () => {
            setIsEditing(false);
            refetch();
          },
          onError: () => console.error("Error creating profile?"),
        }
      );
    } else {
      updateEmployee(
        { ...data, id: profile?.id },
        {
          onSuccess: () => {
            setIsEditing(false);
            refetch();
          },
          onError: () => console.error("Error creating profile?"),
        }
      );
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-3xl">
      {/* Back button */}
      <div className="mb-6">
        <Link
          to="/"
          className="inline-flex items-center text-indigo-600 hover:text-indigo-700"
        >
          <ChevronLeftIcon className="h-5 w-5 mr-1" />
          Trở về
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Thông tin cá nhân
            </h1>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
              >
                Chỉnh sửa
              </button>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Họ và tên
              </label>
              {isEditing ? (
                <input
                  type="text"
                  placeholder="Nhập họ và tên của bạn"
                  {...register("name")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              ) : (
                <p className="text-gray-900">{profile?.name}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ngày sinh
              </label>
              {isEditing ? (
                <input
                  type="text"
                  readOnly
                  disabled
                  value={profile?.dob.toDateString()}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              ) : (
                <p className="text-gray-900">
                  {new Date().toLocaleDateString("vi-VN")}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Số điện thoại
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  placeholder="Nhập số điện thoại"
                  {...register("phone")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              ) : (
                <p className="text-gray-900">{profile?.phone}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Địa chỉ
              </label>
              {isEditing ? (
                <input
                  type="text"
                  placeholder="Nhập địa chỉ"
                  {...register("address")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              ) : (
                <p className="text-gray-900">{profile?.address}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phòng ban
              </label>
              {isEditing ? (
                <input
                  type="text"
                  disabled
                  placeholder="Nhập phòng ban"
                  {...register("department")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              ) : (
                <p className="text-gray-900">{profile?.department}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Vai trò
              </label>
              <p className="text-gray-900">
                {profile?.role === Role.EMPLOYEE_ROLE ? "Nhân viên" : "Quản lý"}
              </p>
            </div>
            {isEditing ? (
              <button
                type="button"
                onClick={() => setIsEditPassword(!isEditPassword)}
                className="text-gray-600 flex items-center gap-2 hover:text-purple-600 transition duration-200"
              >
                Cập nhật mật khẩu
                <FiEdit2 className="w-5 h-5" />
              </button>
            ) : (
              <></>
            )}
            {isEditPassword && (
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
            )}{" "}
            {isEditing && (
              <div className="flex justify-end space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-50"
                >
                  Hủy
                </button>
                <ButtonPrimary
                  type="submit"
                  disabled={isPending || isLoading}
                  loading={isPending || isLoading}
                  className="px-6 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none"
                >
                  Lưu
                </ButtonPrimary>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
