import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "@src/core/interfaces/IProduct";
import { loadStorage, saveStorage, STORAGE_TYPE } from "@src/modules/utils";

const initialState = {
  products: [] as IProduct[],
};

const wishListSlice = createSlice({
  name: "wishList",
  initialState: initialState,
  reducers: {
    getWishListItemsFromLocalStorage: (state) => {
      const products = loadStorage(STORAGE_TYPE.WISHLIST) || [];
      state.products = products;
    },
    clearWishList: (state) => {
      state.products = [];
    },
    saveWishListItemsToLocalStorage: (state, action: PayloadAction<IProduct>) => {
      const isProductExistOnCart = state.products.some(
        (product) => product.id == action.payload.id
      );
      if (!isProductExistOnCart) {
        state.products.push({ ...action.payload, qty: 1 });
        saveStorage(STORAGE_TYPE.WISHLIST, state.products);
      }
    },
    removeWishListItem: (state, action: PayloadAction<IProduct>) => {
      const productIdx = state.products.findIndex((product) => action.payload.id == product.id);
      state.products.splice(productIdx, 1);
      saveStorage(STORAGE_TYPE.WISHLIST, state.products);
    },
  },
});

export const {
  getWishListItemsFromLocalStorage,
  clearWishList,
  saveWishListItemsToLocalStorage,
  removeWishListItem,
} = wishListSlice.actions;
export default wishListSlice.reducer;
