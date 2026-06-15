import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { FaEye } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCustomerRole from "../../hooks/useCustomerRole";
import Loading from "../../components/Loading/Loading";
import { Helmet } from "react-helmet-async";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth/useAuth";

const Blogs = () => {
  const axiosInstance = useAxios();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  // const { role } = useCustomerRole();
  // console.log("role", role);
  const { user } = useAuth();
  // console.log("user", user);
  // console.log("user", user?.accessToken);

  const { data: blogs = [], isLoading } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const res = await axiosInstance.get("/all-blogs");
      return res.data;
    },
  });

  const handleReadMore = async (blog) => {
    if (user) {
      try {
        await axiosSecure.patch(`/blogs/visit/${blog._id}`);
        // navigate(`/blogs/${blog._id}`);
      } catch (err) {
        console.error("Failed to increase visit count", err);
      }
    }

    navigate(`/blogs/${blog._id}`);
  };

  if (isLoading) return <Loading />;

  return (
    <section className=" px-4 py-8 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <Helmet>
          <title>Trust Life | Blogs</title>
        </Helmet>
        <div className="mt-10 bg-white rounded-sm p-3 text-xl font-semibold mb-2 dark:bg-gradient-to-br dark:from-gray-700 dark:via-gray-600 dark:to-gray-500 dark:text-gray-300">
          Blogs
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2  ">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="flex flex-col max-w-lg p-2 space-y-4 overflow-hidden rounded-lg shadow-md bg-white text-gray-800 hover:shadow-2xl transition dark:bg-gradient-to-br dark:from-gray-700 dark:via-gray-600 dark:to-gray-500 dark:text-gray-300 hover:scale-[1.02]"
            >
              {/* Author Section */}
              <div className="flex space-x-4 items-center">
                <img
                  alt={blog.author}
                  src={
                    blog.authorImage ||
                    "https://i.ibb.co/rbskskP/default-avatar.png"
                  }
                  className="object-cover w-12 h-12 rounded-full shadow"
                />
                <div className="flex flex-col">
                  <span className="text-sm font-semibold dark:text-gray-300">
                    {blog.author}
                  </span>
                  <span className="text-xs text-gray-600 dark:text-gray-300">
                    {new Date(blog.publishDate).toLocaleString("en-BD", {
                      timeZone: "Asia/Dhaka",
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>

              {/* Blog Content */}
              <div>
                <img
                  src={blog.imageUrl}
                  alt={blog.title}
                  className="object-cover w-full mb-4 h-48 rounded-md"
                />
                <h2 className="mb-2 text-xl font-semibold">{blog.title}</h2>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {blog.content.split(" ").slice(0, 30).join(" ")}...
                </p>
              </div>

              {/* Blog Footer */}
              <div className="flex justify-between items-center text-sm text-gray-600">
                <span className="flex items-center gap-1 dark:text-gray-300 ">
                  <FaEye className="text-yellow-600 dark:text-gray-300" />{" "}
                  {blog.totalVisit || 0}
                </span>
                <button
                  onClick={() => handleReadMore(blog)}
                  className="w-1/2 px-4 py-2 bg-[#baa53a] hover:bg-[#fcd547] text-white font-semibold transition rounded"
                >
                  Read more
                </button>
              </div>

              {/* Read More Button */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blogs;
