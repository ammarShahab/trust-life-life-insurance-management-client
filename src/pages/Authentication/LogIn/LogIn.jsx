import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth/useAuth";
import GoogleLoginButton from "../../../shared/GoogleLoginButton/GoogleLoginButton";
import { Helmet } from "react-helmet-async";

const Login = () => {
  const { userLogin, theme } = useAuth();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (!data.email || !data.password) {
      toast.error("All fields are required");
      return;
    }

    userLogin(data.email, data.password)
      .then(async (res) => {
        // console.log(res.user);
        // const user = res.user;

        // const email = user.email;
        // const lastSignInTime = user.metadata.lastSignInTime;

        /*  await axiosSecure.put("/customer/update-last-login", {
          email,
          lastSignInTime,
        }); */
        toast.success("Login successful!");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Invalid email or password");
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 bg-gray-50 dark:bg-gray-900 transition-colors">
      <Helmet>
        <title>Trust Life | Log In</title>
      </Helmet>
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 sm:p-8 mb-10 mt-20">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">
          Log In
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                       dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              placeholder="you@example.com"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <p className="text-red-500 text-xs">Email is required</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                       dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              placeholder="Enter your password"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <p className="text-red-500 text-xs">Password is required</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full text-white bg-[#baa53a] hover:bg-[#fcd547] focus:ring-4 
                     focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 
                     text-center dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-700"
          >
            Login
          </button>

          {/* Google Sign In Button */}

          {/* Redirect to Register */}
          <p className="text-sm text-center text-gray-600 dark:text-gray-400">
            Don’t have an account?{" "}
            <Link
              to="/auth/register"
              className="text-blue-600 hover:underline dark:text-blue-400"
            >
              Register
            </Link>
          </p>
        </form>
        <GoogleLoginButton></GoogleLoginButton>
      </div>
    </div>
  );
};

export default Login;
