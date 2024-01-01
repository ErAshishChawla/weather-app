import { createSlice } from "@reduxjs/toolkit";
import { updateLocationMode } from "./userLocationSlice";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    isTyping: false,
    isLocationSet: false,
    searchLocation: "",
  },
  reducers: {
    updateSearchTerm(state, action) {
      state.searchLocation = action.payload;
      state.isTyping = true;
    },

    updateIsTyping(state, action) {
      state.isTyping = action.payload;
    },

    updateIsLocationSet(state, action) {
      state.isLocationSet = action.payload;
    },
  },

  extraReducers(builder) {
    builder.addCase(updateLocationMode, (state, action) => {
      if (action.payload.locationMode === "custom") {
        state.isTyping = false;
        state.searchLocation = "";
        state.isLocationSet = false;
      }
      return state;
    });
  },
});

export const searchReducer = searchSlice.reducer;
export const { updateSearchTerm, updateIsTyping, updateIsLocationSet } =
  searchSlice.actions;
