import React, { useState } from "react";
import { FiEdit2, FiPlus } from "react-icons/fi";
import AddAccountForm from "./components/AddAccountForm";
import EditAccountForm from "./components/EditAccountForm";
import { useGetEmployees } from "../../../hooks/employees";
import { Employee } from "../../../models/Employee";

interface Account {
  id: number;
  fullName: string;
  position: string;
  department: string;
  email: string;
  phone: string;
  createdDate: string;
}

const AccountManagementPage = () => {
  const dummyData = Array.from({ length: 10 }, (_, index) => ({
    id: index + 1,
    fullName: "Nguyễn Văn A",
    position: "Nhân viên kho",
    department: "Phòng kho vận",
    email: "nhanvien@example.com",
    phone: "0123456789",
    createdDate: "05/12/2024",
  }));

  const [accounts, setAccounts] = useState<Account[]>(dummyData);
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [newAccount, setNewAccount] = useState({
    fullName: "",
    position: "",
    department: "",
    email: "",
    phone: "",
    password: "",
  });
  const [editingAccount, setEditingAccount] = useState<Employee | null>(null);

  const handleCreateAccount = () => {
    setIsAddPopupOpen(true);
  };

  const handleEditAccount = (account: Employee) => {
    setEditingAccount(account);
    setIsEditPopupOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const accountToAdd = {
      id: accounts.length + 1,
      fullName: newAccount.fullName,
      position: newAccount.position,
      department: newAccount.department,
      email: newAccount.email,
      phone: newAccount.phone,
      createdDate: new Date().toLocaleDateString(),
    };
    setAccounts([...accounts, accountToAdd]);
    setNewAccount({
      fullName: "",
      position: "",
      department: "",
      email: "",
      phone: "",
      password: "",
    });
    setIsAddPopupOpen(false);
  };
  const { data: employees } = useGetEmployees();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Account Management</h1>
        <button
          onClick={handleCreateAccount}
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 flex items-center gap-2"
        >
          <FiPlus className="w-5 h-5" />
          <span>Tạo mới tài khoản</span>
        </button>
      </div>

      <AddAccountForm
        isOpen={isAddPopupOpen}
        onClose={() => setIsAddPopupOpen(false)}
      />
      {editingAccount && (
        <EditAccountForm
          isOpen={isEditPopupOpen}
          onClose={() => setIsEditPopupOpen(false)}
          employee={editingAccount}
        />
      )}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  STT
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Email
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Họ tên
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Chức vụ
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Phòng ban
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Địa chỉ
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Số điện thoại
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Edit
                </th>
              </tr>
            </thead>
            <tbody>
              {employees?.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-gray-200 hover:bg-gray-50 transition duration-200"
                >
                  <td className="px-6 py-4 text-sm text-gray-600">{item.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {item.username}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {item.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {item.position}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {item.department}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {item.address}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {item.phone}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <button
                      onClick={() => handleEditAccount(item)}
                      className="text-gray-600 hover:text-purple-600 transition duration-200"
                    >
                      <FiEdit2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AccountManagementPage;
