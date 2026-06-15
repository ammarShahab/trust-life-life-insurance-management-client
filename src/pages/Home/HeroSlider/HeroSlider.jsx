import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import slider_1 from "../../../assets/images/slider_1.jpg";
import slider_2 from "../../../assets/images/slider_2.jpg";
import slider_3 from "../../../assets/images/slider_3.jpg";
import { Link } from "react-router";

const HeroSlider = () => {
  const slides = [
    {
      img: slider_1, // Replace with your image path
      quote: "Protect what matters most — your family, your future.",
    },
    {
      img: slider_2,
      quote: "Plan today, so they’re safe tomorrow.",
    },
    {
      img: slider_3,
      quote: "Security you can feel. Coverage you can trust.",
    },
  ];

  return (
    <div className="relative">
      <Carousel
        autoPlay
        infiniteLoop
        interval={2000}
        showThumbs={false}
        showStatus={false}
        showArrows={false}
        swipeable
        emulateTouch
      >
        {slides.map((slide, idx) => (
          <div key={idx} className="relative">
            <img
              src={slide.img}
              alt={`Slide ${idx + 1}`}
              className="h-[80vh] w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="text-center px-4">
                <h2 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#baa53a] via-[#fcd547] to-[#baa53a] text-transparent bg-clip-text drop-shadow-lg py-2">
                  {slide.quote}
                </h2>
                <Link to="/get-free-quote">
                  <button className="mt-6 bg-[#baa53a] hover:bg-[#fcd547] text-white font-semibold py-2 px-6 rounded-lg transition">
                    Get a Free Quote
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default HeroSlider;
