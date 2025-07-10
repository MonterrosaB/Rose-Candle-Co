import useFetchProduct from "./UseFetchProduct";
import CardProductList from "./CardProduct";

const ProductList = () => {
  const { products } = useFetchProduct();

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-4">
      {products.map((product) => (
        <CardProductList
          key={product._id}
          _id={product._id} 
          images={product.images[0]}
          name={product.name}
          price={product.currentPrice}
          cost={product.cost}
          size={product.size}
          category={product.category}
          lastUpdated={product.lastUpdated}
          activo={product.activo}
        />
      ))}
    </div>
  );
};

export default ProductList;
