import { useEffect, useRef } from "react";

export function useCloseModal(close, listenCapture = true) {
  const ref = useRef();
  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) close();
      }
      document.addEventListener("click", handleClick, listenCapture);
      return () =>
        document.removeEventListener("click", handleClick, listenCapture);
    },
    [close, listenCapture],
  );
  return ref;
}
