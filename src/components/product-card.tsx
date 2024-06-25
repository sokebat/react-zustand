import { useStore } from "../store/store";
import { ProductType } from "../types/data";
import ChangeQuantityButtons from "./change-quantity-buttons";

interface product {
  product: ProductType & { qty?: number };
}
const ProductCard = ({ product }: product) => {
  const addProduct = useStore((state) => state.addProduct);
  const cartProducts = useStore((state) => state.products);

  return (
    <div className="overflow-hidden shadow-lg rounded-t-xl  max-w-80  bg-white transform transition duration-300 hover:scale-105 hover:shadow-2xl">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-52 object-cover object-center  "
      />
      <div className="px-4 py-2  ">
        <h2 className="text-xl text-start font-semibold text-gray-900 mb-2 ">
          {product.title}
        </h2>
        <div className="text-gray-500 mb-2 flex justify-between">
          <p>${product.price}</p>
          {product.inStock ? (
            <span className="inline-block px-3 py-1 text-sm font-semibold text-green-900 bg-green-100 rounded-full">
              In Stock
            </span>
          ) : (
            <span className="inline-block px-3 py-1 text-sm font-semibold text-red-900 bg-red-100 rounded-full">
              Out of Stock
            </span>
          )}
        </div>
        <p className="text-gray-600 text-start sm:text-justify my-3 line-clamp-3 ">
          {product.description}
        </p>

        {cartProducts.find((item) => item.id === product.id) ? (
          <ChangeQuantityButtons productId={product.id} />
        ) : (
          <button
            onClick={() => {
              if (product.inStock) {
                addProduct(product);
              } else {
                alert("It will be availabe soon");
              }
            }}
            className="mt-4 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
            role="button"
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
