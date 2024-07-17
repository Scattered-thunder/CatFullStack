import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SessionState {
  username: string | null;
  islogged: boolean;
}

const initialState: SessionState = {
  username: null,
  islogged: false,
};

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    SetSessionData: (state, action: PayloadAction<{ username: string }>) => {
      state.username = action.payload.username;
      state.islogged = true;
    },
    ClearSessionData: (state) => {
      state.username = null;
      state.islogged = false;
    },
  },
});

export const { SetSessionData, ClearSessionData } = sessionSlice.actions;
export default sessionSlice.reducer;
