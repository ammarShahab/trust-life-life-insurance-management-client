import { FaLock } from "react-icons/fa";
import { Link } from "react-router";

const ForbiddenPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#f4f4f9] to-[#eaecee] text-center px-4">
      <div className="bg-white p-10 rounded-2xl shadow-lg max-w-lg w-full">
        <div className="text-[#baa53a] text-6xl mb-4">
          <FaLock />
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-2">403 Forbidden</h1>
        <p className="text-gray-600 mb-6">
          You don’t have permission to access this page. Please contact support
          if you believe this is a mistake.
        </p>
        <Link to="/">
          <button className="px-6 py-2 bg-[#baa53a] hover:bg-[#fcd547] text-white font-medium rounded-md shadow transition duration-200">
            ⬅ Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ForbiddenPage;
