import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sideContent: 'chat',
  darkMode: false
}

export const featureSlice = createSlice({
  name: 'featureSlice',
  initialState,
  reducers: {
    setSideContent: (state, action) => {
      state.sideContent = action.payload;
    },

    setDarkMode: (state) => {
      state.darkMode = !state.darkMode
    },
  }
})

export const { setSideContent, setDarkMode } = featureSlice.actions;

export default featureSlice.reducer