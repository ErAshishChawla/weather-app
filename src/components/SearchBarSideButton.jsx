import useClasses from "../hooks/useClasses";
function SearchBarSideButton({ className, icon, ...rest }) {
  return (
    <button
      className={useClasses(
        "text-xl grow-0 cursor-pointer flex justify-center items-center hover:bg-gray-300 rounded-full",
        className
      )}
      {...rest}
    >
      {icon}
    </button>
  );
}

export default SearchBarSideButton;
