import React, { useContext } from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
// import logo from "../../assets/images/logo.png";

import { Link } from "react-router";
import AuthContext from "../../context/AuthContext/AuthContext";
import TrustLife from "../TrustLife/TrustLife";

const Footer = () => {
  return (
    <>
      <div className=" bg-gradient-to-l from-[#114b5f] via-[#1a936f] to-[#88d498] dark:bg-gray-900 dark:from-transparent dark:via-transparent dark:to-transparent ">
        <div
          className={`max-w-7xl flex flex-col justify-between px-4 py-2 sm:px-6 lg:px-8 mx-auto space-y-8 lg:flex-row lg:space-y-0 text-gray-800  dark:bg-gray-900 `}
        >
          <div className="lg:w-1/3 flex items-center">
            <span
              rel="noopener noreferrer"
              className="flex justify-center space-x-3 lg:justify-start"
            >
              <TrustLife></TrustLife>
            </span>
          </div>
          <div className="grid grid-cols-2 text-sm gap-x-3 gap-y-8 lg:w-2/3 sm:grid-cols-3">
            <div className="space-y-3">
              <h3 className="tracking-wide uppercase text-white dark:text-white">
                Contact
              </h3>
              <ul className="space-y-1">
                <li>
                  <a
                    href="mailto:info@mywebsite.com"
                    className="text-white hover:underline  dark:text-white"
                  >
                    info@mywebsite.com
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+1234567890"
                    className="text-white hover:underline dark:text-white"
                  >
                    +1 (234) 567-890
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="uppercase text-white dark:text-white">Address</h3>
              <ul className="space-y-1">
                <li>
                  <a
                    className=" text-white dark:text-white"
                    rel="noopener noreferrer "
                  >
                    20/5, West Panthapath (3rd Floor), Dhaka 1205
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <div className="uppercase text-white dark:text-white sm:text-right">
                Social media
              </div>
              <div className="flex sm:justify-end space-x-3">
                <div className="flex justify-center gap-5">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    aria-label="Facebook"
                    className="text-white text-xl hover:text-[#fe8d02] transition-colors dark:text-white"
                  >
                    <FaFacebookF></FaFacebookF>
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    aria-label="Twitter"
                    className="text-white text-xl hover:text-[#fe8d02] transition-colors dark:text-white"
                  >
                    <FaXTwitter></FaXTwitter>
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    aria-label="Instagram"
                    className="text-white text-xl hover:text-[#fe8d02] transition-colors dark:text-white"
                  >
                    <FaInstagram></FaInstagram>
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    aria-label="LinkedIn"
                    className="text-white text-xl hover:text-[#fe8d02] transition-colors dark:text-white"
                  >
                    <FaLinkedinIn></FaLinkedinIn>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="text-sm text-white mt-4 text-center">
          © {new Date().getFullYear()} Trust Life. All rights reserved.
        </p>
      </div>
    </>
  );
};

export default Footer;
