
const StarIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
)

const OrbitedCircle = ({ size = "small" }) => {
  const sizeClasses = {
    small: "w-32 h-32",
    medium: "w-48 h-48",
    large: "w-80 h-80",
  }

  const starSizes = {
    small: "w-3 h-3",
    medium: "w-4 h-4",
    large: "w-5 h-5",
  }

  return (
    <div className={`relative ${sizeClasses[size]}`}>
      {/* Círculo orbital */}
      <div className="absolute inset-0 border border-gray-400 rounded-full"></div>

      {/* Contenedor rotatorio */}
      <div
        className="absolute inset-0"
        style={{
          animation: "spin 8s linear infinite",
        }}
      >
        {/* Estrella 1 - izquierda (180°) */}
        <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1/2">
          <StarIcon className={`${starSizes[size]} text-black`} />
        </div>

        {/* Estrella 2 - arriba (0°) */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <StarIcon className={`${starSizes[size]} text-black`} />
        </div>

        {/* Estrella 3 - derecha (0°) */}
        <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1/2">
          <StarIcon className={`${starSizes[size]} text-black`} />
        </div>

        {/* Estrella 4 - abajo (270°) */}
        <div className="absolute bottom-0 left-1/2 transform translate-x-[-50%] translate-y-[50%]">
          <StarIcon className={`${starSizes[size]} text-black`} />
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
  )
}

export default OrbitedCircle
