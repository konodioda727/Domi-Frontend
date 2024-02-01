import {useCallback, useEffect, useRef} from "react";

export function useDebounce(fn: (...args: any[]) => any, delay: number, dep = []) {
  const { current } = useRef<{ fn: () => any; timer: NodeJS.Timeout | null }>({ fn, timer: null});
  useEffect(function () {
    current.fn = fn;
  }, [fn]);

  return useCallback(function f(...args) {
    if (current.timer) {
      clearTimeout(current.timer);
    }
    current.timer = setTimeout(() => {
      current.fn.call(this, ...args);
    }, delay);
  }, dep)
}
