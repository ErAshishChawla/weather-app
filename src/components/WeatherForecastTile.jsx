import { useState } from "react";
import { getWidthOffsetForWeatherBar } from "../util";
import WeatherForecastGraph from "./WeatherForecastGraph";
import useDarkMode from "../hooks/useDarkMode";
import useClasses from "../hooks/useClasses";
function WeatherForecastTile({ forecastData }) {
  const isDarkMode = useDarkMode();
  const [isGraphOpen, setIsGraphOpen] = useState(false);

  const dayName = forecastData.weekday;
  const currentMaxTemp = parseInt(forecastData.maxTemp);
  const currentMinTemp = parseInt(forecastData.minTemp);

  const { width, offset } = getWidthOffsetForWeatherBar(forecastData, 5);

  const currentTempBarStyle = {
    width: `${width}rem`,
    left: `${offset}rem`,
  };

  const handleClick = () => {
    setIsGraphOpen(true);
  };

  const onClose = () => {
    setIsGraphOpen(false);
  };

  return (
    <>
      <div
        className={useClasses(
          "flex flex-row w-full justify-between items-center border-t border-gray-300 cursor-pointer hover:bg-gray-200 p-2 gap-4 md:text-lg",
          {
            "border-gray-400 hover:bg-white": isDarkMode,
          }
        )}
        onClick={handleClick}
      >
        <div className="text-center ">{dayName}</div>
        <div className="flex flex-row justify-between items-center gap-4">
          <div>{currentMinTemp}℃</div>
          <div
            className={useClasses(
              "w-20 h-2.5 rounded-xl bg-gray-300 overflow-hidden relative sm:w-24 md:w-28 xl:w-20",
              {
                "bg-gray-200": isDarkMode,
              }
            )}
          >
            <div
              className="absolute bg-black h-full rounded-lg bg-gradient-to-r from-sky-700 to-amber-500 "
              style={currentTempBarStyle}
            ></div>
          </div>
          <div>{currentMaxTemp}℃</div>
        </div>
      </div>
      {isGraphOpen && (
        <WeatherForecastGraph onClose={onClose} forecastData={forecastData} />
      )}
    </>
  );
}

export default WeatherForecastTile;
