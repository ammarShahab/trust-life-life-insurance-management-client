import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import Loading from "../../components/Loading/Loading";
import { useNavigate, useParams } from "react-router";
import { Helmet } from "react-helmet-async";

const PolicyDetails = () => {
  const { id } = useParams();
  const axiosInstance = useAxios();
  const navigate = useNavigate();

  const { data: policy, isLoading } = useQuery({
    queryKey: ["policy", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/policies/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  if (isLoading) return <Loading />;

  if (!policy) {
    return <p className="text-center text-red-500 mt-10">Policy not found.</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <Helmet>
        <title>Trust Life | Policy | {id}</title>
      </Helmet>
      <div className="grid md:grid-cols-2 gap-8 items-stretch mt-10">
        {/* Image Section */}
        <div className="h-full">
          <img
            src={policy.image}
            alt={policy.title}
            className="w-full h-full object-cover rounded-lg shadow-md"
          />
        </div>

        {/* Text Info */}
        <div className="flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 dark:text-gray-300">
              {policy.title}
            </h2>

            <p className="text-md mb-2 dark:text-gray-300">
              <span className="font-semibold">Category:</span>{" "}
              <span className="text-[#baa53a] font-medium dark:text-gray-300">
                {policy.category}
              </span>
            </p>

            <p className="text-md mb-2 dark:text-gray-300">
              <span className="font-semibold dark:text-gray-300">
                Eligibility:
              </span>{" "}
              Age {policy.minAge} - {policy.maxAge} years
            </p>

            <p className="text-md mb-2 dark:text-gray-300">
              <span className="font-semibold dark:text-gray-300">
                Coverage Amount:
              </span>{" "}
              {policy.coverage}
            </p>

            <p className="text-md mb-2 dark:text-gray-300">
              <span className="font-semibold dark:text-gray-300">
                Duration Options:
              </span>{" "}
              {policy.duration}
            </p>

            <p className="text-md mb-2 dark:text-gray-300">
              <span className="font-semibold dark:text-gray-300">
                Premium Calculation Logic:
              </span>{" "}
              Premiums are calculated based on age, gender, coverage, amount,
              policy duration, and smoker status.
            </p>

            <p className="text-md mb-2 dark:text-gray-300">
              <span className="font-semibold dark:text-gray-300">Premium:</span>{" "}
              {policy.premium}
            </p>

            <p className="text-gray-600 my-4 leading-relaxed dark:text-gray-300">
              {policy.description}
            </p>
          </div>

          <button
            onClick={() => navigate(`/get-quote/${policy._id}`)}
            className="mt-4 bg-[#baa53a] hover:bg-[#fcd547] text-white font-medium px-6 py-2 rounded-md transition w-fit"
          >
            Get Quote
          </button>
        </div>
      </div>
    </div>
  );
};

export default PolicyDetails;
