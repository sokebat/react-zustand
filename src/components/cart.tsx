import { CircleX, ShoppingCart, Trash2 } from "lucide-react";
import { useShallow } from "zustand/react/shallow";
import { useStore } from "../store/store";
import ChangeQuantityButtons from "./change-quantity-buttons";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

const Cart = () => {
  const { reset, products, removeProduct, total } = useStore(
    useShallow((state) => ({
      reset: state.reset,
      products: state.products,
      removeProduct: state.removeProduct,
      total: state.total,
      // address: state.address,
    }))
  );
  console.log(products);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary" size="icon">
          <ShoppingCart />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="overflow-y-scroll space-y-2 w-96 rounded-xl bg-gray-100">
        <div className="flex gap-2 justify-between text-lg items-center">
          <h1>Cart:</h1>
          <Button onClick={reset} variant="destructive" size="icon">
            <CircleX />
          </Button>
        </div>
        <div className="space-y-2">
          {products.map((product) => (
            <Card
              className="flex flex-col bg-white rounded-xl"
              key={product.id}
            >
              <CardHeader className="flex flex-row items-center justify-between gap-2">
                <CardTitle>{product.title}</CardTitle>
                <Button
                  onClick={() => removeProduct(product.id)}
                  size="icon"
                  variant="destructive"
                >
                  <Trash2 color="red" />
                </Button>
              </CardHeader>
              <CardContent className="pt-1">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-40 object-cover object-center rounded-xl mb-2   "
                />
                <div className="flex justify-between gap-y-2">
                  <p className="inline-block px-3 py-1 text-sm font-semibold text-green-900 bg-green-100 rounded-full">
                    {product.category}
                  </p>
                  <p className="inline-block px-3 py-1 text-sm font-semibold text-green-900 bg-green-100 rounded-full">
                    ${product.price}
                  </p>
                </div>
                <p className="line-clamp-2">{product.description}</p>
              </CardContent>
              <CardFooter>
                <ChangeQuantityButtons productId={product.id} />
              </CardFooter>
            </Card>
          ))}
        </div>
        <p>Total: {total}$</p>
      </PopoverContent>
    </Popover>
  );
};

export default Cart;
