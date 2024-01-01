import { createPortal } from "react-dom";
import { AiOutlineClose } from "react-icons/ai";
import WeatherForecastGraphTooltip from "./WeatherForecastGraphTooltip";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { formatForecastForGraph } from "../util";
import { useEffect } from "react";
import useDarkMode from "../hooks/useDarkMode";
import useClasses from "../hooks/useClasses";

function WeatherForecastGraph({ onClose, forecastData }) {
  const isDarkMode = useDarkMode();
  const graphData = formatForecastForGraph(forecastData);
  useEffect(() => {
    document.body.classList.add("overflow-hidden");

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);
  return createPortal(
    <div
      className="flex justify-center items-center inset-0 z-30 0 fixed"
      style={{
        backgroundColor: "rgb(156,163,175,0.75)",
      }}
    >
      <div
        className={useClasses(
          "bg-white flex flex-col justify-center items-center relative rounded-2xl p-4 w-11/12 h-4/6",
          {
            "bg-gray-300": isDarkMode,
          }
        )}
      >
        <button
          className="flex justify-center items-center absolute top-4 right-4 z-30 p-1 hover:bg-gray-400 rounded-full"
          onClick={onClose}
        >
          <AiOutlineClose className="text-red-500 text-3xl" />
        </button>
        <div className="text-lg font-semibold py-2">
          Forecast for {forecastData.date}
        </div>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={graphData}
            margin={{
              top: 40,
              right: 50,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Legend />
            <Line
              type="monotone"
              dataKey="tempreature"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Tooltip content={<WeatherForecastGraphTooltip />} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>,
    document.querySelector(".modal-container")
  );
}

export default WeatherForecastGraph;
