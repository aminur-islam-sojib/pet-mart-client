import { useState } from "react";
import useAxios from "../Hooks/useAxios";
import useAuth from "../Hooks/useAuth";
import { Check, Eye, EyeClosed, EyeOff, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";

const RegisterForm = () => {
  const { createUser, googleLogin, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    imageUrl: "",
  });

  const instance = useAxios();
  const from = location?.state?.from.pathname || "/";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [showPassword, setShowPassword] = useState(false);

  // Validation checks
  const hasUppercase = /[A-Z]/.test(formData.password);
  const hasLowercase = /[a-z]/.test(formData.password);
  const hasMinLength = formData.password.length >= 6;

  const isValid = hasUppercase && hasLowercase && hasMinLength;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userInfo = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      imageUrl: formData.imageUrl,
      created_at: new Date(),
    };

    try {
      if (!isValid)
        return toast.error("Please input a valid password!", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      else {
        const res = await createUser(formData.email, formData.password);
        console.log(res);
        instance.post("/users", userInfo);
        toast.success("Registration Successful!", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        navigate(from, { replace: true });
      }
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
      toast.success("Registration Successful!", {
        position: "top-center",
        autoClose: 1000,
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
          Register
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div className="form-control flex flex-col gap-1 ">
            <label className="label">
              <span className="label-text font-semibold text-gray-500">
                Name
              </span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="input input-bordered w-full"
              required
            />
          </div>

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

          {/* Image URL */}
          <div className="form-control flex flex-col gap-1  ">
            <label className="label">
              <span className="label-text font-semibold text-gray-500">
                Profile Image URL
              </span>
            </label>
            <input
              type="url"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className="input input-bordered w-full"
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter Your Password"
                className="input input-bordered w-full"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 z-50"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="mb-6 space-y-2">
            <p className="text-sm font-medium text-gray-700 mb-3">
              Password must contain:
            </p>

            <div className="flex items-center gap-2">
              {hasUppercase ? (
                <Check size={18} className="text-green-500" />
              ) : (
                <X size={18} className="text-gray-400" />
              )}
              <span
                className={hasUppercase ? "text-green-600" : "text-gray-600"}
              >
                At least 1 uppercase letter
              </span>
            </div>

            <div className="flex items-center gap-2">
              {hasLowercase ? (
                <Check size={18} className="text-green-500" />
              ) : (
                <X size={18} className="text-gray-400" />
              )}
              <span
                className={hasLowercase ? "text-green-600" : "text-gray-600"}
              >
                At least 1 lowercase letter
              </span>
            </div>

            <div className="flex items-center gap-2">
              {hasMinLength ? (
                <Check size={18} className="text-green-500" />
              ) : (
                <X size={18} className="text-gray-400" />
              )}
              <span
                className={hasMinLength ? "text-green-600" : "text-gray-600"}
              >
                Minimum 6 characters
              </span>
            </div>
          </div>

          <div className=" text-gray-500 text-sm text-left">
            Already have an account?{" "}
            <Link to={"/login"} className=" text-blue-500">
              Log In{" "}
            </Link>
          </div>
          {/* Submit Button */}
          <button
            disabled={!isValid}
            type="submit"
            className="btn-classic border-none w-full mt-4 bg-rose-500 hover:bg-rose-600 text-white"
          >
            {loading ? "Registering..." : "Register"}
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

export default RegisterForm;
