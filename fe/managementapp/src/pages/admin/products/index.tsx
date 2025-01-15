import React, { useState } from "react";
import Product from "../../employee/products/Product";
import AddProductForm from "./component/AddProductForm";

const AdminProductPage = () => {
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <div>
      <Product />
      <AddProductForm
        showForm={showAddForm}
        onClose={() => setShowAddForm(false)}
        SttProduct={0}
      />
    </div>
  );
};

export default AdminProductPage;
