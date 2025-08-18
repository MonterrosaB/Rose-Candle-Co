import { Link } from "react-router-dom";
import { Flame } from "lucide-react";

const Page404 = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-[#F9F7F3]-50 text-center px-4">
            {/* Icono de vela */}
            <div className="relative flex items-center justify-center mb-6">
                <div className="w-16 h-28 bg-yellow-100 rounded-lg shadow-inner relative">
                    {/* Pabilo */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-6 bg-neutral-700"></div>
                    {/* Flama apagada */}
                    <Flame className="w-8 h-8 text-orange-400 absolute -top-7 left-1/2 -translate-x-1/2 opacity-30" />
                </div>
            </div>

            {/* Texto */}
            <h1 className="text-6xl font-bold text-neutral-800 mb-2">404</h1>
            <p className="text-lg text-neutral-600 mb-6">
                Parece que esta vela se apagó... <br /> No encontramos la página que buscas.
            </p>

            {/* Botón volver */}
            <Link
                to="/"
                className="px-6 py-2 bg-black text-white rounded-xl shadow-md hover:bg-neutral-800 transition"
            >
                Volver al inicio
            </Link>
        </div>
    );
};

export default Page404;
