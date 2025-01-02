import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LIST_INVENTORY_CHECK_KEY } from "../../utils/query-key";
import { InventoryCheckApis } from "../../api/InventoryCheckApis";

export const usePostInventoryChecks = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: InventoryCheckApis.postInventoryCheck,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [LIST_INVENTORY_CHECK_KEY] });
    },
  });
};
