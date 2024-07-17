import { configureStore } from "@reduxjs/toolkit";
import sessionReducer from "./slices/sessionSlice";
import clientReducer from "./slices/clientSlice";
import catReducer from "./slices/catSlice";

const store = configureStore({
  reducer: {
    session: sessionReducer,
    client: clientReducer,
    cat: catReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
