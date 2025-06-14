import { useState } from "react";

const Question = ({ Icon, question, answer }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="-mb-8">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center w-full px-4 py-3 focus:outline-none"
      >
        {/* Icono de pregunta */}
        <div className="flex items-center justify-center w-10 h-10 rounded-lg border-2 border-black text-black">
          {Icon && <Icon size={30} />}
        </div>

        {/* Pregunta */}
        <h3 className="flex-grow px-4 text-left font-semibold text-md text-gray-800">
          {question}
        </h3>

        {/* Flecha con rotación */}
        <svg
          className={`transition-transform duration-300 ${
            open ? "rotate-180" : "rotate-0"
          } text-gray-600`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          width="24"
          height="24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Cambia la altura */}
      <div
        className={`ml-18 text-gray-700 transition-max-height duration-300 ease-in-out text-md overflow-hidden ${
          open ? "max-h-40" : "max-h-0"
        }`}
      >
        <p>{answer}</p>
      </div>
    </div>
  );
};

export default Question;