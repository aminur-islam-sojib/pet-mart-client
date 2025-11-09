import { useState } from "react";
import useAxios from "../Hooks/useAxios";
import useAuth from "../Hooks/useAuth";
import { Eye, EyeClosed } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router";
import { Bounce, toast } from "react-toastify";

const LoginForm = () => {
  const { login, loading } = useAuth();
  const [showPass, setShowPass] = useState(false);
  const { googleLogin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const from = location?.state?.from.pathname || "/";
  const instance = useAxios();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // TODO: send to backend API
    try {
      await login(formData.email, formData.password);
      toast.success("Log In Successful!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      navigate(from, { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const res = await googleLogin();
      const user = res.user;
      const userInfo = {
        name: user?.displayName,
        email: user?.email,
        password: "",
        created_at: new Date(),
        role: "student",
      };
      instance.post("/users", userInfo);
      toast.success("Log In Successful!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      navigate(from, { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden md:py-10">
      {/* 🧾 Registration Card */}
      <div className="relative z-10 w-full max-w-md mx-4 sm:mx-auto bg-rose-50  rounded-2xl shadow-xl p-6 sm:p-8">
        <h2 className="text-3xl font-bold text-center text-rose-600 mb-6">
          Log In
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div className="form-control flex flex-col gap-1 ">
            <label className="label">
              <span className="label-text font-semibold text-gray-500">
                Email
              </span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Password */}
          <div className="form-control relative flex flex-col gap-1 ">
            <label className="label">
              <span className="label-text font-semibold text-gray-500">
                Password
              </span>
            </label>
            <input
              type={showPass ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="input input-bordered w-full"
              required
            />
            <div
              onClick={() => setShowPass(!showPass)}
              className="absolute top-9 right-3 text-gray-500 z-50"
            >
              {showPass ? <Eye /> : <EyeClosed />}
            </div>
            <div className=" text-gray-500 text-sm text-right">
              Don't have an account?{" "}
              <Link to={"/register"} className=" text-blue-500">
                Register{" "}
              </Link>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn-classic border-none w-full mt-4 bg-rose-500 hover:bg-rose-600 text-white"
          >
            {loading ? "Login..." : "Log In"}
          </button>
        </form>

        {/* Divider */}
        <div className="divider">OR</div>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          className="btn btn-classic-outline bg-white text-black border border-gray-300 w-full hover:bg-gray-100"
        >
          <svg
            aria-label="Google logo"
            width="18"
            height="18"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <g>
              <path d="m0 0H512V512H0" fill="#fff"></path>
              <path
                fill="#34a853"
                d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
              ></path>
              <path
                fill="#4285f4"
                d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
              ></path>
              <path
                fill="#fbbc02"
                d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
              ></path>
              <path
                fill="#ea4335"
                d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
              ></path>
            </g>
          </svg>
          <span className="ml-2">Continue with Google</span>
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
