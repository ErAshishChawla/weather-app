import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  useFetchWeatherQuery,
  useFetchUserAddressQuery,
  userDataSelector,
  updateLocationMode,
  store,
} from "../store";
import { generatePayload, displayToast, formatUserCoordinates } from "../util";
import useSetToast from "./useSetToast";
import useSetUserLocationDataFromIp from "./useSetUserLocationDataFromIp";
import { invalidateTags } from "../store/apis/weatherApi";

function useGetWeatherData() {
  const { userCoordinates, userCityData, locationMode } =
    useSelector(userDataSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!locationMode) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            const payload = generatePayload(
              "geo",
              latitude,
              longitude,
              null,
              null
            );
            dispatch(updateLocationMode(payload));
          },
          () => {
            const payload = generatePayload("ip", null, null, null, null);
            dispatch(updateLocationMode(payload));
          }
        );
      } else {
        const payload = generatePayload("no", 51.509865, -0.118092, null, null);
        dispatch(updateLocationMode(payload));
      }
    }
  }, [locationMode]);

  const fetchUserAddressResults = useFetchUserAddressQuery(null, {
    skip: locationMode !== "ip",
  });

  const fetchWeatherResults = useFetchWeatherQuery(
    formatUserCoordinates(userCoordinates),
    {
      skip: !userCoordinates,
      pollingInterval: 1000 * 60 * 60,
      refetchOnReconnect: true,
      refetchOnFocus: true,
    }
  );

  useEffect(() => {
    const { messageString, messageType, payload } = useSetToast(
      fetchWeatherResults,
      locationMode,
      userCityData
    );

    if (payload) {
      dispatch(updateLocationMode(payload));
    }
    if (messageType && messageString) {
      displayToast(messageString, locationMode, messageType);
    }
  }, [fetchWeatherResults.isFetching]);

  useEffect(() => {
    const payload = useSetUserLocationDataFromIp(
      locationMode,
      fetchUserAddressResults,
      userCoordinates
    );
    if (payload) {
      dispatch(updateLocationMode(payload));
      if (payload.locationMode === "no") {
        displayToast(
          "Error fetching data for current location using Ip, shifting to London, UK",
          locationMode,
          "error"
        );
      }
    }
  }, [fetchUserAddressResults.isFetching]);
}

export default useGetWeatherData;
