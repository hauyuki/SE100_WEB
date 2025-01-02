import Images from "../assets/images";
import LoginForm from "../components/LoginForm";

const Login = () => {
  return (
    <div className="h-screen overflow-hidden py-5 w-screen grid grid-cols-3">
      <div className="flex items-start mx-4 mt-20 justify-center">
        <LoginForm />
      </div>
      <div className="p-5 col-span-2">
        <div className=" h-full overflow-hidden">
          <img
            alt="banner"
            src={Images.landingImg}
            className={`object-cover bg-center overflow-hidden`}
          ></img>
        </div>
      </div>
    </div>
  );
};

export default Login;
