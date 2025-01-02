import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../utils/query-key";
import { ShipmentApis } from "../../api/ShipmentApis";
import { EmployeeApis } from "../../api/EmployeeApis";

export const useGetEmployees = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.SHIPMENT_LIST],
    queryFn: () => EmployeeApis.getAllEmployees(),
  });
};
