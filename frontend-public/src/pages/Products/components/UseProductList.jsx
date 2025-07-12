import useFetchProduct from "./useFetchProducts";
import CardProduct from "./CardProduct";

const ProductList = () => {
  const { products } = useFetchProduct();

  return (
    <div
      className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-4"
    >
      {products.map((product) => (
        <CardProduct
          key={product._id}
          _id={product._id}
          name={product.name}
          description={product.description}
          images={product.images}
          currentPrice={product.currentPrice}
          components={product.components}
          idProductCategory={product.idProductCategory.name}
          useForm={product.useForm}
          recipe={product.recipe}
          variant={product.variant}
        />
      ))}
    </div>
  );
};

export default ProductList;
