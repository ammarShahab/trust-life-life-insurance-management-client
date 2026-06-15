import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TextAnimationGallery from "../../../components/animation/TextAnimationGallery";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";

const ReviewCard = () => {
  const axiosInstance = useAxios();

  const { data: reviews = [] } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await axiosInstance.get("/reviews");
      return res.data;
    },
  });

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true,
    centerMode: true,
    centerPadding: "0px",
    responsive: [
      {
        breakpoint: 1280,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  const renderStars = (num) => {
    const fullStars = "★".repeat(Number(num));
    const emptyStars = "☆".repeat(5 - Number(num));
    return (
      <span className="text-yellow-400 text-xl font-semibold">
        {fullStars}
        <span className="text-gray-300">{emptyStars}</span>
      </span>
    );
  };

  return (
    <section className="py-10 md:py-16 lg:py-20 text-white  bg-gradient-to-bl from-[#ffe4e6]  to-[#ccfbf1] dark:bg-gray-900 dark:from-transparent dark:via-transparent dark:to-transparent">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <TextAnimationGallery />

        <p className="text-center max-w-2xl mx-auto text-lg md:text-xl mb-10 opacity-90 text-slate-600 dark:text-gray-300">
          Dive into the voices of our community. Real stories, real impact, real
          people.
        </p>

        <div className="max-w-6xl mx-auto px-2">
          <Slider {...settings}>
            {reviews.map((review, index) => (
              <div key={index} className="px-3">
                <div className="bg-white/40 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-6 transition duration-300 hover:scale-105">
                  <div className="flex items-center gap-5">
                    <img
                      src={review.userImage}
                      alt={review.userName}
                      className="w-16 h-16 rounded-full object-cover border-2 border-white"
                    />
                    <div>
                      <h4 className="text-lg font-semibold text-slate-600 dark:text-gray-300">
                        {review.userName}
                      </h4>
                      <div>{renderStars(review.rating)}</div>
                    </div>
                  </div>

                  <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-gray-300 italic leading-relaxed">
                    "{review.feedback}"
                  </p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default ReviewCard;
