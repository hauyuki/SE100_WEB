import React, { useEffect } from "react";
import { FiX } from "react-icons/fi";
import { useGetAreas } from "../../../../hooks/areas";
import { useCreateTag } from "../../../../hooks/tags";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateTagRequest } from "../../../../models/Tag";
import { UpsertTagModelSchema } from "../../../../schemas/auth";

interface AddTagFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddTagForm: React.FC<AddTagFormProps> = ({ isOpen, onClose }) => {
  const { data: areas } = useGetAreas();
  const { mutate: addTag, isPending } = useCreateTag();
  const form = useForm<CreateTagRequest>({
    resolver: zodResolver(UpsertTagModelSchema),
    defaultValues: {
      name: "",
      description: "",
      areaId: 0,
    },
  });
  const onSubmit = (data: CreateTagRequest) => {
    addTag(
      { ...data },
      {
        onSuccess: () => {
          console.log("Tag add successfully");
          onClose();
        },
        onError: () => {
          console.log("Error adding tag");
        },
      }
    );
  };

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = form;
  useEffect(() => {
    reset();
  }, [isOpen]);
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Tạo mới tag</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition duration-200"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tên tag
            </label>
            <input
              type="text"
              {...register("name")}
              placeholder="Tên tag"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ý nghĩa
            </label>
            <input
              type="text"
              placeholder="Ý nghĩa"
              {...register("description")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Khu vực
            </label>
            <select
              {...register("areaId")}
              className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            >
              <option value="">Chọn khu vực</option>
              {areas?.map((area) => (
                <option key={area.id} value={area.id}>
                  {area.name}
                </option>
              ))}
            </select>
            {errors.areaId && (
              <p className="text-red-500 text-sm">{errors.areaId.message}</p>
            )}
          </div>
          <div className="flex justify-end gap-3">
            <button
              type="submit"
              disabled={isPending}
              className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              {isPending ? "Thêm mới..." : "Thêm tag"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTagForm;
