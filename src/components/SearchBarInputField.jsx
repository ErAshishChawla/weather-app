import { useSelector, useDispatch } from "react-redux";
import { updateSearchTerm, updateIsTyping } from "../store";
import { forwardRef } from "react";
import useClasses from "../hooks/useClasses";
import useDarkMode from "../hooks/useDarkMode";

const SearchBarInputField = forwardRef(function SearchBarInputField(
  props,
  ref
) {
  const isDarkMode = useDarkMode();
  const searchLocation = useSelector((state) => state.search.searchLocation);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(updateIsTyping(true));
  };

  const handleChange = (e) => {
    dispatch(updateSearchTerm(e.target.value));
  };

  return (
    <input
      type="text"
      className={useClasses(
        "text-lg focus:outline-none focus:border-none grow",
        {
          "bg-gray-300": isDarkMode,
        }
      )}
      placeholder="Search Location"
      value={searchLocation}
      onChange={handleChange}
      onClick={handleClick}
      ref={ref}
    />
  );
});

export default SearchBarInputField;
