import React from "react";

const LegalNotice = () => {
  return (
    <section className="relative z-[20] bg-[#F2EBD9] rounded-xl p-6 md:p-10">
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
        , es propiedad de Rosé Candle Co., empresa dedicada a la venta de velas
        artesanales y productos de bienestar.
      </p>

      <div className="mb-4">
        <p className="font-semibold">Datos del titular del sitio web:</p>
        <ul className="list-disc list-inside">
          <li>Nombre comercial: Rosé Candle Co.</li>
          <li>
            Correo electrónico:{" "}
            <a
              href="mailto:rosecandle.co@gmail.com"
              className="text-blue-500 underline"
            >
              rosecandle.co@gmail.com
            </a>
          </li>
          <li>Teléfono: 7498-7978</li>
          <li>Domicilio legal: [Agregar dirección]</li>
        </ul>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold">Responsabilidad del contenido:</h3>
        <p>
          Rosé Candle Co. no se responsabiliza por errores técnicos o
          tipográficos en el contenido del sitio.
        </p>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold">Propiedad intelectual:</h3>
        <p>
          Todos los contenidos están protegidos por derechos de autor. Se prohíbe
          su reproducción sin permiso.
        </p>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold">Enlaces a terceros:</h3>
        <p>No nos hacemos responsables del contenido externo enlazado.</p>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold">Modificaciones:</h3>
        <p>
          Podemos modificar este aviso en cualquier momento por razones legales o
          funcionales.
        </p>
      </div>
    </section>
  );
};

export default LegalNotice;
