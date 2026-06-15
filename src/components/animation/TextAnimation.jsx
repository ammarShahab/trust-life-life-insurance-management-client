import React from "react";

import { easeInOut, motion } from "motion/react";

const TextAnimation = () => {
  return (
    <motion.h1
      initial={{ y: 25, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 3, ease: easeInOut, repeat: Infinity }}
    >
      Our Featured Packages
    </motion.h1>
  );
};
export default TextAnimation;
