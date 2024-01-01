import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// DEV ONLY
const pause = (duration) => {
  return new Promise(
    (resolve) => {
      setTimeout(resolve, duration);
    },
    (reject) => {
      console.log("Pause function Failed");
    }
  );
};

const weatherApi = createApi({
  reducerPath: "weather",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://api.weatherapi.com/v1",
    fetchFn: async (...args) => {
      await pause(2000);
      return fetch(...args);
    },
  }),
  endpoints(builder) {
    return {
      fetchWeather: builder.query({
        providesTags: (result, error, query) => {
          const tag = {
            type: "weatherData",

            query,
          };

          return [tag];
        },
        query: (query) => {
          return {
            url: "/forecast.json",
            params: {
              key: "cef63cbc4269414ead333916232710",
              q: query,
              days: 3,
              aqi: "yes",
            },
            method: "GET",
          };
        },
      }),
      cityLookup: builder.query({
        query: (location) => {
          return {
            url: "/search.json",
            params: {
              key: "cef63cbc4269414ead333916232710",
              q: location,
            },
            method: "GET",
          };
        },
      }),
      fetchTimezone: builder.query({
        query: (query) => {
          return {
            url: "/timezone.json",
            params: {
              key: "cef63cbc4269414ead333916232710",
              q: query,
            },
            method: "GET",
          };
        },
      }),
    };
  },
});

export const {
  useFetchWeatherQuery,
  useCityLookupQuery,
  useFetchTimezoneQuery,
} = weatherApi;
export const { invalidateTags } = weatherApi.util;
export { weatherApi };
