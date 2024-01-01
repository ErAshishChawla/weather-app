import Skeleton from "./Skeleton";
import { useSelector } from "react-redux";
import { useFetchWeatherQuery } from "../store";
import {
  formatUserCoordinates,
  getIconUrl,
  getWeatherDescription,
} from "../util";
import useDarkMode from "../hooks/useDarkMode";
import useClasses from "../hooks/useClasses";
function WeatherLogo() {
  const isDarkMode = useDarkMode();
  const userCoordinates = useSelector((state) => {
    return state.userLocation.userCoordinates;
  });
  const { error, data } = useFetchWeatherQuery(
    formatUserCoordinates(userCoordinates),
    {
      skip: !userCoordinates,
    }
  );

  let content;
  if (!data) {
    content = <Skeleton className="w-20 h-10 rounded-2xl" times={1} />;
  } else if (error) {
    content = "Error fetching Weather Data";
  } else {
    const iconUrl = getIconUrl(data.current);
    const description = getWeatherDescription(data.current);
    content = (
      <div className="flex flex-row justify-between items-center gap-2 w-full h-full">
        <div className="text-sm capitalize whitespace-nowrap">
          {description}
        </div>
        <div className="flex flex-row justify-center items-center w-12 h-12">
          <img src={iconUrl} alt={description} className="w-full h-full" />
        </div>
      </div>
    );
  }
  return (
    <div
      className={useClasses(
        "flex flex-row justify-center items-center h-full",
        {
          "text-gray-300": isDarkMode,
        }
      )}
    >
      {content}
    </div>
  );
}

export default WeatherLogo;
