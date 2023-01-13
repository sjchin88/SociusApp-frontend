import { useEffect, useRef } from 'react';

const useEffectOnce = (callback) => {
  const calledOnce = useRef(false);
  useEffect(() => {
    // after execution first time, set calledOnce to true
    if (!calledOnce.current) {
      callback();
      calledOnce.current = true;
    }
  }, [callback]);
};

export default useEffectOnce;
