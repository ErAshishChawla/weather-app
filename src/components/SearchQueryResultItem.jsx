import { updateLocationMode } from "../store";
import { useDispatch } from "react-redux";
import { generatePayload } from "../util";
import useDarkMode from "../hooks/useDarkMode";
import useClasses from "../hooks/useClasses";

function SearchQueryResultItem({ city }) {
  const isDarkMode = useDarkMode();
  const dispatch = useDispatch();
  const location = `${city.name}, ${city.region}, ${city.country}`;

  const handleClick = () => {
    const payload = generatePayload(
      "custom",
      city.lat,
      city.lon,
      city.name,
      city.country
    );
    dispatch(updateLocationMode(payload));
  };

  return (
    <button
      className={useClasses(
        "w-full p-4 cursor-pointer hover:bg-gray-300 text-left rounded-lg",
        {
          "hover:bg-white": isDarkMode,
        }
      )}
      onClick={handleClick}
    >
      {location}
    </button>
  );
}

export default SearchQueryResultItem;
