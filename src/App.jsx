import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useGetWeatherData from "./hooks/useGetWeatherData";
import Navbar from "./components/Navbar";
import CurrentWeatherScreen from "./components/CurrentWeatherScreen";
import CurrentWeatherDetails from "./components/CurrentWeatherDetails";
import WeatherForecast from "./components/WeatherForecast";
import SunriseSunset from "./components/SunriseSunset";
import CurrentWeatherExtraDetails from "./components/CurrentWeatherExtraDetails";
import useDarkMode from "./hooks/useDarkMode";
import useClasses from "./hooks/useClasses";

function App() {
  useGetWeatherData();
  const isDarkMode = useDarkMode();
  return (
    <div
      className={useClasses(
        "flex flex-col px-8 py-6 items-center w-full h-full grow bg-lightModeBg text-lighModeText font-montserrat  box-border",
        {
          "bg-gray-900": isDarkMode,
        }
      )}
    >
      <div className="flex flex-col gap-4 w-full h-full justify-between grow">
        <Navbar />
        <CurrentWeatherScreen />
        <CurrentWeatherDetails />
        <div className="gap-4 w-full grid grid-rows-3 grid-cols-1 md:grid-rows-2 md:grid-cols-2 xl:grid-rows-1 xl:grid-cols-3">
          <WeatherForecast />
          <SunriseSunset />
          <CurrentWeatherExtraDetails />
        </div>
      </div>
      <div className="absolute">
        <ToastContainer />
      </div>
    </div>
  );
}

export default App;
