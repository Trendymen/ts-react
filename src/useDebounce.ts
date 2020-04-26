import { useRef, UIEvent } from "react";

type UIEventHandler = (e?: UIEvent) => void;

export default (handler: UIEventHandler, timeout: number): UIEventHandler => {
  const ref = useRef(0);
  return (e): void => {
    if (ref.current) {
      clearTimeout(ref.current);
    }
    ref.current = setTimeout(handler, timeout);
  };
};
