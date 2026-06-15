import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth/useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useCustomerRole = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    data: role = null,
    isLoading,
    isError,
  } = useQuery({
    enabled: !!user?.email,
    queryKey: ["customerRole", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/customers/role/${user?.email}`);
      // console.log(res.data.role);
      return res.data.role;
    },
  });
  // console.log(role);

  return {
    role,
    isLoading,
    isError,
  };
};

export default useCustomerRole;
