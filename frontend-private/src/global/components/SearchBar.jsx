import { Search } from "lucide-react";

const SearchBar = ({ placeholder, onChange, value }) => {
    return (
        <div className="relative w-full mb-4">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search color="#333" size={18} />
            </div>
            <input
                type="search"
                id="search"
                className="block w-full p-4 ps-10 text-sm rounded-lg border border-gray-300 focus:border-black bg-[#F7F5EE] text-[#333] outline-none transition-colors duration-200"
                placeholder={placeholder}
                onChange={onChange}
                value={value}
            />
        </div>
    );
};

export default SearchBar;
