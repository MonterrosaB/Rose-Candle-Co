import React, { useEffect, useState } from "react";
import Header from "../../global/components/Header.jsx";
import OrbitedCircle from "../../global/components/OrbitedCircle.jsx";

const AccordionItem = ({ title, content, isOpen, onToggle }) => {
  return (
    <div className="border border-gray-300 rounded-md overflow-hidden transition-all duration-300">
      <button
        onClick={onToggle}
        className="w-full text-left px-4 py-3 bg-gray-100 hover:bg-gray-200 font-medium flex justify-between items-center"
      >
        <span>{title}</span>
        <span>{isOpen ? "−" : "+"}</span>
      </button>
      <div
        className={`transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-screen opacity-100 py-4 px-4" : "max-h-0 opacity-0 overflow-hidden"
        } bg-white text-gray-700`}
      >
        {typeof content === "string" ? <p>{content}</p> : content}
      </div>
    </div>
  );
};

const TermsAndCondition = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleIndex = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    document.title = "Aviso Legal | Rosé Candle Co.";
  }, []);

  return (
    <div>
      {/* El círculo orbital al fondo */}
      <div className="absolute bottom-0 left-[-32px] scale-[2.5] z-[-1]">
        <OrbitedCircle size="large" />
      </div>

      {/* Información Legal */}
      <Header
        title={
          <div className="max-w-screen-lg mx-auto">
            <span className="font-normal">Información </span>
            <span className="font-bold">Legal</span>
          </div>
        }
        subtitle={
          <div className="max-w-screen-lg mx-auto">
            <span className="font-normal">En </span>
            <span className="font-bold">Rosé Candle Co., </span>
            <span className="font-normal">
              tu confianza es lo más importante para nosotros. Por eso, ponemos a tu
              disposición toda la información legal relacionada con el uso de nuestro sitio web,
              nuestras políticas de privacidad, condiciones de uso y el tratamiento de Cookies.
              Queremos asegurarnos de que tengas una experiencia segura, clara y satisfactoria cada
              vez que nos visitas o realizas una compra. <br />
              Si tienes alguna duda adicional, no dudes en contactarnos.
            </span>
          </div>
        }
      />

      <div className="p-6 max-w-screen-lg mx-auto text-gray-800 space-y-10">
        {/* Aviso Legal */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-center">Aviso Legal</h2>
          <p className="mb-4">
            Este sitio web,{" "}
            <a
              href="https://www.rosecandleco.com"
              className="text-blue-500 underline"
              target="_blank"
            >
              www.rosecandleco.com
            </a>
            , es propiedad de Rosé Candle Co., empresa dedicada a la venta de velas artesanales y productos de bienestar.
          </p>

          <div className="mb-4">
            <p className="font-semibold">Datos del titular del sitio web:</p>
            <ul className="list-disc list-inside">
              <li>Nombre comercial: Rosé Candle Co.</li>
              <li>
                Correo electrónico:{" "}
                <a href="mailto:rosecandle.co@gmail.com" className="text-blue-500 underline">
                  rosecandle.co@gmail.com
                </a>
              </li>
              <li>Teléfono: 7498-7978</li>
              <li>Domicilio legal: [Agregar dirección]</li>
            </ul>
          </div>

          <div className="mb-4">
            <h3 className="font-semibold ">Responsabilidad del contenido:</h3>
            <p>Rosé Candle Co. no se responsabiliza por errores técnicos o tipográficos en el contenido del sitio.</p>
          </div>

          <div className="mb-4">
            <h3 className="font-semibold ">Propiedad intelectual:</h3>
            <p>Todos los contenidos están protegidos por derechos de autor. Se prohíbe su reproducción sin permiso.</p>
          </div>

          <div className="mb-4">
            <h3 className="font-semibold ">Enlaces a terceros:</h3>
            <p>No nos hacemos responsables del contenido externo enlazado.</p>
          </div>

          <div className="mb-4">
            <h3 className="font-semibold ">Modificaciones:</h3>
            <p>Podemos modificar este aviso en cualquier momento por razones legales o funcionales.</p>
          </div>
        </section>

        {/* Política de Cookies */}
        <section>
          <h2 className="text-2xl font-semibold mb-6 text-center">Política de Cookies</h2>
          <p className="mb-8 text-gray-700 text-center">
            Utilizamos cookies para garantizar el mejor funcionamiento del sitio y ofrecer una experiencia personalizada.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#DCE6E0] rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-center">¿Por qué usamos cookies?</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Para que nuestro sitio funcione correctamente.</li>
                <li>Para recordar tus productos favoritos o carrito.</li>
                <li>Para ofrecerte recomendaciones personalizadas.</li>
                <li>Para analizar estadísticas y mejorar nuestros servicios.</li>
              </ul>
            </div>

            <div className="bg-[#E8EAE0] rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-center">Tipos de cookies que utilizamos</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li><strong>Cookies técnicas:</strong> Acceso y funciones esenciales.</li>
                <li><strong>Cookies de análisis:</strong> Mejora de experiencia y comprensión del uso del sitio.</li>
                <li><strong>Cookies de personalización:</strong> Personalización del contenido según tus intereses.</li>
                <li><strong>Cookies publicitarias:</strong> Anuncios relevantes dentro y fuera del sitio.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Términos y Condiciones */}
        <section>
          <h2 className="text-2xl font-semibold mb-6 text-center">Términos y Condiciones de Uso</h2>
          <p className="mb-6">
            El uso del sitio{" "}
            <a
              href="https://www.rosecandleco.com"
              className="text-blue-500 underline"
              target="_blank"
            >
              www.rosecandleco.com
            </a>{" "}
            implica la aceptación de los siguientes términos y condiciones.
          </p>

          <ol className="list-decimal list-inside space-y-4 text-gray-700">
            <li><strong>Uso del sitio web:</strong> Solo para fines legales relacionados con el bienestar.</li>
            <li><strong>Propiedad intelectual:</strong> Todos los contenidos son propiedad de Rosé Candle Co.</li>
            <li><strong>Compra y pagos:</strong> Sujeto a disponibilidad. Pagos seguros.</li>
            <li><strong>Envíos:</strong> De 2 a 5 días hábiles nacionales.</li>
            <li><strong>Cambios y devoluciones:</strong> Dentro de 7 días si el producto está sin uso. No se aceptan devoluciones personalizadas.</li>
            <li><strong>Responsabilidad:</strong> No nos responsabilizamos por mal uso de productos.</li>
          </ol>
        </section>

        {/* Política de Privacidad */}
        <section>
          <h2 className="text-2xl font-bold text-center mb-4">Política de Privacidad</h2>

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
        </section>
      </div>
    </div>
  );
};

export default TermsAndCondition;
