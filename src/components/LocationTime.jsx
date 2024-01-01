import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { updateLocationTime, useFetchWeatherQuery } from "../store";
import {
  formatUserCoordinates,
  formatTimezoneData,
  getShortTimeString,
  getDateTimeObj,
} from "../util";
import Skeleton from "./Skeleton";
import useDarkMode from "../hooks/useDarkMode";
import useClasses from "../hooks/useClasses";

function LocationTime() {
  const isDarkMode = useDarkMode();
  const dispatch = useDispatch();
  const { userCoordinates, locationTime } = useSelector((state) => {
    return state.userLocation;
  });
  const { data, error } = useFetchWeatherQuery(
    formatUserCoordinates(userCoordinates),
    {
      skip: !userCoordinates,
    }
  );

  useEffect(() => {
    let intervalId;
    if (data) {
      intervalId = setInterval(() => {
        const { timezone } = formatTimezoneData(data);
        const currentDateTime = getDateTimeObj(timezone);
        const currentDateTimeString = getShortTimeString(currentDateTime);
        dispatch(updateLocationTime(currentDateTimeString));
      }, 1000);
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [data]);

  const classes =
    "font-medium text-sm w-full h-full flex flex-row justify-center items-center whitespace-nowrap";

  let content;
  if (!data) {
    content = <Skeleton times={1} className="w-20 h-10 rounded-3xl" />;
  } else if (error) {
    content = <div className={classes}>Error!</div>;
  } else {
    content = <div className={classes}>{locationTime}</div>;
  }

  return (
    <div
      className={useClasses(
        "flex flex-row justify-center items-center h-full w-full",
        {
          "text-gray-300": isDarkMode,
        }
      )}
    >
      {content}
    </div>
  );
}
export default LocationTime;
