import { useQuery } from "@tanstack/react-query";
import { LIST_PRODUCT_KEY } from "../../utils/query-key";
import { ProductApis } from "../../api/ProductApis";

export const useGetProducts = () => {
  return useQuery({
    queryKey: [LIST_PRODUCT_KEY],
    queryFn: () => ProductApis.getAllProducts(),
  });
};
export const useGetProductDetail = (productId: number) => {
  return useQuery({
    queryKey: [LIST_PRODUCT_KEY],
    queryFn: () => ProductApis.getProductById(productId),
  });
};
