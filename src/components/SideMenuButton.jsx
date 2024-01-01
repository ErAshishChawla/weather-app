import { AiOutlineMenu } from "react-icons/ai";
import { useEffect, useState } from "react";
import SideMenu from "./SideMenu";
import useDarkMode from "../hooks/useDarkMode";
import useClasses from "../hooks/useClasses";
function SideMenuButton() {
  const [isOpen, setIsOpen] = useState(false);
  const isDarkMode = useDarkMode();

  const handleClick = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {}, [isOpen]);
  return (
    <>
      <div
        className={useClasses(
          "flex flex-row justify-center items-center h-full p-2 border cursor-pointer hover:bg-gray-400 rounded-md bg-white",
          {
            "bg-gray-300": isDarkMode,
          }
        )}
        onClick={handleClick}
      >
        <AiOutlineMenu className="text-2xl" />
      </div>
      {isOpen && <SideMenu onClose={onClose} />}
    </>
  );
}

export default SideMenuButton;
