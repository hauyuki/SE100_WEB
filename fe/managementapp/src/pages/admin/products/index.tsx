import React, { useState } from "react";
import Product from "../../employee/products/Product";
import AddProductForm from "./component/AddProductForm";

const AdminProductPage = () => {
  const [showAddForm, setShowAddForm] = useState(false);

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
      />
    </div>
  );
};

export default AdminProductPage;
