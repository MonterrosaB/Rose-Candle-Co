import useDetailProduct from "./components/UseDetailProduct";
import CardProductDetail from "./components/CardProductDetail";

const ProductDetail = () => {
  const { product, loading } = useDetailProduct();

  if (loading) return <h1 className="text-center mt-6">Cargando...</h1>;
  if (!product) return <h1 className="text-center mt-6">Producto no encontrado</h1>;

  return (
    <section className="min-h-screen px-6 md:px-12 py-28">
      <div className="max-w-6xl mx-auto">
        {/* Aquí se renderiza el producto */}
        <CardProductDetail product={product} />
      </div>
    </section>
  );
};

export default ProductDetail;
