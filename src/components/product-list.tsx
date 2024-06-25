import { ProductInfo as products } from "../data/product-data";
import ProductCard from "./product-card";

const ProductList = () => {
  return (
    <div className=" container mx-auto px-4 sm:px-6 lg:px-3 py-12">
      <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-12">
        Products List
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-4 gap-8 place-content-center place-items-center">
        {products.map((product) => {
          console.log(product);
          return <ProductCard key={product.id} product={product} />;
        })}
      </div>
    </div>
  );
};

export default ProductList;
