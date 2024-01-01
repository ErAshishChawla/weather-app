import { createSlice } from "@reduxjs/toolkit";
import { store } from "../index";

const userLocationSlice = createSlice({
  name: "userLocation",
  initialState: {
    locationMode: null,
    userCoordinates: null,
    userCityData: null,
    locationTime: null,
  },
  reducers: {
    updateLocationMode(state, action) {
      const { locationMode, userCoordinates, userCityData } = action.payload;
      state.locationMode = locationMode;
      state.userCoordinates = userCoordinates;
      state.userCityData = userCityData;
    },
    updateLocationTime(state, action) {
      state.locationTime = action.payload;
    },
  },
});

export const {
  updateUserCityData,
  updateUserCoordinates,
  updateLocationMode,
  updateLocationTime,
} = userLocationSlice.actions;

export const userLocationReducer = userLocationSlice.reducer;
