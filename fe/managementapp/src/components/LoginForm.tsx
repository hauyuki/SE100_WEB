import Input from "./Input";
import ButtonPrimary from "./Button/ButtonPrimary";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/auth";
import { AuthRequest, AuthResponse, Role } from "../models/Auth";
import { AuthSchema } from "../schemas/auth";
import { USER_PROFILE } from "../utils/query-key";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
import { useQueryClient } from "@tanstack/react-query";
import { useAuthContext } from "../contexts/AuthContext";

const LoginForm = () => {
  const navigate = useNavigate();
  const { mutate: login, isPending } = useLogin();
  const form = useForm<AuthRequest>({
    resolver: zodResolver(AuthSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;
  const queryClient = useQueryClient();
  const { setUserId } = useAuthContext();
  const onLoginSuccess = (res: AuthResponse) => {
    Cookies.set("token", res.accessToken, { expires: 7 });
    setUserId(res.id);
    queryClient.invalidateQueries({
      queryKey: [USER_PROFILE],
    });
    if (res.role === Role.ADMIN_ROLE) {
      navigate("/admin/dashboard", { replace: true }); // Change from "/home" to "/dashboard"
    } else {
      navigate("/dashboard", { replace: true }); // Change from "/home" to "/dashboard"
    }
  };
  const onSubmit = (data: AuthRequest) => {
    login(
      { ...data },
      {
        onSuccess: onLoginSuccess,
        onError: () => {
          console.log("err");
        },
      }
    );
  };
  return (
    <form
      className="grid grid-cols-1 gap-6 max-w-80 w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="font-bold text-2xl mx-auto">Storix</h2>

      <label className="block">
        <span className="text-neutral-800 dark:text-neutral-200">Email</span>
        <Input
          type="email"
          placeholder="Example@example.com"
          className="mt-1"
          {...register("username")}
        />
        {errors.username?.message && (
          <div className="text-red-500 pt-1 text-xs">
            {errors.username.message.toString()}
          </div>
        )}
      </label>
      <label className="block">
        <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
          Password
        </span>
        <Input
          type="password"
          placeholder="Tối thiểu 8 ký tự"
          className="mt-1"
          {...register("password")}
        />
        {errors.password?.message && (
          <div className="text-red-500 pt-1 text-xs ">
            {errors.password.message.toString()}
          </div>
        )}
      </label>
      <ButtonPrimary loading={isPending} disabled={isPending} type="submit">
        Đăng nhập
      </ButtonPrimary>
    </form>
  );
};

export default LoginForm;
