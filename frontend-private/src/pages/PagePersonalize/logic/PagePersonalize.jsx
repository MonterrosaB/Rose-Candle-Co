import { useEffect, useState } from "react";
import PrincipalDiv from "../../../global/components/PrincipalDiv";
import TitleH1 from "../../../global/components/TitleH1";
import Input from "../components/Input";
import Button from "../components/Button";
import Div from "../components/Div";
import { usePersonalize } from "../hooks/usePersonalize";

const PagePersonalize = () => {
  useEffect(() => {
    document.title = "Personalizar | Rosé Candle Co.";
  }, []);

  const {
    register,
    handleSubmit,
    updateSettings,
    isSubmitting,
  } = usePersonalize();

  const [bannerImage, setBannerImage] = useState(null);
  const [emailBody, setEmailBody] = useState("");

  const onSubmit = async (data) => {
    const updatedData = { ...data };
    if (bannerImage) updatedData.bannerImage = bannerImage;
    if (emailBody) updatedData.emailBody = emailBody;

    await updateSettings(updatedData);
  };

  const handleBannerImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setBannerImage(file);
  };

  const handleEmailBodyChange = (e) => {
    setEmailBody(e.target.value);
  };

  return (
    <PrincipalDiv>
      <TitleH1 title="Personalizar" />

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
          description="Imagen que aparece en la parte superior del sitio."
          bgColor="white"
        >
          <form onSubmit={handleSubmit(onSubmit)}>
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

            {/* Mini previsualización */}
            {bannerImage && (
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-1">Previsualización:</p>
                <img
                  src={URL.createObjectURL(bannerImage)}
                  alt="Vista previa del banner"
                  className="w-full max-h-[250px] object-cover rounded-md shadow-md border"
                />
              </div>
            )}

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Guardando..." : "Guardar Banner"}
            </Button>
          </form>
        </Div>
      </div>

      {/* Correos */}
      <Div
        title="Correos Electrónicos"
        bgColor="white"
        textColor="#1f2937"
        className="mt-6"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
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
          <Button className="mt-4" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Guardando..." : "Guardar Correo"}
          </Button>
        </form>
      </Div>

      {/* Guardar Todo */}
      <div className="flex justify-end mt-8">
        <Button
          variant="success"
          className="px-6 py-3"
          onClick={handleSubmit(onSubmit)}
        >
          Guardar Todo
        </Button>
      </div>
    </PrincipalDiv>
  );
};

export default PagePersonalize;
