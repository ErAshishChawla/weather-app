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

const timezoneLocationApi = createApi({
  reducerPath: "timeZoneLocation",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://timezoneapi.io/api/ip/?token=arYdFcXtpzmrWEUjKmCp",
  }),
  endpoints(builder) {
    return {
      fetchUserAddress: builder.query({
        query: () => {
          return {
            method: "GET",
          };
        },
      }),
    };
  },
});

export const { useFetchUserAddressQuery } = timezoneLocationApi;
export { timezoneLocationApi };
