import { useEffect, useState } from "react";
import ProductList from "../Products/components/UseProductList";

const Products = () => {
  const [activeTab, setActiveTab] = useState("general"); // Estado inicial del tab activo

  // Cambiar el título de la pestaña al montar el componente
  useEffect(() => {
    document.title = "Productos | Rosé Candle Co.";
  }, []);

  return (
    <section className="min-h-screen bg-[#F9F7F3] px-6 md:px-12 py-28">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-serif font-semibold mb-8 text-[#444]">
        Productos
        </h1>
        {/* Aquí se renderiza la lista de productos */}
        <ProductList />
      </div>
    </section>
  );
};

export default Products;
