import { motion } from "motion/react"; // librería de Motion

export default function AnimatedLine() {
  return (
    <motion.svg
      width="50vh" // tamaño
      height="30vh"
      viewBox="0 0 1382 1024"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute z-0"
      style={{
        top: "-18vh", 
        left: "-32vh", // ubicación
        width: "150%",
        height: "auto",
        pointerEvents: "none"
      }}
    >
      <motion.path
        d="M-94 322.549C299.774 684.313 1061.63 -749.482 613.676 280.113C255.314 1103.79 975.241 1253.13 1380 1224.84"
        stroke="#A78A5E"
        strokeWidth="30"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          duration: 1.5, // duración
          easing: "ease-in-out",
        }}
      />
    </motion.svg>
  );
}