import useWindowWidth from "hooks/useWindowWidth";

import { useCalculateFinalPrice } from "./priceCalculator";

export const useCustomPadding = () => {
    const { price } = useCalculateFinalPrice();
    const width = useWindowWidth();
    return price === 0 && width < 768 ? "20px" : ""
}