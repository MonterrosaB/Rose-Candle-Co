import React, { useEffect, useState } from "react";
import Header from "../../global/components/Header.jsx";
import OrbitedCircle from "../../global/components/OrbitedCircle.jsx";
import AccordionItem from "../TermsAndConditions/Components/AcordeonItems.jsx"
import TermsOfUse from "../TermsAndConditions/Components/TermsOfUse.jsx";
import CookiesPolicy from "../TermsAndConditions/Components/CookiesPolicy.jsx";
import LegalNotice from "../TermsAndConditions/Components/LegalNotice.jsx"
import LegalInformation from "../TermsAndConditions/Components/InformationLegal.jsx"



const TermsAndCondition = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleIndex = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    document.title = "Aviso Legal | Rosé Candle Co.";
  }, []);

  return (
    <div className="relative z-[1] mt-40">
      {/* Fondo orbital detrás */}
      <div className="absolute bottom-80 left-[-160px] scale-[2.5] z-[-1]">
        <OrbitedCircle size="large" />
      </div>
      <div className="absolute bottom-450 left-[-90px] scale-[2.5] z-[-1]">
        <OrbitedCircle size="large" />
      </div>

      {/* Información Legal */}
      <div className="relative z-[1]">
        <section id="infromacion-legal">
          <LegalInformation />
        </section>

        <div className="p-6 max-w-screen-lg mx-auto text-gray-800 space-y-10">
          {/* Aviso Legal */}
          <section id="aviso-legal">
            <LegalNotice />
          </section>
          {/* Política de Cookies */}
          <section id="PolíticadeCookies">
            <CookiesPolicy />
          </section>


          {/* Términos y Condiciones */}
          <section id="TerminosCondiciones">
            <TermsOfUse />
          </section>



          {/* Política de Privacidad */}
          <section id="PoliticadePrivacidad">
            <h2 className="text-2xl font-bold text-center mb-4">Política de Privacidad</h2>
            <div>
              <AccordionItem
                title="1. Información que recopilamos:"
                isOpen={openIndex === 0}
                onToggle={() => toggleIndex(0)}
                content={
                  <ul className="list-disc list-inside space-y-1">
                    <li>Nombre completo</li>
                    <li>Dirección de envío</li>
                    <li>Número de teléfono</li>
                    <li>Correo electrónico</li>
                    <li>Información de pago (procesada de forma segura por plataformas externas)</li>
                  </ul>
                }
              />
              <AccordionItem
                title="2. ¿Para qué usamos tus datos?"
                isOpen={openIndex === 1}
                onToggle={() => toggleIndex(1)}
                content="Procesamos datos para gestionar pedidos, atención al cliente y personalización de la experiencia."
              />
              <AccordionItem
                title="3. Protección de datos:"
                isOpen={openIndex === 2}
                onToggle={() => toggleIndex(2)}
                content="Usamos tecnologías seguras y acceso restringido para proteger tu información."
              />
              <AccordionItem
                title="4. Compartir información con terceros:"
                isOpen={openIndex === 3}
                onToggle={() => toggleIndex(3)}
                content="Solo compartimos información con plataformas de pago o servicios logísticos de confianza."
              />
              <AccordionItem
                title="5. Tus derechos como usuario:"
                isOpen={openIndex === 4}
                onToggle={() => toggleIndex(4)}
                content="Puedes solicitar acceso, corrección o eliminación de tus datos en cualquier momento."
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsAndCondition;
