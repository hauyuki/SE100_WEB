import React, { useState } from "react";
import Product from "../../employee/products/Product";
import AddProductForm, { ProductFormData } from "./component/AddProductForm";

const AdminProductPage = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    category: "",
    manufacturer: "",
    quantity: "",
    storageArea: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Handle form submission
    console.log("Form submitted:", formData);
    setShowAddForm(false);
    // Reset form
    setFormData({
      name: "",
      category: "",
      manufacturer: "",
      quantity: "",
      storageArea: "",
    });
  };

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <button
          onClick={() => setShowAddForm(true)}
          className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
        >
          Thêm sản phẩm
        </button>
      </div>

      <Product />

      <AddProductForm
        showForm={showAddForm}
        onClose={() => setShowAddForm(false)}
        onSubmit={handleSubmit}
        formData={formData}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default AdminProductPage;
