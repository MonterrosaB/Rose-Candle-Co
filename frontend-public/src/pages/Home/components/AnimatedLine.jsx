import { useEffect, useState } from "react";
import { motion } from "motion/react";

export function AnimatedLine() {
  const [pathLength, setPathLength] = useState(0);
  const [sectionOffsetTop, setSectionOffsetTop] = useState(0);
  const [sectionHeight, setSectionHeight] = useState(0);

  useEffect(() => {
    const section = document.querySelector("[data-animated-section]");
    if (section) {
      setSectionOffsetTop(section.offsetTop);
      setSectionHeight(section.offsetHeight);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const scrollRelative = scrollY - sectionOffsetTop;
      
      const startOffset = -1000;
      const endOffset = sectionHeight + 200;
      const totalDistance = endOffset - startOffset;
      
      const adjustedScroll = scrollRelative - startOffset;
      const progress = Math.max(0, Math.min(1, adjustedScroll / totalDistance));
      
      setPathLength(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionOffsetTop, sectionHeight]);

  return (
    <motion.svg
      width="50vh"
      height="30vh"
      viewBox="0 0 1382 1024"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute z-0"
      style={{
        top: "-40vh",
        left: "-32vh",
        width: "150%",
        height: "auto",
        pointerEvents: "none"
      }}
    >
      <motion.path
        d="M0 512C300 400 691 300 691 512C691 700 691 800 691 1100"
        stroke="#F2EBD9"
        strokeWidth="60"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength }}
        transition={{
          duration: 0.05,
          ease: "linear"
        }}
      />
    </motion.svg>
  );
}