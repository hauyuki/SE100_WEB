import Images from "../assets/images";
import LoginForm from "../components/LoginForm";

const Login = () => {
  return (
    <div className="h-full w-full grid grid-cols-2">
      <div className="flex items-center justify-center">
        <LoginForm />
      </div>
      <div className="p-5">
        <div className="rounded-2xl bg-blue-400 h-[540px] overflow-hidden">
          <img
            alt="banner"
            src={Images.landingImg}
            className={`object-cover bg-center`}
          ></img>
        </div>
      </div>
    </div>
  );
};

export default Login;
