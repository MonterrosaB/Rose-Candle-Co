import React from "react";

const TermsOfUse = () => {
  return (
    <section className="relative z-[20]">
        <section className="relative z-[20] bg-[#F2EBD9] rounded-xl p-6 md:p-10 max-w-[980px] mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Términos y Condiciones de Uso
      </h2>
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
        <li>
          <strong>Uso del sitio web:</strong> Solo para fines legales
          relacionados con el bienestar.
        </li>
        <li>
          <strong>Propiedad intelectual:</strong> Todos los contenidos son
          propiedad de Rosé Candle Co.
        </li>
        <li>
          <strong>Compra y pagos:</strong> Sujeto a disponibilidad. Pagos
          seguros.
        </li>
        <li>
          <strong>Envíos:</strong> De 2 a 5 días hábiles nacionales.
        </li>
        <li>
          <strong>Cambios y devoluciones:</strong> Dentro de 7 días si el
          producto está sin uso. No se aceptan devoluciones personalizadas.
        </li>
        <li>
          <strong>Responsabilidad:</strong> No nos responsabilizamos por mal
          uso de productos.
        </li>
      </ol>
    </section>
    </section>
  );
};

export default TermsOfUse;
