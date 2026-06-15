import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router";
import useAxios from "../../../hooks/useAxios";
import Loading from "../../../components/Loading/Loading";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCustomerRole from "../../../hooks/useCustomerRole";
import useAuth from "../../../hooks/useAuth/useAuth";

const LatestBlogs = () => {
  const axiosInstance = useAxios();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  // const { role } = useCustomerRole();
  const { user } = useAuth();
  // console.log("user", user);

  const { data: blogs = [], isLoading } = useQuery({
    queryKey: ["latestBlogs"],
    queryFn: async () => {
      const res = await axiosInstance.get("/blog-latest"); // calling the backend API
      return res.data;
    },
  });

  const formatBDDate = (timestamp) => {
    return new Date(timestamp).toLocaleString("en-BD", {
      timeZone: "Asia/Dhaka",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleViewDetails = async (blog) => {
    if (user) {
      try {
        await axiosSecure.patch(`/blogs/visit/${blog._id}`);
        navigate(`/blogs/${blog._id}`);
      } catch (err) {
        console.error("Failed to increase visit count", err);
      }
    }
    navigate(`/blogs/${blog._id}`);
  };

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <section className=" py-12  bg-[conic-gradient(at_top_right,_#f9f3df,_#fdfce5,_#d7e9f7)] dark:bg-none dark:bg-gray-900 ">
      <div className="max-w-7xl px-4  mx-auto mt-10">
        <h2
          style={{
            backgroundImage:
              "linear-gradient(90deg,rgba(112, 215, 120, 1) 0%, rgba(198, 168, 78, 1) 82%, rgba(116, 181, 241, 1) 100%)",
          }}
          className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center py-2  dark:text-gray-300 text-transparent bg-clip-text "
        >
          Latest Insights from Trust Life
        </h2>
        <p className="mt-4 mx-auto text-slate-500 text-center mb-12 dark:text-gray-300 ">
          At TrustLife, we believe that knowledge is power. Our blog offers you
          insights into the world of insurance, helping you make informed
          decisions for your future. Whether you're curious about life plans,
          savings options, or financial protection, our latest articles bring
          you real-life guidance from trusted experts and customer stories.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-gray-100 text-gray-800 rounded-lg overflow-hidden shadow-lg flex flex-col hover:scale-[1.02] duration-300 dark:bg-gradient-to-br dark:from-gray-700 dark:via-gray-600 dark:to-gray-500"
            >
              <img
                src={blog.imageUrl}
                alt={blog.title}
                className="w-full h-52 object-cover"
              />
              <div className="px-2 py-2 flex-1 flex flex-col justify-center">
                <div>
                  <h3 className="text-lg font-semibold mb-2 dark:text-gray-300 ">
                    {blog.title}
                  </h3>
                  <p className="text-sm mb-4 text-gray-600 dark:text-gray-300 ">
                    {blog.content.length > 120
                      ? blog.content.slice(0, 120) + "..."
                      : blog.content}
                  </p>
                </div>
                <div className="flex items-center justify-between text-xs mt-2">
                  <span className="text-gray-500 dark:text-gray-300 ">
                    {formatBDDate(blog.publishDate)}
                  </span>
                  <button
                    onClick={() => handleViewDetails(blog)}
                    // className="text-blue-600 hover:underline font-semibold"
                    className="  w-2/5 bg-[#baa53a] hover:bg-[#fcd547] transition text-white py-1 rounded-sm text-sm  text-center"
                  >
                    Read More →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center mt-10">
        <Link
          to="/blogs"
          className=" text-white font-semibold px-6 py-2 rounded-full shadow bg-[#baa53a] hover:bg-[#fcd547] transition"
        >
          View All Blogs
        </Link>
      </div>
    </section>
  );
};

export default LatestBlogs;
