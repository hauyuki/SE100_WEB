import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  QUERY_KEYS,
  LIST_INBOUND_REPORT_KEY,
  LIST_OUTBOUND_REPORT_KEY,
} from "../../utils/query-key";
import { ShipmentApis } from "../../api/ShipmentApis";
import {
  CreateShipmentRequest,
  UpdateShipmentRequest,
} from "../../models/Shipment";

export const useCreateShipment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (request: CreateShipmentRequest) =>
      ShipmentApis.createShipment(request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.SHIPMENT_LIST] });
    },
  });
};

export const useUpdateShipment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (request: UpdateShipmentRequest) =>
      ShipmentApis.updateShipment(request.id, request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.SHIPMENT_LIST] });
      queryClient.invalidateQueries({ queryKey: [LIST_INBOUND_REPORT_KEY] });
      queryClient.invalidateQueries({ queryKey: [LIST_OUTBOUND_REPORT_KEY] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.STATISTIC_LIST] });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.STATISTIC_CATEGORY],
      });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.STATISTIC_WEEK] });
    },
  });
};
