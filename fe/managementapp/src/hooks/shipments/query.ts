import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../utils/query-key";
import { ShipmentApis } from "../../api/ShipmentApis";

export const useGetShipments = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.SHIPMENT_LIST],
    queryFn: () => ShipmentApis.getAllShipments(),
  });
};
