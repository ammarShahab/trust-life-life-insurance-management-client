import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { FaEye } from "react-icons/fa";
import useAxios from "../../hooks/useAxios";
import { Helmet } from "react-helmet-async";

const BlogDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosInstance = useAxios();

  const handleGoBack = () => {
    navigate("/blogs");
  };

  // Fetch blog data
  const { data: blog = {} } = useQuery({
    queryKey: ["singleBlog", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/blogs/${id}`);
      return res.data;
    },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <Helmet>
        <title>Trust Life | Blogs | {id}</title>
      </Helmet>
      <div className="bg-white shadow-lg rounded-xl overflow-hidden mt-10 dark:bg-gradient-to-br dark:from-gray-700 dark:via-gray-600 dark:to-gray-500 ">
        <img
          src={blog.imageUrl}
          alt={blog.title}
          className="w-full h-[70vh] object-cover"
        />

        <div className="p-6 space-y-4 ">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-300">
            {blog.title}
          </h1>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div className="flex items-center gap-3 dark:text-gray-300">
              <img
                src={blog.authorImage}
                alt={blog.author}
                className="w-10 h-10 rounded-full object-cover "
              />
              <div>
                <p className="font-semibold text-gray-700 flex items-center gap-2 dark:text-gray-300">
                  {blog.author}
                  {blog.authorRole && (
                    <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-gray-500 dark:text-gray-300 ">
                      {blog.authorRole}
                    </span>
                  )}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  Published on:{" "}
                  {new Date(blog.publishDate).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-gray-500 text-sm dark:text-gray-300">
              <FaEye className="text-blue-600 dark:text-gray-300" />
              <span>{blog.totalVisit || 0} views</span>
            </div>
          </div>

          <div className="text-gray-700 text-justify leading-relaxed text-base whitespace-pre-line dark:text-gray-300">
            {blog.content}
          </div>
          {/* Full-width Go Back Button */}
          <div className="mt-6">
            <button
              onClick={handleGoBack}
              color="gray"
              type="button"
              className="text-white bg-[#693d3d] hover:bg-[#774545]  focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-full transition"
            >
              Go To Blogs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailsPage;
