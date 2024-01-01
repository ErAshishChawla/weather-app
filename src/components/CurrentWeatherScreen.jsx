import useWeatherImage from "../hooks/useWeatherImage";
import Skeleton from "./Skeleton";
import { useSelector } from "react-redux";
import { useFetchWeatherQuery } from "../store";
import {
  formatUserCoordinates,
  getWeatherDetails,
  getCityCountry,
} from "../util";
import useDarkMode from "../hooks/useDarkMode";
import useClasses from "../hooks/useClasses";

function CurrentWeatherScreen() {
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
    content = <Skeleton times={1} className="h-[13rem] rounded-3xl" />;
  } else if (error) {
    content = "Error Fetching Data...";
  } else {
    const imgUrl = useWeatherImage(data.current);
    const { current, location } = data;
    const currentWeatherDetails = getWeatherDetails(current);
    const cityCountry = getCityCountry(location);

    content = (
      <div
        className="flex flex-col justify-center items-center w-full rounded-2xl 
        bg-white px-8 py-10 bg-center bg-no-repeat bg-cover h-full"
        style={{
          backgroundImage: `url('${imgUrl}')`,
        }}
      >
        <div
          className={useClasses(
            "w-full h-full text-bgLightMode text-white flex flex-col justify-center items-start gap-4 xl:gap-8"
          )}
        >
          <div className="flex justify-start items-center text-xl font-light xl:text-2xl">
            {cityCountry.city}, {cityCountry.country}
          </div>
          <div className="flex text-4xl justify-start items-center font-medium md:text-5xl xl:text-6xl">
            {parseInt(currentWeatherDetails.temp)} ℃
          </div>
          <div className="flex text-xl justify-start items-center font-light capitalize xl:text-2xl">
            {currentWeatherDetails.description}
          </div>
        </div>
      </div>
    );
  }
  return content;
}

export default CurrentWeatherScreen;
