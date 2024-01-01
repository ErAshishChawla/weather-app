import { createPortal } from "react-dom";
import { AiOutlineClose } from "react-icons/ai";
import SearchBar from "./SearchBar";
import DarkModeSwitch from "./DarkModeSwitch";
import { useEffect } from "react";
import useDarkMode from "../hooks/useDarkMode";
import useClasses from "../hooks/useClasses";
function SideMenu({ onClose }) {
  const isDarkMode = useDarkMode();
  useEffect(() => {
    document.body.classList.add("overflow-hidden");

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);
  return createPortal(
    <div className="fixed inset-0 z-30 bg-transparent">
      <div
        className={useClasses(
          "h-full right-0 absolute bg-gray-100 w-80 flex flex-col justify-start items-center gap-4 p-2",
          {
            "bg-gray-800": isDarkMode,
          }
        )}
      >
        <div className="flex flex-row justify-between items-center w-full">
          <DarkModeSwitch />
          <button
            className="flex justify-center items-center p-1 hover:bg-gray-400 rounded-full self-end"
            onClick={onClose}
          >
            <AiOutlineClose className="text-red-500 text-3xl" />
          </button>
        </div>
        <div className="flex flex-col w-full relative">
          <SearchBar />
        </div>
      </div>
    </div>,
    document.querySelector(".modal-container")
  );
}

export default SideMenu;
