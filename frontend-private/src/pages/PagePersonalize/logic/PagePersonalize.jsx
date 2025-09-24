import { useEffect, useState } from "react";
import PrincipalDiv from "../../../global/components/PrincipalDiv";
import TitleH1 from "../../../global/components/TitleH1";
import Input from "../components/Input";
import Button from "../components/Button";
import Div from "../components/Div";
import { usePersonalize } from "../hooks/usePersonalize"; // Importar el hook

const PagePersonalize = () => {
  useEffect(() => {
    document.title = "Personalizar | Rosé Candle Co.";
  }, []);

  const {
    register,
    handleSubmit,
    updateSettings,
    isSubmitting,
    reset,
    setValue,
  } = usePersonalize();

  const [bannerImage, setBannerImage] = useState(null);
  const [emailBody, setEmailBody] = useState("");

  const onSubmit = async (data) => {
    // Si se seleccionó una nueva imagen para el banner, la agregamos
    const updatedData = { ...data };
    if (bannerImage) {
      updatedData.bannerImage = bannerImage;
    }
    if (emailBody) {
      updatedData.emailBody = emailBody;
    }

    // Actualizamos la configuración completa (Marquee, Banner, Email)
    await updateSettings(updatedData);
  };

  // Manejador para la carga de la imagen del banner
  const handleBannerImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBannerImage(file);
    }
  };

  // Manejador para actualizar el cuerpo del correo
  const handleEmailBodyChange = (e) => {
    setEmailBody(e.target.value);
  };

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
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              label="Texto del marquee"
              placeholder="Disfruta nuestras velas de temporada"
              {...register("marquee")}
            />
            <Button className="mt-4" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Guardando..." : "Guardar Marquee"}
            </Button>
          </form>
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
              onChange={handleBannerImageChange}
              className="block w-full text-sm border border-gray-300 rounded-lg cursor-pointer p-2"
            />
          </div>
          <Input
            label="Título del banner"
            placeholder="¡Bienvenidos a Rosé Candle Co!"
            {...register("bannerTitle")}
          />
          <Input
            label="Subtítulo del banner"
            placeholder="La mejor experiencia aromática"
            {...register("bannerSubtitle")}
          />
          <Button className="mt-4" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Guardando..." : "Guardar Banner"}
          </Button>
        </Div>
      </div>

      {/* Correos */}
      <Div title="Correos Electrónicos" bgColor="white" textColor="#1f2937" className="mt-6">
        <Input
          label="Asunto del Correo"
          placeholder="¡Nueva Promoción! | Rosé Candle Co."
          {...register("emailSubject")}
        />
        <div className="mt-4">
          <label className="block text-sm font-medium mb-1">
            Cuerpo del Correo
          </label>
          <textarea
            value={emailBody}
            onChange={handleEmailBodyChange}
            placeholder="Disfruta nuestra nueva promoción exclusiva..."
            className="w-full border border-gray-300 rounded-lg p-2 min-h-[120px]"
          />
        </div>
        <Button className="mt-4" disabled={isSubmitting}>
          {isSubmitting ? "Guardando..." : "Guardar Correo"}
        </Button>
      </Div>

      {/* Guardar Todo */}
      <div className="flex justify-end mt-8">
        <Button
          variant="success"
          className="px-6 py-3"
          onClick={handleSubmit(onSubmit)} // Asegura que 'onSubmit' maneja todos los cambios
        >
          Guardar Todo
        </Button>
      </div>
    </PrincipalDiv>
  );
};

export default PagePersonalize;
