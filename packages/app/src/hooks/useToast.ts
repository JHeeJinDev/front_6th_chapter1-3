import { useRef } from "react";
import toastStore, { TOAST_ACTIONS } from "../stores/toast";
import { useStore } from "@hanghae-plus/lib";
import type { ToastState } from "../stores/toast";

export const useToastState = () => {
  return useStore(toastStore, (state) => ({
    type: state.type,
    message: state.message,
    visible: state.visible,
  }));
};

export const useToast = () => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function show({ type, message }: { type: ToastState["type"]; message: string }) {
    toastStore.dispatch({ type: TOAST_ACTIONS.SHOW_TOAST, payload: { type, message } });

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      toastStore.dispatch({ type: TOAST_ACTIONS.HIDE_TOAST });
      timeoutRef.current = null;
    }, 3000);
  }

  function hide() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    toastStore.dispatch({ type: "HIDE_TOAST" });
  }

  return {
    show,
    hide,
  };
};
