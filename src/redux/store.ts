import { configureStore } from "@reduxjs/toolkit";

import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from "./features/authSlice";
import { Api } from "./services/api";

export const store: any = configureStore({
  reducer: {
    [Api.reducerPath]: Api.reducer,
    auth: authReducer,
  },

  middleware: (gDM) => gDM().concat(Api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
