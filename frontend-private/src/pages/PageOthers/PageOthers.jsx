import { Link } from "react-router";
const PageOthers = () => {
    return (
        <>
            <div className="flex justify-center items-center h-dvh">
                <div className="grid grid-cols-2 gap-8 text-2xl font-semibold">
                    <Link to={"/others/categories"}
                        className="bg-[#C2A878] h-40 flex justify-center items-center w-md cursor-pointer rounded shadow-md"
                    >Categorías</Link>
                    <Link to={"/others/supplies"}
                        className="bg-[#C2A878] h-40 flex justify-center items-center w-md cursor-pointer rounded shadow-md"
                    >Proveedores</Link>
                    <Link to={"/others/colections"}
                        className="bg-[#C2A878] h-40 flex justify-center items-center w-md cursor-pointer rounded shadow-md"
                    >Colecciones</Link>
                    <Link to={"/others/categories-materia"}
                        className="bg-[#C2A878] h-40 flex justify-center items-center w-md cursor-pointer rounded shadow-md"
                    >Categorías Materia</Link>
                </div>
            </div>
        </>
    );
};
export default PageOthers;
