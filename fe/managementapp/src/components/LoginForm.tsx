import { Description, Field, Label } from "@headlessui/react";
import Input from "./Input";
import ButtonPrimary from "./Button/ButtonPrimary";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();

  const handleSubmit = (event: any) => {
    event.preventDefault();
    navigate("/dashboard"); // Change from "/home" to "/dashboard"
  };

  return (
    <form
      className="grid grid-cols-1 gap-6 max-w-80 w-full"
      onSubmit={handleSubmit} // Use onSubmit handler
    >
      <label className="block">
        <span className="text-neutral-800 dark:text-neutral-200">Email</span>
        <Input
          type="email"
          placeholder="Example@example.com"
          className="mt-1"
        />
      </label>
      <label className="block">
        <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
          Password
        </span>
        <Input
          type="password"
          placeholder="Tối thiểu 8 ký tự"
          className="mt-1"
        />
      </label>
      <ButtonPrimary type="submit">Đăng nhập</ButtonPrimary>
    </form>
  );
};

export default LoginForm;
