import React, { useState } from "react";
import Isotipo from "../../assets/Isotipo.svg";
import Menu from "./Menu";
import { Link } from "react-router";
import { ChevronDown, LogOut } from "lucide-react";

const Sidebar = () => {
  const [openDropdown, setOpenDropDown] = useState(false);

  return (
    <>
      <aside className="fixed top-0 left-0 w-64 h-screen flex flex-col justify-between transition-transform -translate-x-full sm:translate-x-0 shadow-md">
        <div>
          {/* Isotipo de la marca */}
          <div className="isotipo flex items-center justify-center p-4">
            <img src={Isotipo} alt="Isotipo Rosé Candle Co." />
          </div>
          {/* Links del menú */}
          <div className="links py-4 text-3xl text-[#333]">
            <ul className="space-y-0.5">
              <li className="flex items-center justify-center p-4 group hover:bg-[#A3A380]">
                <Link to={"/"}>Home</Link>
              </li>
              <li
                className="flex items-center justify-end flex-col py-2 group cursor-pointer"
                onClick={() => setOpenDropDown(!openDropdown)}
              >
                <div className="flex flex-row items-center gap-2 justify-center">
                  Stock <ChevronDown color="#333" size={20} />
                </div>
                {openDropdown && <Menu />}
              </li>
              <li className="flex items-center justify-center p-4 group hover:bg-[#A3A380]">
                <Link to={"/reports"}>Reports</Link>
              </li>
              <li className="flex items-center justify-center p-4 group hover:bg-[#A3A380]">
                <Link to={"/employees"}>Employees</Link>
              </li>
              <li className="flex items-center justify-center p-4 group hover:bg-[#A3A380]">
                <Link to={"/order"}>Order</Link>
              </li>
            </ul>
          </div>
        </div>
        {/* Log Out */}
        <div className="text-3xl text-[#333] flex justify-center items-center hover:bg-[#A3A380] cursor-pointer">
          <span className="flex flex-row items-center gap-2 justify-center p-2 group">
            Log Out <LogOut color="#333" size={20} />
          </span>
        </div>
      </aside>
    </>
  );
};
export default Sidebar;
