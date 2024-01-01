import { createSelector } from "@reduxjs/toolkit";

const selLocationMode = (state) => {
  return state.userLocation.locationMode;
};

const selUserCityData = (state) => {
  return state.userLocation.userCityData;
};

const selUserCoordinates = (state) => {
  return state.userLocation.userCoordinates;
};

const userDataSelector = createSelector(
  [selUserCityData, selUserCoordinates, selLocationMode],
  (userCityData, userCoordinates, locationMode) => {
    return {
      userCityData,
      userCoordinates,
      locationMode,
    };
  }
);

export { userDataSelector };
