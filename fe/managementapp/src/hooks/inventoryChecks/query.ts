import { useQuery } from "@tanstack/react-query";
import { LIST_INVENTORY_CHECK_KEY } from "../../utils/query-key";
import { InventoryCheckApis } from "../../api/InventoryCheckApis";

export const useGetInventoryChecks = () => {
  return useQuery({
    queryKey: [LIST_INVENTORY_CHECK_KEY],
    queryFn: () => InventoryCheckApis.getInventoryChecks(),
  });
};
export const useGetInventoryCheckDetail = (id: number) => {
  return useQuery({
    queryKey: [LIST_INVENTORY_CHECK_KEY, id],
    queryFn: () => InventoryCheckApis.getInventoryCheckById(id),
  });
};
