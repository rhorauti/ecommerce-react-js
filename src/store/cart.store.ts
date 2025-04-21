import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  visible: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    showCart: (state, action: PayloadAction<boolean>) => {
      state.visible = action.payload;
    },
  },
});

export const { showCart } = cartSlice.actions;
export default cartSlice.reducer;
