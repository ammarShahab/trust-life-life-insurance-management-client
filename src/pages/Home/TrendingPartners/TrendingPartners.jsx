import React from "react";
import logo1 from "../../../assets/images/Trusted Partners/town-lake-removebg-preview.png";
import logo2 from "../../../assets/images/Trusted Partners/tropolis-removebg-preview.png";
import logo3 from "../../../assets/images/Trusted Partners/banklynx_-_Edited-removebg-preview.png";
import logo4 from "../../../assets/images/Trusted Partners/providers-removebg-preview.png";
import logo5 from "../../../assets/images/Trusted Partners/suguros_-removebg-preview.png";
import logo6 from "../../../assets/images/Trusted Partners/landlording-removebg-preview.png";
import logo7 from "../../../assets/images/Trusted Partners/Mrtoucan-removebg-preview.png";
import logo8 from "../../../assets/images/Trusted Partners/risker-removebg-preview.png";

const logos = [
  { src: logo1, name: "Town Lake" },
  { src: logo2, name: "Tropolis" },
  { src: logo3, name: "BankLynx" },
  { src: logo4, name: "Providers" },
  { src: logo7, name: "Mrtoucan" },
  { src: logo5, name: "Surguros" },
  { src: logo6, name: "Landlording" },
  { src: logo8, name: "Risker" },
];

export default function TrendingPartnersSimple() {
  return (
    <section className="w-full py-18 px-4 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto text-center">
        <h2
          style={{
            backgroundImage:
              "linear-gradient(90deg,rgba(112, 215, 120, 1) 0%, rgba(198, 168, 78, 1) 82%, rgba(116, 181, 241, 1) 100%)",
          }}
          className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-green-600 via-lime-500 to-green-600 text-transparent bg-clip-text py-3 dark:text-gray-300 "
        >
          Trending Partners
        </h2>
        <p className="text-slate-600 dark:text-gray-300 text-sm sm:text-base mt-4 max-w-xl mx-auto ">
          Our strong network of trusted partners helps us provide unmatched
          services while building lasting relationships across industries.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 items-center justify-items-center mt-8">
          {logos.map((logo, i) => (
            <div
              key={i}
              className="
                flex items-center justify-center
                w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-48 lg:h-48
                 dark:bg-gray-300
                rounded-lg
              "
            >
              <img
                src={logo.src}
                alt={`${logo.name} logo`}
                loading="lazy"
                className="
                  object-contain
                  max-w-full max-h-full
                  transition-transform duration-250 ease-out
                  hover:scale-105
                "
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
