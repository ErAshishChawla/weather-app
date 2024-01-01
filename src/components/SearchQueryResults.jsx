import { useCityLookupQuery } from "../store";
import { useSelector } from "react-redux";
import useDebouncedValue from "../hooks/useDebouncedValue";
import { forwardRef } from "react";
import Skeleton from "./Skeleton";
import SearchQueryResultItem from "./SearchQueryResultItem";
import useClasses from "../hooks/useClasses";
import useDarkMode from "../hooks/useDarkMode";

const SearchQueryResults = forwardRef(function SearchQueryResults(props, ref) {
  const isDarkMode = useDarkMode();
  const { searchLocation, isTyping } = useSelector((state) => state.search);
  const debonucedSearchLocation = useDebouncedValue(searchLocation, 500);

  const { data, isFetching, error, isUninitialized } = useCityLookupQuery(
    debonucedSearchLocation,
    {
      skip: !debonucedSearchLocation,
    }
  );

  let renderedCities;

  if (isFetching || isUninitialized) {
    renderedCities = (
      <Skeleton times={5} className="w-full h-12 border-b-gray border" />
    );
  } else if (error) {
    renderedCities = (
      <div className="w-full h-12 border-b-gray border">
        Error Fetching Cities
      </div>
    );
  } else {
    renderedCities = data?.map((city, idx) => {
      return <SearchQueryResultItem city={city} key={idx} />;
    });
  }

  return (
    <div
      className={useClasses(
        "w-full bg-white rounded-lg absolute shadow-search overflow-hidden top-[4rem] z-10",
        {
          "bg-gray-300": isDarkMode,
        }
      )}
      ref={ref}
    >
      {isTyping && !!searchLocation ? renderedCities : null}
    </div>
  );
});

export default SearchQueryResults;
