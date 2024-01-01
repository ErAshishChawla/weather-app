import { configureStore } from "@reduxjs/toolkit";
import { searchReducer } from "./slice/searchSlice";
import { userLocationReducer } from "./slice/userLocationSlice";
import { darkModeReducer, toggleDarkMode } from "./slice/darkModeSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { weatherApi } from "./apis/weatherApi";
import { timezoneLocationApi } from "./apis/timezoneLocationApi";

const store = configureStore({
  reducer: {
    search: searchReducer,
    darkMode: darkModeReducer,
    weather: weatherApi.reducer,
    userLocation: userLocationReducer,
    timeZoneLocation: timezoneLocationApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(weatherApi.middleware)
      .concat(timezoneLocationApi.middleware);
  },
});

setupListeners(store.dispatch);

export { store, toggleDarkMode };

export * from "./slice/searchSlice";
export * from "./slice/userLocationSlice";
export * from "./selectors/userDataSelector";
export * from "./apis/weatherApi";
export * from "./apis/timezoneLocationApi";
