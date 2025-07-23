import { createStore } from "@hanghae-plus/lib";

export interface ToastState {
  type: "success" | "error" | "warning" | "info";
  visible: boolean;
  message: string;
}

export const TOAST_ACTIONS = {
  SHOW_TOAST: "toast/show",
  HIDE_TOAST: "toast/hide",
} as const;

const initialState: ToastState = {
  type: "info",
  visible: false,
  message: "",
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toastReducer = (state: typeof initialState, action: any) => {
  switch (action.type) {
    case TOAST_ACTIONS.SHOW_TOAST:
      return {
        ...state,
        visible: true,
        message: action.payload.message,
        type: action.payload.type || "info",
      };
    case TOAST_ACTIONS.HIDE_TOAST:
      return {
        ...state,
        visible: false,
        message: "",
        type: action.payload?.type || "info",
      };
    default:
      return state;
  }
};

const toastStore = createStore(toastReducer, initialState);

export default toastStore;
