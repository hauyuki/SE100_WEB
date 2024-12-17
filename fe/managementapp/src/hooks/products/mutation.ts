import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LIST_PRODUCT_KEY } from "../../utils/query-key";
import { ProductApis } from "../../api/ProductApis";

export const usePostProducts = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ProductApis.postProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [LIST_PRODUCT_KEY] });
    },
  });
};
export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ProductApis.updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [LIST_PRODUCT_KEY] });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ProductApis.deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [LIST_PRODUCT_KEY] });
    },
  });
};
