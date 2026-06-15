import { useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../../hooks/useAxiosSecure";
import useAuth from "../../../../../hooks/useAuth/useAuth";
import Loading from "../../../../../components/Loading/Loading";
import { FaEdit, FaTrash } from "react-icons/fa";
import useCustomerRole from "../../../../../hooks/useCustomerRole";
import { Helmet } from "react-helmet-async";

const ManageBlogs = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { role } = useCustomerRole();
  const [showModal, setShowModal] = useState(false);
  const [editBlogId, setEditBlogId] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  // Fetch Blogs
  const { data: blogs = [], isLoading } = useQuery({
    queryKey: ["blogs", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/blogs?email=${user?.email}`);
      return res.data;
    },
  });

  // Create Blog Mutation
  const createBlog = useMutation({
    mutationFn: async (data) => {
      const blogData = {
        ...data,
        publishDate: new Date().toISOString(),
        author: user.displayName,
        authorEmail: user.email,
        authorImage: user.photoURL,
        authorRole: role,
      };
      const res = await axiosSecure.post("/blogs", blogData);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["blogs"]);
      Swal.fire("Published!", "Blog created successfully.", "success");
      reset();
      setShowModal(false);
    },
  });

  // Update Blog Mutation
  const updateBlog = useMutation({
    mutationFn: async (data) => {
      const res = await axiosSecure.put(`/blogs/${editBlogId}`, {
        ...data,
        author: user.displayName,
        authorEmail: user.email,
        authorImage: user.photoURL,
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["blogs"]);
      Swal.fire("Updated!", "Blog updated successfully.", "success");
      reset();
      setEditBlogId(null);
      setShowModal(false);
    },
  });

  // Delete Blog Mutation
  const deleteBlog = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/blogs/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["blogs"]);
      Swal.fire("Deleted!", "Blog deleted successfully.", "success");
    },
  });

  // Submit Handler
  const onSubmit = (data) => {
    if (editBlogId) {
      updateBlog.mutate(data);
    } else {
      createBlog.mutate(data);
    }
  };

  // Populate form for editing
  const handleEdit = (blog) => {
    setEditBlogId(blog._id);
    setValue("title", blog.title);
    setValue("imageUrl", blog.imageUrl);
    setValue("content", blog.content);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This blog will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#aaa",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteBlog.mutate(id);
      }
    });
  };

  const closeModal = () => {
    setShowModal(false);
    reset();
    setEditBlogId(null);
  };

  if (isLoading) return <Loading />;

  return (
    <div className="px-4 md:px-8 py-6 space-y-6">
      <Helmet>
        <title>Trust Life | Dashboard Manage Blogs</title>
      </Helmet>
      <div className="flex justify-between items-center flex-wrap gap-3">
        <h2 className="text-2xl font-bold text-green-800 dark:text-gray-300">
          Manage Blogs
        </h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-[#baa53a] hover:bg-[#fcd547] transition duration-200 text-white px-4 py-2 rounded-md"
        >
          + Add New Blog
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-md border border-gray-200 dark:border-0">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-100 text-gray-600 uppercase  dark:bg-gradient-to-br dark:from-gray-700 dark:via-gray-600 dark:to-gray-500 dark:text-gray-300">
            <tr>
              <th className="px-4 py-3">Image</th>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Content</th>
              <th className="px-4 py-3">Author</th>
              <th className="px-4 py-3">Publish Date</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.length > 0 ? (
              blogs.map((blog) => (
                <tr
                  key={blog._id}
                  className="bg-white border-b  hover:bg-gray-50 transition duration-150  dark:bg-gray-500 dark:text-gray-300 dark:hover:bg-gray-600"
                >
                  <td className="px-4 py-3">
                    <img
                      src={blog.imageUrl}
                      alt={blog.title}
                      className="h-12 w-16 object-cover rounded"
                    />
                  </td>
                  <td className="px-4 py-3 font-semibold">{blog.title}</td>
                  <td className="px-4 py-3">{blog.content.slice(0, 60)}...</td>
                  <td className="px-4 py-3">{blog.author}</td>
                  <td className="px-4 py-3">
                    {new Date(blog.publishDate).toLocaleDateString("en-BD")}
                  </td>
                  <td className="px-4 py-3 space-x-2">
                    <button
                      onClick={() => handleEdit(blog)}
                      className="text-blue-600 hover:underline dark:text-gray-300"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(blog._id)}
                      className="text-red-600 hover:underline"
                    >
                      <FaTrash></FaTrash>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-6 text-gray-500 italic bg-white"
                >
                  No blogs found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Create/Edit Blog Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-md w-full max-w-lg p-6 relative  dark:bg-gradient-to-br dark:from-gray-700 dark:via-gray-600 dark:to-gray-500 dark:text-gray-300">
            <h3 className="text-xl font-semibold mb-4">
              {editBlogId ? "Edit Blog" : "Create New Blog"}
            </h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="font-medium">Title</label>
                <input
                  type="text"
                  {...register("title", { required: "Title is required" })}
                  className="w-full border px-3 py-2 rounded mt-1 dark:text-gray-900"
                />
                {errors.title && (
                  <p className="text-sm text-red-500">{errors.title.message}</p>
                )}
              </div>

              <div>
                <label className="font-medium">Image URL</label>
                <input
                  type="text"
                  {...register("imageUrl", {
                    required: "Image URL is required",
                  })}
                  className="w-full border px-3 py-2 rounded mt-1 dark:text-gray-900"
                />
                {errors.imageUrl && (
                  <p className="text-sm text-red-500">
                    {errors.imageUrl.message}
                  </p>
                )}
              </div>

              <div>
                <label className="font-medium">Content</label>
                <textarea
                  rows={5}
                  {...register("content", {
                    required: "Content is required",
                  })}
                  className="w-full border px-3 py-2 rounded mt-1 dark:text-gray-900"
                ></textarea>
                {errors.content && (
                  <p className="text-sm text-red-500">
                    {errors.content.message}
                  </p>
                )}
              </div>

              <div>
                <label className="font-medium">Author</label>
                <input
                  type="text"
                  value={user?.displayName}
                  readOnly
                  className="w-full border px-3 py-2 rounded mt-1 bg-gray-100 dark:text-gray-900"
                />
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 rounded text-gray-300  bg-[#693d3d] hover:bg-[#774545] "
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2  text-white rounded bg-[#baa53a] hover:bg-[#fcd547] transition duration-200"
                >
                  {editBlogId ? "Update" : "Publish"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageBlogs;
