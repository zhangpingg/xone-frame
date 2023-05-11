import { useRef, useEffect, useState } from 'react';

interface UseSetIntervalProps {
  callback: Function;
  delay: number;
}
const useSetInterval = (props: UseSetIntervalProps) => {
  const { callback, delay = 10000 } = props;
  const timer = useRef<any>(null);
  const callbackRef = useRef(callback);
  const [startInter, setStartInter] = useState(false);

  const stopInterval = () => {
    clearIntervalRef();
    setStartInter(false);
  };

  const startInterval = () => {
    setStartInter(true);
  };
  const clearIntervalRef = () => {
    clearInterval(timer.current);
    timer.current = undefined;
  };

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);
  useEffect(() => {
    if (delay !== null && delay !== 0 && startInter) {
      if (timer.current) clearIntervalRef();
      timer.current = setInterval(() => {
        callbackRef.current();
      }, delay);
      return clearIntervalRef;
    }
  }, [startInter, delay]);

  return {
    startInterval,
    stopInterval,
    clearIntervalRef,
  };
};

export default useSetInterval;
