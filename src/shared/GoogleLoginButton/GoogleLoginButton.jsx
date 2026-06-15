import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth/useAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const GoogleLoginButton = () => {
  const { googleSignIn, setIsLoading, provider } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const handleGoogleLogin = async () => {
    try {
      const result = await googleSignIn(provider);
      const user = result.user;
      setIsLoading(true);

      const creationDate = new Date(user.metadata.creationTime);
      const bdFormattedDate = creationDate.toLocaleString("en-US", {
        timeZone: "Asia/Dhaka",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });

      // Create or upsert customer
      const customerInfo = {
        customerName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        role: "customer",
        lastSignInTime: user.metadata.lastSignInTime,
        registrationDate: bdFormattedDate,
      };

      await axiosSecure.post("/customers", customerInfo);

      // ✅ Update last login time
      /* await axiosSecure.put("/customer/update-last-login", {
        email: user.email,
        lastSignInTime: user.metadata.lastSignInTime,
      }); */

      toast.success("Logged In Successfully");
      navigate("/");
    } catch (error) {
      console.error("Google Login Error:", error);
      toast.error("Login failed. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Divider with "or" */}
      <div className="flex items-center gap-3">
        <hr className="flex-1 border-gray-300 dark:border-gray-600" />
        <span className="text-sm text-gray-500 dark:text-gray-400">or</span>
        <hr className="flex-1 border-gray-300 dark:border-gray-600" />
      </div>

      {/* Google login button */}
      <div className="flex items-center justify-center">
        <button
          onClick={handleGoogleLogin}
          className="flex justify-center items-center gap-2 w-full px-4 py-2 border rounded-lg 
                   hover:bg-gray-100 dark:hover:bg-gray-700 transition text-sm text-gray-700 dark:text-gray-300"
        >
          <FcGoogle size={20} /> Continue with Google
        </button>
      </div>
    </div>
  );
};

export default GoogleLoginButton;
