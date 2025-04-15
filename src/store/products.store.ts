import { createSlice } from "@reduxjs/toolkit";
import { IProductInfo } from "@src/core/interfaces/IProductInfo";

const initialState = {
  productInfo: {
    id: "",
    img: "",
    description: "",
    isFavorite: false,
    isCart: false,
    rate: 0,
    sales: 0,
    tag: 0,
    price: 0,
    discount: 0,
  } as IProductInfo,
  productsInfo: [] as IProductInfo[],
};

const productsSlice = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {
    reset: (state) => {
      state.productInfo.id = "";
      state.productInfo.img = "";
      state.productInfo.description = "";
      state.productInfo.isFavorite = false;
      state.productInfo.isCart = false;
      state.productInfo.rate = 0;
      state.productInfo.sales = 0;
      state.productInfo.tag = 0;
      state.productInfo.price = 0;
      state.productInfo.discount = 0;
    },
  },
});

export const { reset } = productsSlice.actions;
export default productsSlice.reducer;
