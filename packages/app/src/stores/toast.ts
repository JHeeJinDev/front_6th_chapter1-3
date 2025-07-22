import { createStore } from "@hanghae-plus/lib";

interface ToastState {
  type: "success" | "error" | "warning" | "info";
  visible: boolean;
  message: string;
}

const initialState: ToastState = {
  type: "info",
  visible: false,
  message: "",
};

const toastStore = createStore((state: ToastState, action) => {
  switch (action.type) {
    case "SHOW_TOAST":
      return { ...state, visible: true, message: action.payload.message, type: action.payload?.type || "info" };
    case "HIDE_TOAST":
      return { ...state, visible: false, message: "", type: action.payload?.type || "info" };
    default:
      return state;
  }
}, initialState);

export default toastStore;
