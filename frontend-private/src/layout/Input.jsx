const Input = ({label, placeholder, type}) => {
  return (
    <>
      <div className="flex flex-col rounded-xl px-2.5 pb-3 pt-1.5 w-lg border border-[#9E9E9E] focus-within:border-[#333] transition duration-300 ease-in-out">
  <label htmlFor="card" className="text-sm font-medium">{label}</label>
  <input
    id="card"
    type={type}
    className="text-base text-[#8d8c8c] outline-none font-normal"
    placeholder={placeholder}
  />
</div>


    </>
  );
};
export default Input;
