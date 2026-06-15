import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { LuMoon, LuSun } from "react-icons/lu";
import TrustLife from "../TrustLife/TrustLife";
import useAuth from "../../hooks/useAuth/useAuth";
import LogoutButton from "../LogoutButton/LogoutButton";
import { DarkThemeToggle } from "flowbite-react";

const NavBar = () => {
  const { user, logOut, setUser } = useAuth();
  const navigate = useNavigate();
  // const { theme, toggleTheme } = useContext(ThemeContext);
  // console.log(theme);

  // console.log(user);

  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogOut = () => {
    logOut()
      .then(() => {
        setUser(null);
        toast.success("Successfully Logged Out");
        navigate("/");
      })
      .catch((error) => console.error(error));
  };

  const publicLinks = [
    { name: "Home", path: "/" },
    { name: "All Policies", path: "/all-policies" },
    { name: "Blogs", path: "/blogs" },
  ];

  const privateLinks = [{ name: "Dashboard", path: "/dashboard" }];

  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <nav className="bg-gradient-to-l from-[#114b5f] via-[#1a936f] to-[#88d498]  dark:bg-gray-900 dark:from-transparent dark:via-transparent dark:to-transparent shadow z-50 fixed top-0 w-full">
      <div className="max-w-7xl mx-auto px-2 dark:bg-gray-900">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          {/* <NavLink to="/" className="flex items-center gap-2"> */}
          <TrustLife />
          {/* </NavLink> */}

          {/* Desktop nav links */}
          <ul className="hidden md:flex items-center gap-6">
            {publicLinks.map((link) => (
              <li key={link.name}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `text-sm font-medium ${
                      isActive
                        ? "text-[#fcd547] "
                        : "text-gray-100 dark:text-gray-200"
                    } hover:text-[#fcd547]  transition`
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}

            {user &&
              privateLinks.map((link) => (
                <li key={link.name}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `text-sm font-medium ${
                        isActive
                          ? "text-[#fcd547] "
                          : "text-gray-100 dark:text-gray-200"
                      } hover:text-[#fcd547]  transition`
                    }
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
          </ul>

          <div className="flex justify-center items-center gap-2">
            {/* toggle dark/light */}
            {/*  <button
              onClick={toggleTheme}
              className="p-2 rounded bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
            >
              {theme === "light" ? "🌙 Dark" : "☀ Light"}
            </button> */}

            <DarkThemeToggle></DarkThemeToggle>
            {/* Auth Buttons / Profile */}
            <div className="md:flex items-center gap-4">
              {!user ? (
                <>
                  <NavLink
                    to="/auth/login"
                    className="text-white hidden md:block bg-[#baa53a] hover:bg-[#fcd547]  dark:bg-blue-500 dark:hover:bg-blue-600 font-medium rounded-lg 
                    text-sm px-5 py-2.5 transition"
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/auth/register"
                    className="text-white hidden md:block bg-[#693d3d] hover:bg-[#774545] font-medium rounded-lg 
                    text-sm px-5 py-2.5 transition"
                  >
                    Register
                  </NavLink>
                </>
              ) : (
                <div className="relative">
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="flex items-center gap-2 focus:outline-none"
                  >
                    <img
                      src={
                        user.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"
                      }
                      alt="User"
                      className="h-9 w-9 rounded-full object-cover border-2 border-gray-300 dark:border-gray-600"
                    />
                  </button>

                  {showDropdown && (
                    <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-gray-800 rounded-md shadow-lg z-50 transition">
                      <div className="px-4 py-3 text-sm text-gray-900 dark:text-white border-b dark:border-gray-700">
                        <div className="font-medium truncate">
                          {user.displayName || "Unnamed User"}
                        </div>
                        <div className="text-xs text-gray-500 truncate">
                          {user.email}
                        </div>
                      </div>
                      <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
                        <li>
                          <NavLink
                            to="/dashboard"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            Profile
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/dashboard"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            Dashboard
                          </NavLink>
                        </li>
                      </ul>
                      <div className="py-1 border-t dark:border-gray-700">
                        <button
                          onClick={() => {
                            handleLogOut();
                            setShowDropdown(false);
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile menu toggle */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="text-gray-700 dark:text-white focus:outline-none"
              >
                {isOpen ? (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden mt-3 space-y-2">
            {[...publicLinks, ...(user ? privateLinks : [])].map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `block py-2 px-4 rounded-md text-sm font-medium ${
                    isActive
                      ? "text-[#fcd547] dark:text-blue-400"
                      : "text-gray-100 dark:text-gray-200"
                  } hover:text-[#fcd547] dark:hover:text-blue-400 transition`
                }
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </NavLink>
            ))}

            {!user ? (
              <>
                <NavLink
                  to="/auth/login"
                  className="block w-full text-center py-2 px-4 text-white bg-[#baa53a] hover:bg-[#fcd547] 
                    rounded-lg transition"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </NavLink>
                <NavLink
                  to="/auth/register"
                  className="block w-full text-center py-2 px-4 text-white bg-[#1f2936] hover:bg-[#374151] 
                    rounded-lg transition"
                  onClick={() => setIsOpen(false)}
                >
                  Register
                </NavLink>
              </>
            ) : (
              <button
                onClick={() => {
                  handleLogOut();
                  setIsOpen(false);
                }}
                className="block w-full text-center py-2 px-4 text-white bg-[#1f2936] hover:bg-[#374151] 
                  rounded-lg transition"
              >
                Logout
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
