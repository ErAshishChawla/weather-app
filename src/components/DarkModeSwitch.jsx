import { useDispatch, useSelector } from "react-redux";
import { BsSun, BsMoon } from "react-icons/bs";
import useClasses from "../hooks/useClasses";
import { toggleDarkMode } from "../store";

function DarkModeSwitch() {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => {
    return state.darkMode.isDarkMode;
  });

  const handleClick = (value) => {
    dispatch(toggleDarkMode(value));
  };

  const classes =
    "h-full flex flex-row justify-center items-center  shadow-button";

  const buttonStyles =
    "flex flex-row justify-center items-center text-lightModeText bg-white w-full h-full p-2";
  return (
    <div className={classes}>
      <button
        className={useClasses(
          buttonStyles,
          "border-r border-gray-300 rounded-l-md",
          {
            "shadow-button-pressed": !isDarkMode,
          }
        )}
        onClick={() => {
          handleClick(false);
        }}
      >
        <BsSun className="text-2xl" />
      </button>
      <button
        className={useClasses(buttonStyles, "rounded-r-md", {
          "shadow-button-pressed": isDarkMode,
        })}
        onClick={() => {
          handleClick(true);
        }}
      >
        <BsMoon className="text-2xl" />
      </button>
    </div>
  );
}

export default DarkModeSwitch;
