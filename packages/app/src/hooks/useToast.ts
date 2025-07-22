import { useRef } from "react";
import toastStore from "../stores/toast";
import { useStore } from "@hanghae-plus/lib";

export const useToastState = () => {
  const type = useStore(toastStore, (state) => state.type);
  const message = useStore(toastStore, (state) => state.message);
  const visible = useStore(toastStore, (state) => state.visible);

  return { type, message, visible };
};

export const useToast = () => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function show({ type, message }: { type: string; message?: string }) {
    toastStore.dispatch({ type: "SHOW_TOAST", payload: { type, message } });

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      console.log("asdasdadsaddaasd");
      toastStore.dispatch({ type: "HIDE_TOAST" });
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
