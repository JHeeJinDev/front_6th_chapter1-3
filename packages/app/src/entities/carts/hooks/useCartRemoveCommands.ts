import { useAutoCallback } from "@hanghae-plus/lib";
import { clearCart, removeSelectedFromCart } from "../cartUseCase";
import { useToast } from "../../../hooks/useToast";

export const useCartRemoveCommands = () => {
  const { show } = useToast();

  const removeSelected = useAutoCallback(() => {
    removeSelectedFromCart();
    show({ message: "선택된 상품들이 삭제되었습니다", type: "info" });
  });

  const clear = useAutoCallback(() => {
    clearCart();
    show({ message: "장바구니가 비워졌습니다", type: "info" });
  });

  return { removeSelected, clear };
};
