import { debounce } from "lodash";
import { useState, useEffect } from "react";
function useDebouncedValue(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = debounce(() => setDebouncedValue(value), delay);
    handler();

    return () => {
      handler.cancel();
    };
  }, [value]); // Only re-call effect if value changes

  return debouncedValue;
}

export default useDebouncedValue;
