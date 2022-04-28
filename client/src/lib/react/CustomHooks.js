import { useEffect } from "react";

export function useEffectAsync(asyncFn, onSuccess, deps) {
  useEffect(() => {
    let isMounted = true;
    asyncFn().then((data) => {
      if (isMounted) onSuccess(data);
    });
    return () => {
      isMounted = false;
    };
  }, [...deps]);
}
