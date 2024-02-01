import { useCallback, useEffect, useRef, DependencyList } from "react";

type ThrottleFunction = (...args: any[]) => any | undefined;

export function useThrottle(
  fn: ThrottleFunction,
  delay: number,
  dep: DependencyList = []
): ThrottleFunction {
  const { current } = useRef<{ fn: ThrottleFunction; timer?: NodeJS.Timeout }>({
    fn,
    timer: undefined,
  });

  useEffect(() => {
    current.fn = fn;
  }, [fn]);

  return useCallback(
    function f(...args) {
      if (!current.timer) {
        current.timer = setTimeout(() => {
          delete current.timer;
        }, delay);
        current.fn.call(this, ...args);
      }
    },
    [delay, ...dep]
  );
}
