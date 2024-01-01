import WeatherLogo from "./WeatherLogo";
import LocationTime from "./LocationTime";
import DarkModeSwitch from "./DarkModeSwitch";
import SideMenuButton from "./SideMenuButton";
import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";

function Navbar() {
  const getIsFullNavbar = () => {
    if (window.innerWidth >= 876) {
      return true;
    }
    return false;
  };
  const [isFullNavbar, setIsFullNavbar] = useState(getIsFullNavbar);

  useEffect(() => {
    function updateIsFullNavbar() {
      setIsFullNavbar(getIsFullNavbar);
    }
    window.addEventListener("resize", updateIsFullNavbar);

    return () => {
      window.removeEventListener("resize", updateIsFullNavbar);
    };
  }, []);
  let content;
  if (isFullNavbar) {
    content = (
      <div className="flex flex-row w-full justify-between items-center gap-12">
        <WeatherLogo />
        <div className="flex flex-row  justify-center w-full items-center ">
          <SearchBar />
        </div>
        <div className="flex flex-row justify-start items-center  gap-4">
          <LocationTime />
          <DarkModeSwitch />
        </div>
      </div>
    );
  } else {
    content = (
      <div className="flex flex-row w-full justify-between items-center gap-8">
        <WeatherLogo />
        <div className="flex flex-row justify-start items-center h-full gap-4">
          <LocationTime />
          <SideMenuButton />
        </div>
      </div>
    );
  }
  return content;
}

export default Navbar;
