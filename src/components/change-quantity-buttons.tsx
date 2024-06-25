import { Minus, Plus } from "lucide-react";
import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
import { useStore } from "../store/store";

type Props = { productId: string };
const ChangeQuantityButtons = ({ productId }: Props) => {
  const { getProductById, decQty, incQty, setTotal } = useStore(
    useShallow((state) => ({
      getProductById: state.getProductById,
      decQty: state.decQty,
      incQty: state.incQty,
      setTotal: state.setTotal,
    }))
  );

  const product = getProductById(productId);

  useEffect(() => {
    const unSub = useStore.subscribe(
      (state) => state.products,
      (products) => {
        setTotal(
          products.reduce((acc, item) => acc + item.price * item.qty, 0)
        );
      },
      { fireImmediately: true }
    );
    return unSub;
  }, [setTotal]);

  return (
    <>
      {" "}
      {product && (
        <div className="flex gap-2 items-center">
          <button
            onClick={() => decQty(product.id)}
            className="flex items-center justify-center w-10 h-10 bg-gray-200 text-gray-600 rounded-full hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
          >
            <Minus />
          </button>
          <p className="text-lg font-medium">{product?.qty}</p>
          <button
            onClick={() => incQty(product.id)}
            className="flex items-center justify-center w-10 h-10 bg-gray-200 text-gray-600 rounded-full hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
          >
            <Plus />
          </button>
        </div>
      )}
    </>
  );
};

export default ChangeQuantityButtons;
