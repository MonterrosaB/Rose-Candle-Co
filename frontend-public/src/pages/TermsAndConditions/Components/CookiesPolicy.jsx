import React from "react";

const CookiesPolicy = () => {
  return (
    <section className="relative z-[20]">
        <section className="relative z-[20] bg-[#F2EBD9] rounded-xl p-6 md:p-10 max-w-[980px] mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Política de Cookies
      </h2>
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

        <div className="bg-[#DCE6E0] rounded-lg p-6">
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
    </section>
  );
};

export default CookiesPolicy;
