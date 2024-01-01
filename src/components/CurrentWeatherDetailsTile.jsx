import useDarkMode from "../hooks/useDarkMode";
import useClasses from "../hooks/useClasses";
function CurrentWeatherDetailsTile({
  title,
  data,
  info,
  icon,
  units,
  difference,
}) {
  const isDarkMode = useDarkMode();

  return (
    <div
      className={useClasses(
        "flex flex-col bg-white p-6 rounded-2xl flex-1 basis-2 gap-2",
        {
          "bg-gray-300": isDarkMode,
        }
      )}
    >
      <div className="flex flex-row justify-start items-center gap-2">
        <div className="text-sm font-medium capitalize sm:text-md md:text-lg">
          {title}
        </div>
        <div className="text-2xl font-bold text-orange-500">{icon}</div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="text-2xl font-medium sm:text-3xl md:text-4xl">
          {data} {units}
        </div>
        <div className="text-xs">
          <span className=" text-orange-500">
            {info > 0 && "+"}
            {info}
            {units}
          </span>{" "}
          next {difference} hours
        </div>
      </div>
    </div>
  );
}

export default CurrentWeatherDetailsTile;
