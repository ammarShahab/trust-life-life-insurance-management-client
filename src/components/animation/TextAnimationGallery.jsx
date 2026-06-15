import React from "react";
import { motion } from "framer-motion";

const TextAnimationGallery = () => {
  return (
    <h2
      className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4 sm:mb-6 animated-gradient-text"
      aria-label="Our Customers Speak For Us"
    >
      Our Customers Speak For Us
    </h2>
    /*  <motion.h2
      className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4 sm:mb-6 "
      animate={{
        color: [
          "#0f172a", // dark / navy — high contrast
          "#064e3b", // deep teal
          "#f8fafc", // near white
          "#b45309", // warm amber for pop
          "#f8fafc", // back to near white
        ],
      }}
      transition={{ duration: 6, repeat: Infinity }}
    >
      Our Customers Speak For Us
    </motion.h2> */
  );
};

export default TextAnimationGallery;
