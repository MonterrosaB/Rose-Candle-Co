const StarIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const OrbitedCircle = ({ size = "large" }) => {
  const sizeClasses = {
    small: "w-[120px] h-[120px]",
    medium: "w-[180px] h-[180px]",
    large: "w-[240px] h-[240px]",
  };

  const starSizes = {
    small: "w-3 h-3",
    medium: "w-4 h-4",
    large: "w-6 h-6",
  };

  return (
    <div className="absolute top-0 right-0 mt-6 mr-6 overflow-visible z-10" style={{ width: sizeClasses[size].split(" ")[0].replace("w-", "").replace("[", "").replace("]", ""), height: sizeClasses[size].split(" ")[1].replace("h-", "").replace("[", "").replace("]", "") }}>
      {/* Contenedor círculo */}
      <div
        className={`relative rounded-full border border-gray-400`}
        style={{
          width: sizeClasses[size].split(" ")[0].replace("w-", "").replace("[", "").replace("]", ""),
          height: sizeClasses[size].split(" ")[1].replace("h-", "").replace("[", "").replace("]", ""),
        }}
      >
        {/* Contenedor rotatorio */}
        <div
          className="absolute inset-0"
          style={{
            animation: "spin 8s linear infinite",
            transformOrigin: "50% 50%",
          }}
        >
          <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1/2">
            <StarIcon className={`${starSizes[size]} text-black`} />
          </div>

          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <StarIcon className={`${starSizes[size]} text-black`} />
          </div>

          <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1/2">
            <StarIcon className={`${starSizes[size]} text-black`} />
          </div>

          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
            <StarIcon className={`${starSizes[size]} text-black`} />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default OrbitedCircle;
