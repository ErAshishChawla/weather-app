import { useEffect } from "react";
import { useDispatch } from "react-redux";

function useInsideClickDetection(ref1, ref2, action, value) {
  const dispatch = useDispatch();
  useEffect(() => {
    const handleWindowClick = (e) => {
      if (e.button === 2) {
        return;
      }
      if (ref1.current && ref2.current) {
        if (
          !ref1.current.contains(e.target) &&
          !ref2.current.contains(e.target)
        )
          dispatch(action(value));
      }
    };

    window.addEventListener("mousedown", handleWindowClick);

    return () => {
      window.removeEventListener("mousedown", handleWindowClick);
    };
  }, []);
}

export default useInsideClickDetection;
