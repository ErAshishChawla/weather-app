import { createSlice } from "@reduxjs/toolkit";

const darkModeSlice = createSlice({
  name: "darkMode",
  initialState: {
    isDarkMode: false,
  },
  reducers: {
    toggleDarkMode(state, action) {
      state.isDarkMode = action.payload;
    },
  },
});

export const darkModeReducer = darkModeSlice.reducer;
export const { toggleDarkMode } = darkModeSlice.actions;
