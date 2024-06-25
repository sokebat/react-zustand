import { create } from "zustand";
import { devtools, persist, subscribeWithSelector } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { createCartSlice } from "./cart-slice";
import { Store } from "../types/store";

export const useStore = create<Store>()(
  devtools(
    persist(
      subscribeWithSelector(
        immer((...a) => ({
          ...createCartSlice(...a),
        }))
      ),
      {
        name: "local-storage",
      }
    )
  )
);
