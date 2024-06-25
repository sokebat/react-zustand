import { StateCreator } from "zustand";
import { ProductType } from "../types/data";
export type CartProduct = ProductType & { qty: number };

type CartState = {
  products: CartProduct[];
  total: number;
};

type CartActions = {
  addProduct: (product:ProductType) => void;
  removeProduct: (productId: string) => void;
  incQty: (productId: string) => void;
  decQty: (productId: string) => void;
  getProductById: (productId: string) => CartProduct | undefined;
  setTotal: (total: number) => void;
  reset: () => void;
};

export type CartSlice = CartState & CartActions;

const initialState: CartState = {
  products: [],
  total: 0,
};
/**  
 * 
 * 
 * [['zustand/immer', never]],
	[],
 */
export const createCartSlice: StateCreator<CartSlice, [], [], CartSlice> = (
  set,
  get
) => {
  return {
    ...initialState,
    addProduct: (product) =>
      set((state) => {
        const existingProduct = state.products.find((p) => p.id === product.id);
        if (existingProduct) {
          return {
            products: state.products.map((p) =>
              p.id === product.id ? { ...p, qty: p.qty + 1 } : p
            ),
            total: state.total + product.price,
          };
        } else {
          return {
            products: [...state.products, { ...product, qty: 1 }],
            total: state.total + product.price,
          };
        }
      }),
    removeProduct: (productId) =>
      set((state) => {
        const productToRemove = state.products.find((p) => p.id === productId);
        if (!productToRemove) return state;

        return {
          products: state.products.filter(
            (product) => product.id !== productId
          ),
          total: state.total - productToRemove.price * productToRemove.qty,
        };
      }),
    incQty: (productId) =>
      set((state) => {
        const foundProduct = state.products.find(
          (product) => product.id === productId
        );
        if (!foundProduct) return state;

        return {
          products: state.products.map((product) =>
            product.id === productId
              ? { ...product, qty: product.qty + 1 }
              : product
          ),
          total: state.total + foundProduct.price,
        };
      }),
    decQty: (productId) =>
      set((state) => {
        const foundProduct = state.products.find(
          (product) => product.id === productId
        );
        if (!foundProduct) return state;

        if (foundProduct.qty === 1) {
          return {
            products: state.products.filter(
              (product) => product.id !== productId
            ),
            total: state.total - foundProduct.price,
          };
        } else {
          return {
            products: state.products.map((product) =>
              product.id === productId
                ? { ...product, qty: product.qty - 1 }
                : product
            ),
            total: state.total - foundProduct.price,
          };
        }
      }),
    getProductById: (productId) =>
      get().products.find((product) => product.id === productId),
    setTotal: (total) => set(() => ({ total })),
    reset: () => set(() => initialState),
  };
};
