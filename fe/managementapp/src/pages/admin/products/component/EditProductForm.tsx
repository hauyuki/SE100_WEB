import { useEffect, useState } from "react";
import { FaPlus, FaTimes } from "react-icons/fa"; // Icons for plus and remove
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductDetail, UpsertProductModel } from "../../../../models/Product";
import { UpsertProductModelSchema } from "../../../../schemas/auth";
import { usePostProducts, useUpdateProduct } from "../../../../hooks/products";
import { useGetCategories } from "../../../../hooks/categories";
import { useGetCompanies } from "../../../../hooks/companies";
import { useGetTags } from "../../../../hooks/tags";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { apiUploadImage } from "../../../../utils";
import React from "react";

const EditProductForm = ({
  showForm,
  onClose,
  product,
  onSuccess,
  onError,
}: {
  showForm: boolean;
  onClose: () => void;
  product: ProductDetail;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}) => {
  const form = useForm<UpsertProductModel>({
    resolver: zodResolver(UpsertProductModelSchema),
    defaultValues: {
      id: product.id,
      name: product.name,
      description: product.description ?? "",
      sku: product.sku,
      categoryId: Number(product.category.id),
      companyId: Number(product.company.id),
      marketPrice: Number(product.marketPrice),
      productionCost: Number(product.productionCost),
      capacity: product.capacity ?? "",
      type: product.type,
      weight: product.weight ?? "",
      image: product.image ?? "",
      minQuantity: product.minQuantity,
      maxQuantity: product.maxQuantity,
      tagIds: product.tags?.map((tag) => Number(tag.id)) ?? [],
    },
  });

  const [image, setImage] = useState<any>(product.image ?? "");

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = form;
  React.useEffect(() => {
    if (product) {
      reset({
        name: product.name,
        description: product.description,
        sku: product.sku,
        marketPrice: Number(product.marketPrice),
        productionCost: Number(product.productionCost),
        capacity: product.capacity,
        type: product.type,
        weight: product.weight,
        image: product.image,
        minQuantity: product.minQuantity,
        maxQuantity: product.maxQuantity,
        categoryId: Number(product.category.id),
        companyId: Number(product.company.id),
        tagIds: product.tags?.map((tag) => Number(tag.id)) || [],
      });
      setSelectedTags(product.tags?.map((tag) => Number(tag.id)) ?? []);
      setImage(product.image ?? "");
    }
  }, [product, reset]);

  const { mutate: addProduct, isPending } = useUpdateProduct();
  const { data: categories } = useGetCategories();
  const { data: companies } = useGetCompanies();
  const { data: tags } = useGetTags();

  const [selectedTags, setSelectedTags] = useState<number[]>(
    product.tags?.map((item) => item.id) ?? []
  ); // state to track selected tags
  const [availableTags, setAvailableTags] = useState<boolean>(false); // state for options dropdown
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploadImage, setUploadImage] = useState(false);

  const handleTagSelect = (tagId: number) => {
    if (!selectedTags.includes(tagId)) {
      setSelectedTags([...selectedTags, tagId]);
    }
  };
  console.log(form.formState.errors);
  const handleTagRemove = (tagId: number) => {
    setSelectedTags(selectedTags.filter((id) => id !== tagId));
  };
  useEffect(() => {
    setValue("tagIds", selectedTags);
  }, [selectedTags]);
  const onSubmit = (data: UpsertProductModel) => {
    addProduct(
      { id: product.id, ...data, tagIds: selectedTags },
      {
        onSuccess: () => {
          console.log("Product updated successfully");
          onClose();
          onSuccess?.();
        },
        onError: (error) => {
          console.log("Error updating product", error);
          onError?.(error.message || "Error updating product");
        },
      }
    );
  };

  if (!showForm) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">Edit Product</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes />
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            {/* SKU Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                SKU
              </label>
              <input
                type="text"
                readOnly
                disabled
                {...register("sku")}
                className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
              {errors.sku && (
                <p className="text-red-500 text-sm">{errors.sku.message}</p>
              )}
            </div>

            {/* Product Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Name
              </label>
              <input
                type="text"
                {...register("name")}
                className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            {/* Category Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                {...register("categoryId")}
                className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              >
                <option value="">Select Category</option>
                {categories?.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.categoryId && (
                <p className="text-red-500 text-sm">{errors.categoryId.message}</p>
              )}
            </div>

            {/* Company Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company
              </label>
              <select
                {...register("companyId")}
                className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              >
                <option value="">Select Company</option>
                {companies?.map((company) => (
                  <option key={company.id} value={company.id}>
                    {company.name}
                  </option>
                ))}
              </select>
              {errors.companyId && (
                <p className="text-red-500 text-sm">{errors.companyId.message}</p>
              )}
            </div>

            {/* Product Type Field - Đặt ở đây */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Loại sản phẩm
              </label>
              <select
                {...register("type")}
                className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Chọn loại sản phẩm</option>
                <option value="CREAM">Dạng kem</option>
                <option value="SPRAY">Dạng xịt</option>
                <option value="LOTION">Dạng lotion</option>
                <option value="POWDER">Dạng bột</option>
                <option value="OTHER">Dạng khác</option>
              </select>
              {errors.type && (
                <p className="text-red-500 text-sm">{errors.type.message}</p>
              )}
            </div>

            {/* Capacity/Weight Field - Đặt cạnh Product Type */}
            {watch("type") === "" || watch("type") === "OTHER" ? (
              <div></div>
            ) : (
              <>
                {watch("type") === "CREAM" ||
                watch("type") === "LOTION" ||
                watch("type") === "SPRAY" ? (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Capacity
                    </label>
                    <input
                      type="text"
                      {...register("capacity")}
                      placeholder="Nhập dung tích"
                      className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    {errors.capacity && (
                      <p className="text-red-500 text-sm">{errors.capacity.message}</p>
                    )}
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Weight
                    </label>
                    <input
                      type="text"
                      {...register("weight")}
                      placeholder="Nhập khối lượng"
                      className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    {errors.weight && (
                      <p className="text-red-500 text-sm">{errors.weight.message}</p>
                    )}
                  </div>
                )}
              </>
            )}

            {/* Production Cost Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Prouduction cost
              </label>
              <input
                type="number"
                {...register("productionCost", { valueAsNumber: true })}
                className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
                min="0"
              />
              {errors.productionCost && (
                <p className="text-red-500 text-sm">
                  {errors.productionCost.message}
                </p>
              )}
            </div>

            {/* Market Price Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Market Price
              </label>
              <input
                type="number"
                {...register("marketPrice", { valueAsNumber: true })}
                className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
                min="0"
              />
              {errors.marketPrice && (
                <p className="text-red-500 text-sm">
                  {errors.marketPrice.message}
                </p>
              )}
            </div>

            {/* Image URL Field */}

            {/* Min and Max Quantity Fields */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Min Quantity
              </label>
              <input
                type="number"
                {...register("minQuantity", { valueAsNumber: true })}
                className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
                min="0"
              />
              {errors.minQuantity && (
                <p className="text-red-500 text-sm">
                  {errors.minQuantity.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Max Quantity
              </label>
              <input
                type="number"
                {...register("maxQuantity", { valueAsNumber: true })}
                className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
                min="0"
              />
              {errors.maxQuantity && (
                <p className="text-red-500 text-sm">
                  {errors.maxQuantity.message}
                </p>
              )}
            </div>

            {/* Tags Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tags
              </label>
              <div className="flex flex-wrap gap-2 mb-4">
                {/* Display Selected Tags as Chips */}
                {selectedTags?.length > 0 ? (
                  selectedTags.map((tagId) => {
                    const tag = tags?.find((t) => t.id === tagId);
                    return (
                      tag && (
                        <div
                          key={tag.id}
                          className="flex items-center bg-indigo-100 text-indigo-600 rounded-full px-3 py-1 text-sm"
                        >
                          {tag.name}
                          <button
                            type="button"
                            onClick={() => handleTagRemove(tag.id)}
                            className="ml-2 text-xs text-indigo-600 hover:text-indigo-800"
                          >
                            <FaTimes />
                          </button>
                        </div>
                      )
                    );
                  })
                ) : (
                  <span className="text-gray-500 text-sm">
                    No tags selected
                  </span>
                )}
              </div>

              {/* Dropdown or Multi-Select */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setAvailableTags(!availableTags)}
                  className="flex items-center bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full justify-between"
                >
                  <span className="text-sm">Select Tags</span>
                  <FaPlus className="ml-2 text-sm" />
                </button>

                {/* Display the available tags as a dropdown */}
                {availableTags && (
                  <div className="absolute bg-white border border-gray-300 rounded-lg mt-2 w-full shadow-lg z-10">
                    {tags?.map((tag) => (
                      <div
                        key={tag.id}
                        className="cursor-pointer px-4 py-2 text-sm hover:bg-indigo-100"
                        onClick={() => handleTagSelect(tag.id)}
                      >
                        {tag.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="col-span-2">
            <label>Product image</label>
            <div className="mt-1 relative flex justify-center px-6 pt-5 pb-6 border-2 border-neutral-300 dark:border-neutral-700 border-dashed rounded-md">
              {image && (
                <>
                  <img
                    alt="featured"
                    className="object-cover relative"
                    src={image}
                    sizes="(max-width: 600px) 200px, 200px"
                    width={200}
                    height={200}
                  />
                  <XCircleIcon
                    onClick={() => setImage(null)}
                    className="absolute right-0 cursor-pointer top-0 w-5 bg-white"
                  />
                </>
              )}
              {!image && (
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-neutral-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex flex-col sm:flex-row text-sm text-neutral-6000">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md font-medium text-primary-6000 hover:text-primary-800 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                    >
                      <span>Upload a file</span>
                      <input
                        disabled={isUploadImage}
                        id="file-upload"
                        type="file"
                        className="sr-only"
                        onChange={(e) => {
                          setUploadImage(true);
                          const file = e.target.files?.[0];
                          if (file) {
                            apiUploadImage(file, "dish")
                              .then((url) => {
                                const imageUrl =
                                  "https://cbpdizdmebasivufwuer.supabase.co/storage/v1/object/public" +
                                  "/" +
                                  url;
                                setImage(imageUrl);
                                setValue("image", imageUrl);
                              })
                              .catch((err) => console.log(err))
                              .finally(() => {
                                setUploadImage(false);
                              });
                          }
                        }}
                      />
                    </label>
                    <p className="ps-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-neutral-500">
                    PNG, JPG, GIF up to 2MB
                  </p>
                </div>
              )}
            </div>
            {errors.image && (
              <p className="text-red-500 text-sm mt-2">
                {errors.image.message}
              </p>
            )}
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              {...register("description")}
              className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              rows={4}
              required
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
            >
              {isPending ? "Đang đợi..." : "Chỉnh sửa"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductForm;
