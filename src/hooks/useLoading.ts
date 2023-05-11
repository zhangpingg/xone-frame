import { useState, useCallback } from 'react';

const useLoading = (): [boolean, Function] => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const loadFn = useCallback(
    (aPromise: Promise<any>) => {
      setLoading(true);
      return aPromise.finally(() => {
        setLoading(false);
      });
    },
    [isLoading],
  );
  return [isLoading, loadFn];
};

export default useLoading;
