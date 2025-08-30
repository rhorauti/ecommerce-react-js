import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@store/auth.store";
import cartReducer from "@store/cart.store";
import wishListReducer from "@store/wishList.store";

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    wishList: wishListReducer,
  },
});

export type AppState = ReturnType<typeof store.getState>;
export { store };
