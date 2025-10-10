import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import bannerbackground3 from "../../../assets/bannerbackground3.png";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.3,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  show: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
};

const fadeRight = {
  hidden: { opacity: 0, x: -60 },
  show: { opacity: 1, x: 0, transition: { duration: 1, ease: "easeOut" } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } },
};

const BannerThree = () => {
  const bannerRef = useRef(null);
  const isInView = useInView(bannerRef, { amount: 0.5, once: true });

  return (
    <div
      ref={bannerRef}
      className="relative min-h-screen w-full overflow-hidden"
    >
      {/* Animated background */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bannerbackground3})` }}
        initial={{ scale: 1.1, x: -20 }}
        animate={{ scale: 1, x: 0 }}
        transition={{ duration: 15, ease: "easeInOut" }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 flex items-center justify-center min-h-screen px-4 py-8"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
      >
        <div className="text-center">
          {/* Title */}
          <motion.h1
            variants={fadeUp}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-wide drop-shadow-lg"
          >
            CADA FRAGANCIA <br /> ES UN SUSPIRO <br /> DE ARMONÍA
          </motion.h1>

          {/* Paragraph */}
          <motion.p
            variants={fadeRight}
            className="max-w-xl mx-auto text-white/90 text-base md:text-lg leading-relaxed font-light drop-shadow-md"
          >
            En cada aroma, una historia. <br />
            En cada nota, un instante de paz. <br />
            Sumérgete en un universo sensorial único.
          </motion.p>

          {/* Button */}
          <motion.div variants={scaleIn} className="mt-8">
            <button className="px-6 py-3 bg-white/90 hover:bg-white text-black font-medium rounded-full shadow-lg transition duration-300">
              Descúbrelo
            </button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default BannerThree;
