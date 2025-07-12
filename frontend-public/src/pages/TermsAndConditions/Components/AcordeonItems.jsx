const AccordionItem = ({ title, content, isOpen, onToggle }) => {
  return (
    
    <div className="border border-gray-300 rounded-md overflow-hidden transition-all duration-300">
      <button
        onClick={onToggle}
        className="w-full text-left px-4 py-3 bg-gray-100 hover:bg-gray-200 font-medium flex justify-between items-center"
      >
        <span>{title}</span>
        <span>{isOpen ? "−" : "+"}</span>
      </button>
      <div
        className={`transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-screen opacity-100 py-4 px-4" : "max-h-0 opacity-0 overflow-hidden"
        } bg-white text-gray-700`}
      >
        {typeof content === "string" ? <p>{content}</p> : content}
      </div>
    </div>
  );
};
export default AccordionItem;