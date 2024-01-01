import classes from "classnames";
import { twMerge } from "tailwind-merge";

function useClasses(...params) {
  return twMerge(classes(params));
}

export default useClasses;
