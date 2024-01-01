import SearchQueryResults from "./SearchQueryResults";
import SearchBarInputField from "./SearchBarInputField";
import GpsIconSideButton from "./GpsIconSideButton";
import SearchIconSideButton from "./SearchIconSideButton";
import {
  updateIsTyping,
  updateIsLocationSet,
  updateLocationMode,
  useCityLookupQuery,
} from "../store";
import { useRef, useEffect } from "react";
import useInsideClickDetection from "../hooks/useInsideClickDetection";

import { useSelector, useDispatch } from "react-redux";
import useDebouncedValue from "../hooks/useDebouncedValue";
import { generatePayload } from "../util";
import useDarkMode from "../hooks/useDarkMode";
import useClasses from "../hooks/useClasses";

function SearchBar() {
  const isDarkMode = useDarkMode();
  const dispatch = useDispatch();
  const searchLocation = useSelector((state) => state.search.searchLocation);
  const debonucedSearchLocation = useDebouncedValue(searchLocation, 200);
  const isLocationSet = useSelector((state) => state.search.isLocationSet);
  const ref1 = useRef();
  const ref2 = useRef();
  useInsideClickDetection(ref1, ref2, updateIsTyping, false);

  const { data } = useCityLookupQuery(debonucedSearchLocation, {
    skip: !isLocationSet,
  });

  useEffect(() => {
    if (isLocationSet && data) {
      const city = data[0];
      const payload = generatePayload(
        "custom",
        city.lat,
        city.lon,
        city.name,
        city.country
      );
      dispatch(updateLocationMode(payload));
    }
  }, [isLocationSet]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!debonucedSearchLocation) {
      return;
    }
    dispatch(updateIsLocationSet(true));
  };

  return (
    <div className="flex flex-col justify-center items-center grow relative">
      <form
        className={useClasses(
          "flex justify-start items-center bg-white rounded-lg overflow-hidden p-2.5 w-full shadow-search",
          {
            "bg-gray-300": isDarkMode,
          }
        )}
        onSubmit={handleSubmit}
      >
        <SearchIconSideButton />
        <SearchBarInputField ref={ref1} />
        <GpsIconSideButton />
      </form>
      <SearchQueryResults ref={ref2} />
    </div>
  );
}

export default SearchBar;
