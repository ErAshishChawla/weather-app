import CurrentWeatherDetailsTile from "./CurrentWeatherDetailsTile";
import { PiCloudSunThin, PiWindBold } from "react-icons/pi";
import { BiDroplet } from "react-icons/bi";
import { WiBarometer } from "react-icons/wi";
import { useSelector } from "react-redux";
import Skeleton from "./Skeleton";
import {
  formatUserCoordinates,
  getClosestForecast,
  getWeatherDetails,
} from "../util";
import { useFetchWeatherQuery } from "../store";

function CurrentWeatherDetails() {
  const userCoordinates = useSelector((state) => {
    return state.userLocation.userCoordinates;
  });

  const fetchWeatherResults = useFetchWeatherQuery(
    formatUserCoordinates(userCoordinates),
    {
      skip: !userCoordinates,
    }
  );
  const getWeatherTilesData = (current, fourthHourForecast) => {
    const tilesData = [
      {
        title: "feels like",
        data: parseInt(current.feelsLike),
        units: "℃",
        info: Math.round(fourthHourForecast.feelsLike - current.feelsLike),
        icon: <PiCloudSunThin />,
      },
      {
        title: "wind speed",
        data: parseInt(current.wind),
        units: "km/h",
        info: Math.round(fourthHourForecast.wind - current.wind),
        icon: <PiWindBold />,
      },
      {
        title: "humidity",
        data: parseInt(current.humidity),
        units: "%",
        info: Math.round(fourthHourForecast?.humidity - current.humidity),
        icon: <BiDroplet />,
      },
      {
        title: "pressure",
        data: parseInt(current.pressure),
        units: "hPa",
        info: Math.round(fourthHourForecast?.pressure - current.pressure),
        icon: <WiBarometer />,
      },
    ];
    return tilesData;
  };

  let content;
  if (!fetchWeatherResults.data) {
    content = <Skeleton times={4} className="rounded-3xl h-36 w-full grow" />;
  } else if (fetchWeatherResults.error) {
    content = "Error Fetching Data...";
  } else {
    const { forecast, current } = fetchWeatherResults.data;
    const difference = 4;
    const closestForecast = getClosestForecast(forecast, 4);
    const currentWeatherData = getWeatherDetails(current);
    const forecastWeatherData = getWeatherDetails(closestForecast);
    const tilesData = getWeatherTilesData(
      currentWeatherData,
      forecastWeatherData
    );
    content = tilesData.map((tile, idx) => {
      return (
        <CurrentWeatherDetailsTile
          key={idx}
          title={tile.title}
          data={tile.data}
          units={tile.units}
          info={tile?.info}
          icon={tile.icon}
          difference={difference}
        />
      );
    });
  }
  return (
    <div className="grid-cols-2 grid grid-rows-2 gap-3 lg:grid-cols-4 lg:grid-rows-1">
      {content}
    </div>
  );
}

export default CurrentWeatherDetails;
