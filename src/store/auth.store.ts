import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  Name: "",
  email: "",
  avatar: "",
  token: "",
  isLoginOk: false,
  isAdm: false,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    getToken: (state, action: PayloadAction<{ token: string }>) => {
      state.token = action.payload.token;
    },
    setUserData: (
      state,
      action: PayloadAction<{ name: string; email: string; avatar: string }>
    ) => {
      (state.Name = action.payload.name),
        (state.email = action.payload.email),
        (state.avatar = action.payload.avatar);
    },
    showMenuBar: (state) => {
      state.isLoginOk = true;
    },
    hideMenuBar: (state) => {
      state.isLoginOk = false;
    },
    setIsAdmOk: (state) => {
      state.isAdm = true;
    },
  },
});

export const { getToken, setUserData, showMenuBar, hideMenuBar } = userSlice.actions;
export default userSlice.reducer;
