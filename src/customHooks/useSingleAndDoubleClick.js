import { useRef, useCallback } from "react";

export default function useSingleAndDoubleClick(onClick, onDoubleClick) {
  const timer = useRef();

  const cancelPendingClick = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
  }, [timer]);

  const handleSingleClick = useCallback((data) => {
    cancelPendingClick();
    timer.current = setTimeout(() => {
      timer.current = null;
      onClick(data);
    }, 600);
  }, [timer, onClick, cancelPendingClick]);

  const handleDoubleClick = useCallback((data) => {
    cancelPendingClick();
    onDoubleClick(data);
  }, [cancelPendingClick, onDoubleClick]);

  return { handleSingleClick, handleDoubleClick };
}
