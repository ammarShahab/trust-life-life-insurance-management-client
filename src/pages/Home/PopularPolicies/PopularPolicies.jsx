import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";

import useAxios from "../../../hooks/useAxios";
import Loading from "../../../components/Loading/Loading";

const PopularPolicies = () => {
  const axiosInstance = useAxios();
  const { data: policies = [], isLoading } = useQuery({
    queryKey: ["popular-policies"],
    queryFn: async () => {
      const res = await axiosInstance.get("/popular-policies");
      return res.data;
    },
  });
  console.log(policies);

  if (isLoading) return <Loading></Loading>;

  return (
    <section className=" bg-gradient-to-bl from-[#ffe4e6]  to-[#ccfbf1] dark:bg-gray-900 dark:from-transparent dark:via-transparent dark:to-transparent">
      <div className="px-4 py-10 max-w-7xl mx-auto">
        <h2
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(45, 140, 85, 1) 0%, rgba(82, 122, 66, 1) 60%, rgba(140, 150, 130, 1) 100%)",
          }}
          className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-center mt-10 bg-clip-text text-transparent py-2 dark:text-gray-300"
        >
          🌟 Most Popular Policies
        </h2>
        <p className="text-center text-slate-500 mb-12 mt-3 dark:text-gray-300">
          Discover our most chosen insurance policies, selected by thousands of
          satisfied customers. These plans reflect a strong track record of
          trust, reliability, and value. With high purchase volumes and proven
          customer satisfaction
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mb-12">
          {policies.map((policy) => (
            <div
              key={policy._id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all  flex flex-col  hover:scale-[1.02] duration-300 dark:bg-gradient-to-br dark:from-gray-700 dark:via-gray-600 dark:to-gray-500"
            >
              <img
                src={policy.image}
                alt={policy.title}
                className="w-full h-36 object-cover"
              />
              <div className="p-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg dark:text-white font-semibold ">
                    {policy.title}
                  </h3>
                  <p className="text-[12px] text-gray-500 dark:text-gray-300 mb-1">
                    <strong>Duration:</strong> {policy.duration}
                  </p>
                  <p className="text-[12px] text-gray-500 dark:text-gray-300">
                    <strong>Popularity:</strong>{" "}
                    <span className="text-green-600 dark:text-gray-300 font-medium">
                      {policy.purchasedCount ?? 0} purchased
                    </span>
                  </p>
                  <p className="text-[12px] text-gray-500 dark:text-gray-300 mb-1">
                    {/* <strong>Coverage Amount:</strong>
                    <span className="text-green-600 dark:text-gray-300 font-medium">
                      {policy.coverage}
                    </span> */}
                    <strong>Description:</strong>
                    <span className="text-gray-500 dark:text-gray-300 font-medium pl-0.5">
                      {policy.description.length > 100
                        ? policy.description.slice(0, 79)
                        : policy.description}
                      ...
                    </span>
                  </p>
                </div>
                <div className="flex justify-center items-center mt-2">
                  <Link
                    to={`/policy/${policy._id}`}
                    className="  w-2/5 bg-[#baa53a] hover:bg-[#fcd547] transition text-white py-1 rounded-sm text-sm  text-center"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularPolicies;
