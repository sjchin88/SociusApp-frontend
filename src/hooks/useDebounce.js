// Set delay when typing into the input, example is for typing the search
import { useEffect, useState } from 'react';

const useDebounce = (value, delay) => {
  const [debounceValue, setDebounceValue] = useState(value);
  useEffect(() => {
    // setting the delay
    const timer = setTimeout(() => setDebounceValue(value), delay || 500);
    // clear the time out
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debounceValue;
};

export default useDebounce;
