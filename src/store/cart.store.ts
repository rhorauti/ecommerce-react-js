import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "@src/core/interfaces/IProduct";
import { loadStorage, saveStorage, STORAGE_TYPE } from "@src/modules/utils";

const initialState = {
  visible: false,
  products: [] as IProduct[],
  totalPrice: 0,
};

const calculateTotalPrice = (products: IProduct[]) => {
  return products.reduce((acc, product) => acc + product.price * product.qty, 0);
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    getCartItemsFromLocalStorage: (state) => {
      const products = loadStorage(STORAGE_TYPE.CARRINHO) || [];
      state.products = products;
      state.totalPrice = calculateTotalPrice(state.products);
    },
    clearCart: (state) => {
      state.products = [];
      state.visible = false;
      state.totalPrice = calculateTotalPrice(state.products);
    },
    showCart: (state, action: PayloadAction<boolean>) => {
      state.visible = action.payload;
    },
    saveCartItemToLocalStorage: (state, action: PayloadAction<IProduct>) => {
      const isProductExistOnCart = state.products.some(
        (product) => product.id == action.payload.id
      );
      if (!isProductExistOnCart) {
        state.products.push({ ...action.payload, qty: 1 });
        saveStorage(STORAGE_TYPE.CARRINHO, state.products);
        state.totalPrice = calculateTotalPrice(state.products);
      }
    },
    saveAllWishListItemsToCartLocalStorage: (state, action: PayloadAction<IProduct[]>) => {
      action.payload.forEach((wishListProduct) => {
        const exists = state.products.some((cartProduct) => cartProduct.id == wishListProduct.id);
        if (!exists) {
          state.products.push({ ...wishListProduct, qty: 1 });
        }
      });
      saveStorage(STORAGE_TYPE.CARRINHO, state.products);
      state.totalPrice = calculateTotalPrice(state.products);
    },
    removeCartItem: (state, action: PayloadAction<IProduct>) => {
      const productIdx = state.products.findIndex((product) => action.payload.id == product.id);
      state.products.splice(productIdx, 1);
      saveStorage(STORAGE_TYPE.CARRINHO, state.products);
      state.totalPrice = calculateTotalPrice(state.products);
    },
    onIncreaseQty: (state, action: PayloadAction<IProduct>) => {
      const idx = state.products.findIndex((p) => p.id == action.payload.id);
      if (state.products[idx].qty < 1) {
        state.products[idx].qty = 1;
      } else {
        state.products[idx].qty = state.products[idx].qty + 1;
      }
      state.totalPrice = calculateTotalPrice(state.products);
    },
    onDecreaseQty: (state, action: PayloadAction<IProduct>) => {
      const idx = state.products.findIndex((p) => p.id == action.payload.id);
      if (state.products[idx].qty < 1) {
        state.products[idx].qty = 1;
      } else {
        state.products[idx].qty = state.products[idx].qty - 1;
        if (state.products[idx].qty < 1) {
          state.products[idx].qty = 1;
        }
      }
      state.totalPrice = calculateTotalPrice(state.products);
    },
    onChangeQty: (state, action: PayloadAction<{ product: IProduct; qty: number }>) => {
      const { product, qty } = action.payload;
      const idx = state.products.findIndex((p) => p.id == product.id);
      if ((state.products[idx].qty ?? 0) < 1) {
        state.products[idx].qty = 1;
      } else {
        state.products[idx].qty = qty;
      }
      state.totalPrice = calculateTotalPrice(state.products);
    },
  },
});

export const {
  showCart,
  getCartItemsFromLocalStorage,
  clearCart,
  saveCartItemToLocalStorage,
  saveAllWishListItemsToCartLocalStorage,
  removeCartItem,
  onIncreaseQty,
  onDecreaseQty,
  onChangeQty,
} = cartSlice.actions;
export default cartSlice.reducer;
