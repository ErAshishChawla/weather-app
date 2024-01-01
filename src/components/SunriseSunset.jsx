import { BsFillSunFill, BsSunriseFill, BsSunsetFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import Skeleton from "./Skeleton";
import {
  formatUserCoordinates,
  getDateTimeObj,
  formatWeatherData,
  getDayProgress,
} from "../util";
import { useEffect, useState } from "react";
import { useFetchWeatherQuery } from "../store";
import useClasses from "../hooks/useClasses";
import useDarkMode from "../hooks/useDarkMode";

function SunriseSunset() {
  const isDarkMode = useDarkMode();
  const userCoordinates = useSelector((state) => {
    return state.userLocation.userCoordinates;
  });

  const { isLoading, isUninitialized, data, error } = useFetchWeatherQuery(
    formatUserCoordinates(userCoordinates),
    {
      skip: !userCoordinates,
    }
  );

  const getSemiCircleWidth = () => {
    let semiCircleWidth = 16;
    if (window.innerWidth >= 480) {
      semiCircleWidth = 16;
    }

    if (window.innerWidth >= 640) {
      semiCircleWidth = 18;
    }

    if (window.innerWidth >= 768) {
      semiCircleWidth = 16;
    }

    if (window.innerWidth >= 1024) {
      semiCircleWidth = 18;
    }

    if (window.innerWidth >= 1280) {
      semiCircleWidth = 16;
    }

    if (window.innerWidth >= 1536) {
      semiCircleWidth = 20;
    }

    return semiCircleWidth;
  };

  const [rotation, setRotation] = useState(0);
  const [semiCircleWidth, setSemiCircleWidth] = useState(getSemiCircleWidth);

  useEffect(() => {
    let intervalId;
    if (data) {
      intervalId = setInterval(() => {
        setRotation(getDayProgress(data));
      }, 1);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [data]);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setSemiCircleWidth(getSemiCircleWidth(window.innerWidth));
    });

    return () => {
      window.addEventListener("resize", () => {
        setSemiCircleWidth(getSemiCircleWidth);
      });
    };
  }, []);

  let content;
  if (!data) {
    content = <Skeleton times={1} className="w-full h-full rounded-2xl" />;
  } else if (error) {
    content = (
      <div
        className={useClasses(
          "bg-white p-6  h-full w-full flex flex-col gap-6 rounded-2xl",
          {
            "bg-gray-300": isDarkMode,
          }
        )}
      >
        Error Loading Data
      </div>
    );
  } else {
    const { forecast, location } = formatWeatherData(data);
    const currentDateTimeObj = getDateTimeObj(location.timezone);
    const [selectedForecast, ...waste] = forecast.filter((forecastDay) => {
      if (forecastDay.date === currentDateTimeObj.toFormat("yyyy-LL-dd")) {
        return true;
      }
      return false;
    });
    const { sunrise, sunset } = selectedForecast.astro;
    const semiCircleHeight = semiCircleWidth / 2;
    content = (
      <div
        className={useClasses(
          "bg-white p-6 rounded-2xl h-full w-full flex flex-col gap-4 items-center justify-between",
          {
            "bg-gray-300": isDarkMode,
          }
        )}
      >
        <div className="text-lg font-semibold capitalize grow-0 self-start">
          Sunrise & Sunset
        </div>
        <div className="flex flex-col justify-center grow items-center w-full gap-2">
          <div
            className="border border-gray-900 flex rounded-t-full items-end"
            style={{
              borderStyle: "dashed dashed solid dashed",
              width: `${semiCircleWidth}rem`,
              height: `${semiCircleHeight}rem`,
            }}
          >
            <div
              className="flex flex-row h-[2rem] justify-start items-end relative origin-bottom-right"
              style={{
                transform: `rotate(${rotation}deg)`,
                transition: "transform 3s ease-in-out",
                width: `${semiCircleHeight}rem`,
              }}
            >
              <BsFillSunFill className="text-3xl text-amber-500 absolute -bottom-4 -left-3.5" />
            </div>
          </div>
          <div
            className="flex flex-row justify-between items-center"
            style={{ width: `${semiCircleWidth}rem` }}
          >
            <div className="flex flex-col gap-1">
              <div className="flex justify-center items-center">
                <BsSunriseFill className="text-amber-500 text-3xl" />
              </div>
              <div className="flex justify-center items-center text-sm">
                {sunrise}
              </div>
            </div>
            <div className="flex flex-col gap-1 ">
              <div className="flex justify-center items-center ">
                <BsSunsetFill className="text-amber-500 text-3xl" />
              </div>
              <div className="flex justify-center items-center text-sm">
                {sunset}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return content;
}

export default SunriseSunset;
