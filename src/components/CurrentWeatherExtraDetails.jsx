import { useSelector } from "react-redux";
import { useFetchWeatherQuery } from "../store";
import Skeleton from "./Skeleton";
import {
  formatUserCoordinates,
  formatWeatherData,
  getWeatherDetails,
  getDateTimeObj,
} from "../util";
import useDarkMode from "../hooks/useDarkMode";
import useClasses from "../hooks/useClasses";

function CurrentWeatherExtraDetails() {
  const isDarkMode = useDarkMode();
  const userCoordinates = useSelector((state) => {
    return state.userLocation.userCoordinates;
  });

  const { data, error } = useFetchWeatherQuery(
    formatUserCoordinates(userCoordinates),
    {
      skip: !userCoordinates,
    }
  );

  let content;
  if (!data) {
    content = <Skeleton times={1} className="w-full rounded-3xl h-full" />;
  } else if (error) {
    content = (
      <div
        className={useClasses(
          "w-full bg-white p-6 rounded-3xl h-full flex flex-col justify-between gap-4",
          {
            "bg-gray-300": isDarkMode,
          }
        )}
      >
        <div className="text-lg font-semibold capitalize w-full self-start">
          Extras
        </div>
        <div className="w-full">Error Fetching Data</div>
      </div>
    );
  } else {
    const { forecast, current, location } = formatWeatherData(data);
    const currentWeatherDetails = getWeatherDetails(current);
    const currentDateTimeObj = getDateTimeObj(location.timezone);
    const [selectedForecast, ...waste] = forecast.filter((forecastDay) => {
      if (forecastDay.date === currentDateTimeObj.toFormat("yyyy-LL-dd")) {
        return true;
      }
      return false;
    });
    const { moonrise, moonset } = selectedForecast.astro;
    const extras = [
      {
        title: "AQI",
        value: currentWeatherDetails.airQuality,
        units: "pm(2.5)",
      },
      { title: "UV Index", value: currentWeatherDetails.uvIndex, units: "/10" },
      {
        title: "Visibility",
        value: currentWeatherDetails.visibility,
        units: "KM",
      },
      { title: "Moonrise", value: moonrise, units: null },
      { title: "Moonset", value: moonset, units: null },
    ];
    let innerContent = extras.map((extra, idx) => {
      if (!extra.value) {
        return;
      }
      return (
        <div
          className={useClasses(
            "flex flex-row justify-between px-2 border-t border-gray-300 items-center w-full leading-none p-2 h-full",
            {
              "border-gray-400": isDarkMode,
            }
          )}
          key={idx}
        >
          <div className="text-center font-medium text-md">{extra.title}</div>
          <div className="text-center font-semibold text-xl">
            {extra.value}
            {extra.units}
          </div>
        </div>
      );
    });
    content = (
      <div
        className={useClasses(
          "bg-white p-6 rounded-2xl flex flex-col gap-4 w-full justify-between h-full",
          {
            "bg-gray-300": isDarkMode,
          }
        )}
      >
        <div className="text-lg font-semibold capitalize self-start">
          Extras
        </div>
        <div className="w-full flex flex-col h-full">{innerContent}</div>
      </div>
    );
  }
  return content;
}

export default CurrentWeatherExtraDetails;
