import { generatePayload } from "../util";
function useSetToast(fetchWeatherResults, locationMode, userCityData) {
  let messageString = null;
  let messageType = null;
  let payload = null;
  if (fetchWeatherResults.isFetching) {
    if (locationMode === "geo") {
      messageString = "Fetching data for current location";
    } else if (locationMode === "ip") {
      messageString = "Fetching data for current location using Ip Address";
    } else if (locationMode === "custom") {
      messageString = `Fetching data for ${userCityData.city}, ${userCityData.country}`;
    } else if (locationMode === "no") {
      messageString = `Fetching data for London, UK`;
    } else {
      console.log("Some unknown location mode in isFetching");
    }
    messageType = "info";
  } else if (fetchWeatherResults.error) {
    if (locationMode === "geo") {
      messageString =
        "Error fetching data for current location, shifting to London, UK";
    } else if (locationMode === "ip") {
      messageString =
        "Error fetching data for current location using Ip, shifting to London, UK";
    } else if (locationMode === "custom") {
      messageString = `Error fetching data for ${userCityData.city}, ${userCityData.country}, shifting to London, UK`;
    } else if (locationMode === "no") {
      messageString = `Error fetching data for London, UK`;
    } else {
      console.log("Some unknown location mode in error");
    }
    messageType = "error";
    payload = generatePayload("no", 51.509865, -0.118092, null, null);
  } else if (fetchWeatherResults.isSuccess) {
    if (locationMode === "geo") {
      messageString = "Fetched data successfully for current location";
    } else if (locationMode === "ip") {
      messageString = "Fetched data successfully for current location using Ip";
    } else if (locationMode === "custom") {
      messageString = `Fetched data successfully for ${userCityData.city}, ${userCityData.country}`;
    } else if (locationMode === "no") {
      messageString = `Fetched data successfully for London, UK`;
    } else {
      console.log("Some unknown location mode in error");
    }
    messageType = "success";
  }

  return { messageString, messageType, payload };
}

export default useSetToast;
