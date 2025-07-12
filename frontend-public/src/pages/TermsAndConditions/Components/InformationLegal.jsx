import React from "react";

const LegalInformation = () => {
  return (
<section className="relative z-[20] bg-[#F2EBD9] rounded-xl p-6 md:p-10 max-w-[980px] mx-auto mt-10">

      <div className="text-center mb-4">
        <h2 className="text-2xl font-semibold">Información <span className="font-bold">Legal</span></h2>
      </div>

      <div className="text-justify">
        <span className="font-normal">En </span>
        <span className="font-bold">Rosé Candle Co., </span>
        <span className="font-normal">
          tu confianza es lo más importante para nosotros. Por eso, ponemos a tu
          disposición toda la información legal relacionada con el uso de nuestro sitio web,
          nuestras políticas de privacidad, condiciones de uso y el tratamiento de Cookies.
          Queremos asegurarnos de que tengas una experiencia segura, clara y satisfactoria cada
          vez que nos visitas o realizas una compra. <br /><br />
          Si tienes alguna duda adicional, no dudes en contactarnos.
        </span>
      </div>
    </section>
  );
};

export default LegalInformation;
