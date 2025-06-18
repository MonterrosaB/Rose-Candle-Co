// Lista de productos
import React from "react";
import ProductCard from "./CardProduct"; // card personalizada

const ListProduct = ({ products, deleteCategory, updateCategories }) => {
  return (
    <div className="">
      <div className="flex flex-wrap gap-4 justify-center mt-5">
        {products?.length===0 && <div className="text-center text-gray-500">No hay datos...</div>}

        {products?.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            deleteCategory={deleteCategory}
            updateCategories={updateCategories}
          />
        ))}
      </div>
    </div>
  );
};

export default ListProduct;