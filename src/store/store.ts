import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@src/store/auth.store";
import purchasingReducer from "@src/store/purchasing.store";
import cartReducer from "@src/store/cart.store";

const store = configureStore({
  reducer: {
    user: userReducer,
    purchasing: purchasingReducer,
    cart: cartReducer,
  },
});

export type AppState = ReturnType<typeof store.getState>;
export { store };
