import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  token: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState: INITIAL_STATE,
  reducers: {
    setToken: (
      state,
      { payload: { token } }: PayloadAction<{ token: string | any }>
    ) => {
      state.token = token;
    },
    logout: (state, action) => {
      state.token = "";
    },
  },
});

export const { setToken, logout } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentToken = (state: any) => state.auth.token;
