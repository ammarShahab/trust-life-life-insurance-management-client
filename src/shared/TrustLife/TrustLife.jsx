import React from "react";
import logo from "../../assets/images/TrustLife_logo.png";
import { Link } from "react-router";

const TrustLife = () => {
  return (
    <Link to="/" className="flex items-center space-x-2">
      {/* Image Logo */}
      <img
        src={logo}
        alt="TrustLife Logo"
        className="h-8 w-8 sm:h-10 sm:w-10 object-contain"
      />

      {/* Website Name */}
      <span className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-white">
        Trust<span className="text-[#baa53a] ">Life</span>
      </span>
    </Link>
  );
};

export default TrustLife;
