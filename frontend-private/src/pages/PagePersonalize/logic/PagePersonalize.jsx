import { useEffect } from "react";
import PrincipalDiv from "../../../global/components/PrincipalDiv";
import TitleH1 from "../../../global/components/TitleH1";
import Input from "../components/Input";
import Button from "../components/Button";
import Div from "../components/Div";

const PagePersonalize = () => {
    useEffect(() => {
        document.title = "Personalizar | Rosé Candle Co.";
    }, []);

    return (
        <PrincipalDiv>
            <TitleH1 title="Personalizar" />

            {/* Grid superior */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                {/* Marquee */}
                <Div
                    title="Marquee"
                    description="Texto en movimiento que se muestra en la parte superior de la web."
                    bgColor="white"
                >
                    <Input
                        label="Texto del marquee"
                        placeholder="Disfruta nuestras velas de temporada"
                    />
                    <Button className="mt-4">Guardar Marquee</Button>
                </Div>

                {/* Banner */}
                <Div
                    title="Banner Principal"
                    description="Imagen principal de la web."
                    bgColor="white"
                >
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">
                            Imagen del banner
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            className="block w-full text-sm border border-gray-300 rounded-lg cursor-pointer p-2"
                        />
                    </div>
                    <Button className="mt-4">Guardar Banner</Button>
                </Div>
            </div>

            {/* Correos */}
            <Div title="Correos Electrónicos" bgColor="white" textColor="#1f2937" className="mt-6">
                <Input
                    label="Asunto del Correo"
                    placeholder="¡Nueva Promoción! | Rosé Candle Co."
                />
                <div className="mt-4">
                    <label className="block text-sm font-medium mb-1">
                        Cuerpo del Correo
                    </label>
                    <textarea
                        placeholder="Disfruta nuestra nueva promoción exclusiva..."
                        className="w-full border border-gray-300 rounded-lg p-2 min-h-[120px]"
                    />
                </div>
                <Button className="mt-4">Guardar Correo</Button>
            </Div>

            {/* Guardar Todo */}
            <div className="flex justify-end mt-8">
                <Button variant="success" className="px-6 py-3">
                    Guardar Todo
                </Button>
            </div>
        </PrincipalDiv>
    );
};

export default PagePersonalize;
