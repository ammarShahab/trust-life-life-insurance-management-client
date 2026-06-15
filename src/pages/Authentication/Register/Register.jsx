import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth/useAuth";
import GoogleLoginButton from "../../../shared/GoogleLoginButton/GoogleLoginButton";
import { useState } from "react";
import axios from "axios";
import useAxios from "../../../hooks/useAxios";
import { Helmet } from "react-helmet-async";

const Register = () => {
  const { createUser, updateUser } = useAuth();
  const navigate = useNavigate();
  const [profilePic, setProfilePic] = useState("");
  const axiosInstance = useAxios();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleImageUpload = async (e) => {
    e.preventDefault();
    const image = e.target.files[0];
    // console.log(image);
    const formData = new FormData();
    formData.append("image", image);

    const imageUploadURL = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_IMAGE_UPLOAD_KEY
    }`;
    const res = await axios.post(imageUploadURL, formData);
    // console.log("Uploaded image url", res.data.data.url);
    setProfilePic(res.data.data.url);
  };

  const onSubmit = async (data) => {
    const hasUpperCase = /[A-Z]/.test(data.password);
    const hasLowerCase = /[a-z]/.test(data.password);
    const isLongEnough = data.password.length >= 6;

    if (!isLongEnough) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    if (!hasUpperCase) {
      toast.error("Password must include at least one uppercase letter");
      return;
    }

    if (!hasLowerCase) {
      toast.error("Password must include at least one lowercase letter");
      return;
    }

    createUser(data.email, data.password)
      .then(async (userCredential) => {
        const currentUser = userCredential.user;
        // console.log(currentUser);
        // console.log(currentUser.metadata.lastSignInTime);

        const profileInfo = {
          displayName: data.name,
          photoURL: profilePic,
        };
        // console.log(profileInfo);

        updateUser(profileInfo)
          .then(() => {
            // console.log("name and pic updated successfully");
          })
          .catch((err) => {
            console.log(err);
          });

        const gmtDate = new Date(currentUser.metadata.creationTime);

        const options = {
          timeZone: "Asia/Dhaka", // Bangladesh Timezone
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false, // 24-hour format
        };

        const bdTime = gmtDate.toLocaleString("en-US", options);

        const customerInfo = {
          customerName: data.name,
          email: data.email,
          photoURL: profilePic,
          role: "customer",
          // last_log_in: new Date().toISOString(),
          lastSignInTime: currentUser.metadata.lastSignInTime,
          registrationDate: bdTime,
        };
        // console.log("customer Info from Registration", customerInfo);

        const customerRes = await axiosInstance.post(
          "/customers",
          customerInfo
        );
        // console.log(customerRes.data);
      })
      .catch((err) => {
        const errorCode = err.code;
        const errorMessage = err.message;
        console.log(errorCode, errorMessage);
      });

    // console.log("Form data:", data);
    toast.success("Registration successful!");
    navigate("/");
    reset();
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 bg-gray-50 dark:bg-gray-900 transition-colors ">
      <Helmet>
        <title>Trust Life | Register</title>
      </Helmet>
      {/* <Toaster position="top-center" /> */}

      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 sm:p-8 mb-10 mt-20">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 dark:text-white ">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                         focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                         dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              placeholder="Your full name"
              {...register("name", { required: true })}
            />

            {errors.name?.type === "required" && (
              <p className="text-red-500 text-xs">Name is required</p>
            )}
          </div>

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
              placeholder="example@email.com"
              {...register("email", { required: true })}
            />
            {errors.email?.type === "required" && (
              <p className="text-red-500 text-xs">Email is required</p>
            )}
          </div>

          {/* Photo Upload */}
          <div>
            <label
              htmlFor="photo"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Upload Photo
            </label>
            <input
              onChange={handleImageUpload}
              type="file"
              id="photo"
              accept="image/*"
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg 
                         cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none 
                         dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              // {...register("photo", { required: true })}
            />
            {/* {errors.photo?.type === "required" && (
              <p className="text-red-500 text-xs">Upload your photo</p>
            )} */}
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
              placeholder="Enter password"
              {...register("password", { required: true })}
            />

            {errors.password?.type === "required" && (
              <p className="text-red-500 text-xs">Password is required</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full text-white bg-[#693d3d] hover:bg-[#774545]  focus:ring-4 
                       focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 
                       text-center dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-700"
          >
            Register
          </button>

          {/* Redirect to login */}
          <p className="text-sm text-center text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link
              to="/auth/login"
              className="text-blue-600 hover:underline dark:text-blue-400"
            >
              Login
            </Link>
          </p>
        </form>
        <GoogleLoginButton></GoogleLoginButton>
      </div>
    </div>
  );
};

export default Register;
