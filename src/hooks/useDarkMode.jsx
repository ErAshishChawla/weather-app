import { useSelector } from "react-redux";
function useDarkMode() {
  const isDarkMode = useSelector((state) => {
    return state.darkMode.isDarkMode;
  });
  return isDarkMode;
}

export default useDarkMode;
