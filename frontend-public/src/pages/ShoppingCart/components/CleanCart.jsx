import React from "react";

const ClearButton = ({ onClear }) => {



  return (
    <button
      onClick={onClear}
      className="bg-red-200 text-red-800 border border-red-400 px-4 py-2 rounded hover:bg-red-300 transition"
    >
      Vaciar carrito
    </button>
  );
};

export default ClearButton;
