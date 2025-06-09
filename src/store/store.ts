import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@src/store/auth.store";
import cartReducer from "@src/store/cart.store";
import wishListReducer from "@src/store/wishList.store";

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    wishList: wishListReducer,
  },
});

export type AppState = ReturnType<typeof store.getState>;
export { store };
