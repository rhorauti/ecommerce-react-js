import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showCart: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    activateCart: () => {
      const cart = document.getElementById("sidebar-cart");
      console.log("cart", cart);
      if (cart) {
        cart.style.right = "0rem";
      }
    },
    closeCart: () => {
      const cart = document.getElementById("sidebar-cart");
      if (cart) {
        cart.style.right = "-24rem";
      }
    },
  },
});

export const { activateCart, closeCart } = cartSlice.actions;
export default cartSlice.reducer;
