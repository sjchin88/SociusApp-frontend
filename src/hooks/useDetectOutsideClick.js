// close any component(like dropdown) when click outside the component
import { useEffect, useState } from 'react';

const useDetectOutsideClick = (ref, initialState) => {
  // determine if dropdown should be open or close
  const [isActive, setIsActive] = useState(initialState);

  useEffect(() => {
    const onClick = (event) => {
      // check if the clicked area is inside or outside the ref element
      if (ref.current !== null && !ref.current.contains(event.target)) {
        setIsActive(!isActive);
      }
    };

    // if is active,
    if (isActive) {
      window.addEventListener('mousedown', onClick);
    }

    return () => {
      window.removeEventListener('mousedown', onClick);
    };
  }, [isActive, ref]);

  return [isActive, setIsActive];
};

export default useDetectOutsideClick;
