import { Link } from "react-router";

const Menu = () => {
  return (
    <ul className="text-sm mt-1 ml-3 space-y-1">
      <li>
        <Link
          to="/materials"
          className="block py-1 px-2 rounded-md hover:bg-[#A3A380]/20 transition-colors duration-300"
        >
          Materials
        </Link>
      </li>
      <li>
        <Link
          to="/record"
          className="block py-1 px-2 rounded-md hover:bg-[#A3A380]/20 transition-colors duration-300"
        >
          Record
        </Link>
      </li>
      <li>
        <Link
          to="/products"
          className="block py-1 px-2 rounded-md hover:bg-[#A3A380]/20 transition-colors duration-300"
        >
          Products
        </Link>
      </li>
      <li>
        <Link
          to="/others"
          className="block py-1 px-2 rounded-md hover:bg-[#A3A380]/20 transition-colors duration-300"
        >
          Others
        </Link>
      </li>
    </ul>
  );
};

export default Menu;
