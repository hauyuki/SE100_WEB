import Images from "../assets/images";
import LoginForm from "../components/LoginForm";

const Login = () => {
  return (
    <div className="h-screen w-screen overflow-hidden grid grid-cols-3">
      <div className="flex items-center mx-4  justify-center">
        <LoginForm />
      </div>
      <div className="py-10 px-5 col-span-2 rounded-2xl  w-full h-screen overflow-hidden">
        {/* <div className=" h-full overflow-hidden"> */}
        <img
          alt="banner"
          src={Images.landingImg}
          className={`object-cover bg-center rounded-2xl overflow-hidden w-full h-full`}
        ></img>
        {/* </div> */}
      </div>
    </div>
  );
};

export default Login;
