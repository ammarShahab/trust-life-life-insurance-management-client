import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import Loading from "../../components/Loading/Loading";
import { Link } from "react-router";
import { Helmet } from "react-helmet-async";

const AllPolicies = () => {
  const axiosInstance = useAxios();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchText, setSearchText] = useState("");
  const [debouncedSearchText, setDebouncedSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const limit = 8;

  // Debounce search input — 300ms delay before firing API call
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchText(searchText);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchText]);

  const { data, isLoading } = useQuery({
    queryKey: [
      "policies",
      selectedCategory,
      debouncedSearchText,
      currentPage,
      sortBy,
      sortOrder,
    ],
    queryFn: async () => {
      let url = `/all-policies?page=${currentPage}&limit=${limit}`;
      if (selectedCategory !== "all") url += `&category=${selectedCategory}`;
      if (debouncedSearchText.trim() !== "")
        url += `&search=${encodeURIComponent(debouncedSearchText.trim())}`;
      if (sortBy) url += `&sortBy=${sortBy}`;
      if (sortOrder) url += `&sortOrder=${sortOrder}`;
      const res = await axiosInstance.get(url);
      return res.data;
    },
    keepPreviousData: true,
  });

  const totalPages = Math.ceil((data?.total || 0) / limit);

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
    setCurrentPage(1);
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    switch (value) {
      case "newest":
        setSortBy("createdAt");
        setSortOrder("desc");
        break;
      case "oldest":
        setSortBy("createdAt");
        setSortOrder("asc");
        break;
      case "premium_asc":
        setSortBy("premium");
        setSortOrder("asc");
        break;
      case "premium_desc":
        setSortBy("premium");
        setSortOrder("desc");
        break;
      case "popular":
        setSortBy("popular");
        setSortOrder("desc");
        break;
      default:
        setSortBy("createdAt");
        setSortOrder("desc");
    }
    setCurrentPage(1);
  };

  // Compute current sort value for the <select> element
  const getCurrentSortValue = () => {
    if (sortBy === "popular") return "popular";
    if (sortBy === "premium" && sortOrder === "asc") return "premium_asc";
    if (sortBy === "premium" && sortOrder === "desc") return "premium_desc";
    if (sortBy === "createdAt" && sortOrder === "asc") return "oldest";
    return "newest";
  };

  return (
    <section className="px-4 py-8 dark:bg-gray-900">
      <Helmet>
        <title>Trust Life | All Policies</title>
      </Helmet>
      <div className="max-w-7xl mx-auto">
        <div className="mt-10 bg-white dark:bg-gradient-to-br dark:from-gray-700 dark:via-gray-600 dark:to-gray-500 rounded-sm p-3 text-xl font-semibold dark:text-gray-300">
          All Policies
        </div>

        {/* Filters, Search, Sort */}
        <div className="flex flex-wrap  gap-4 justify-between items-center mt-8 mb-4">
          <div className="flex flex-wrap gap-3">
            <select
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="border px-7 py-2 rounded-md text-sm bg-white dark:bg-gray-700 dark:text-gray-200"
            >
              <option value="all">All Categories</option>
              <option value="Term Life">Term Life</option>
              <option value="Senior Plan">Senior Plan</option>
              <option value="Family Plan">Family Plan</option>
              <option value="Child Plan">Child Plan</option>
            </select>
          </div>

          {/* search and sort */}
          <div className="flex flex-row gap-4 items-center">
            <input
              type="text"
              placeholder="Search policies..."
              value={searchText}
              onChange={handleSearch}
              className="border px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring focus:border-[#baa53a] max-w-xl w-full"
            />
            <select
              value={getCurrentSortValue()}
              onChange={handleSortChange}
              className="border px-6 py-2 rounded-md text-sm bg-white dark:bg-gray-700 dark:text-gray-200"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="premium_asc">Premium: Low to High</option>
              <option value="premium_desc">Premium: High to Low</option>
              <option value="popular">Most Popular</option>
            </select>
          </div>
        </div>

        {isLoading ? (
          <Loading />
        ) : !data?.policies?.length ? (
          <p className="text-center text-gray-500 dark:text-gray-300">
            No policies found.
          </p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
              {data.policies.map((policy) => (
                <div
                  key={policy._id}
                  className="bg-white dark:bg-gradient-to-br dark:from-gray-700 dark:via-gray-600 dark:to-gray-500 rounded-lg shadow-md hover:shadow-2xl transition transform hover:scale-105 duration-200 will-change-transform backface-hidden"
                >
                  <img
                    src={policy.image}
                    alt={policy.title}
                    className="w-full h-40 object-cover rounded-t-lg"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-300">
                      {policy.title}
                    </h3>
                    <p className="text-sm font-bold text-[#baa53a] mt-1 dark:text-gray-300">
                      Category: {policy.category}
                    </p>
                    <p className="text-sm text-gray-600 mt-1 mb-3 dark:text-gray-300">
                      {policy.description?.slice(0, 80)}...
                    </p>
                    <div className="flex justify-center">
                      <Link
                        to={`/policy/${policy._id}`}
                        className="w-2/5 bg-[#baa53a] hover:bg-[#fcd547] text-white py-1 rounded-sm text-sm text-center"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center mt-8 space-x-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`px-4 py-2 rounded-md border text-sm ${
                        currentPage === pageNum
                          ? "bg-[#baa53a] text-white"
                          : "bg-white text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {pageNum}
                    </button>
                  ),
                )}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default AllPolicies;
