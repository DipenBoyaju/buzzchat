import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  socketConnection: null,
}

export const socketSlice = createSlice({
  name: 'socketSlice',
  initialState,
  reducers: {
    setSocketConnection: (state, action) => {
      state.socketConnection = action.payload;
    },
    removeSocketConnection: (state) => {
      state.socketConnection = null;
    },
  }
})

export const { setSocketConnection, removeSocketConnection } = socketSlice.actions;

export default socketSlice.reducer