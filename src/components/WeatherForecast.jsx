import { useSelector } from "react-redux";
import { useFetchWeatherQuery } from "../store";
import Skeleton from "./Skeleton";
import { formatUserCoordinates, formatWeatherData } from "../util";
import WeatherForecastTile from "./WeatherForecastTile";
import useClasses from "../hooks/useClasses";
import useDarkMode from "../hooks/useDarkMode";

function WeatherForecast() {
  const isDarkMode = useDarkMode();
  const userCoordinates = useSelector((state) => {
    return state.userLocation.userCoordinates;
  });

  const fetchWeatherResults = useFetchWeatherQuery(
    formatUserCoordinates(userCoordinates),
    {
      skip: !userCoordinates,
    }
  );

  let content;
  if (!fetchWeatherResults.data) {
    content = <Skeleton times={1} className="rounded-3xl h-[20rem] w-full" />;
  } else if (fetchWeatherResults.error) {
    content = (
      <div
        className={useClasses("w-full bg-white p-6 rounded-3xl h-full", {
          "bg-gray-300": isDarkMode,
        })}
      >
        Error Loading Data
      </div>
    );
  } else {
    const { forecast } = formatWeatherData(fetchWeatherResults.data);
    content = (
      <div
        className={useClasses(
          "bg-white p-6 rounded-2xl flex flex-col gap-4 h-full w-full",
          {
            "bg-gray-300": isDarkMode,
          }
        )}
      >
        <div className="text-lg font-semibold capitalize">Hourly Forecast</div>
        <div className="w-full flex flex-col justify-between">
          {forecast.map((forecastDay, idx) => {
            return <WeatherForecastTile forecastData={forecastDay} key={idx} />;
          })}
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-row justify-center items-center w-full h-full md:col-span-2 xl:col-span-1">
      {content}
    </div>
  );
}

export default WeatherForecast;
