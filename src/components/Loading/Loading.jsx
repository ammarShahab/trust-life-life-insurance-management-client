import React from "react";
import { FaSpinner } from "react-icons/fa";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-base-200">
      <div className="text-center">
        <FaSpinner className="animate-spin text-primary text-5xl mx-auto mb-4 dark:text-gray-300" />
        <p className="text-lg text-gray-600 dark:text-gray-300 font-semibold">
          Loading, please wait...
        </p>
      </div>
    </div>
  );
};

export default Loading;
