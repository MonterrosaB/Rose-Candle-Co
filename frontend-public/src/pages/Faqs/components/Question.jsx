import { useState } from "react";

const Question = ({ Icon, question, answer }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="mb-4 border-b border-gray-300 pb-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center w-full px-4 py-3 focus:outline-none"
      >
        <div className="flex items-center justify-center w-10 h-10 rounded-lg border-2 border-black text-black">
          {Icon && <Icon size={25} />}
        </div>

        <h3 className="flex-grow px-4 text-left font-semibold text-md text-gray-800">
          {question}
        </h3>

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
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div
        className={`px-14 text-gray-700 text-md overflow-hidden transition-all duration-500 ease-in-out ${
          open ? "max-h-[1000px] opacity-100 mt-2" : "max-h-0 opacity-0"
        }`}
      >
        <p>{answer}</p>
      </div>
    </div>
  );
};

export default Question;
