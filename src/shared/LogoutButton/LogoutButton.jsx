import useAuth from "../../hooks/useAuth/useAuth";

const LogoutButton = ({ onClick }) => {
  const { logOut } = useAuth();
  const handleLogOut = () => {
    logOut()
      .then(() => {
        // console.log("Sign-out successful.");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <button
      onClick={handleLogOut}
      className="w-full sm:w-auto px-5 py-2 text-sm sm:text-base font-medium text-white 
                   bg-[#1f2936] hover:bg-[#374151] rounded-lg transition"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
