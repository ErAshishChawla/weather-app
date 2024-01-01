import { generatePayload } from "../util";
function useSetUserLocationDataFromIp(
  locationMode,
  fetchUserAddressResults,
  userCoordinates
) {
  let payload;
  const { data, error, isSuccess } = fetchUserAddressResults;
  if (locationMode === "ip" && isSuccess && !userCoordinates) {
    const location = data.data.location;
    const locationArrayString = location.split(",");
    const locationArray = locationArrayString.map((val) => {
      return parseFloat(val);
    });
    payload = generatePayload(
      "ip",
      locationArray[0],
      locationArray[1],
      null,
      null
    );
  } else if (error) {
    payload = generatePayload("no", 51.509865, -0.118092, null, null);
  }
  return payload;
}

export default useSetUserLocationDataFromIp;
