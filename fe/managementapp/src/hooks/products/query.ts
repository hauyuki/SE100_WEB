import { useQuery } from "@tanstack/react-query";
import {
  LIST_INBOUND_PRODUCT_KEY,
  LIST_PRODUCT_KEY,
} from "../../utils/query-key";
import { ProductApis } from "../../api/ProductApis";

export const useGetProducts = () => {
  return useQuery({
    queryKey: [LIST_PRODUCT_KEY],
    queryFn: () => ProductApis.getAllProducts(),
  });
};
export const useGetNeedInboundProducts = () => {
  return useQuery({
    queryKey: [LIST_INBOUND_PRODUCT_KEY],
    queryFn: () => ProductApis.getNeedInboundProducts(),
  });
};
export const useGetProductDetail = (productId: number) => {
  return useQuery({
    queryKey: [LIST_PRODUCT_KEY],
    queryFn: () => ProductApis.getProductById(productId),
  });
};
