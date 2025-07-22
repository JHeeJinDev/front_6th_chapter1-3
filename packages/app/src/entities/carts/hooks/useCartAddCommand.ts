import { useAutoCallback } from "@hanghae-plus/lib";
import type { Product } from "../../products";
import { addToCart } from "../cartUseCase";
import { useToast } from "../../../hooks/useToast";

export const useCartAddCommand = () => {
  const { show } = useToast();
  return useAutoCallback((product: Product, quantity = 1) => {
    addToCart(product, quantity);
    show({ message: "장바구니에 추가되었습니다", type: "success" });
  });
};
