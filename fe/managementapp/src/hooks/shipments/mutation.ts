import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../utils/query-key";
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
    mutationFn: ({
      id,
      request,
    }: {
      id: number;
      request: UpdateShipmentRequest;
    }) => ShipmentApis.updateShipment(id, request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.SHIPMENT_LIST] });
    },
  });
};
