import { Link } from "react-router-dom";
import SignupForm from "./SignupForm";

function Signup() {
  return (
    <div className="min-h-screen p-12 grid grid-[48rem] justify-center content-center gap-[2.8rem] bg-colorGrey50">
      <Link to="/" className="text-center">
        <img
          className="h-[5rem] w-auto m-auto"
          src="/logo-light.png"
          alt="logo"
        />
      </Link>
      <h1 className="text-2xl text-center font-semibold">
        Create your account
      </h1>
      <SignupForm />
    </div>
  );
}

export default Signup;
