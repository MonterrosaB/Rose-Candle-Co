import { Link } from "react-router";


const DropDown = () => {
    return (
        <>
            <ul className="py-2 text-xl w-full">
                <li className="flex items-center justify-center py-2 group hover:bg-[#A3A380]"><Link to={"/materials"}	>Materials</Link></li>
                <li className="flex items-center justify-center py-2 group hover:bg-[#A3A380]"><Link to={"/record"}	>Record</Link></li>
                <li className="flex items-center justify-center py-2 group hover:bg-[#A3A380]"><Link to={"/products"}	>Products</Link></li>
                <li className="flex items-center justify-center py-2 group hover:bg-[#A3A380]"><Link to={"/others"}	>Others</Link></li>
            </ul>
        </>
    )
}
export default DropDown;