import {
  Shipment,
  CreateShipmentRequest,
  UpdateShipmentRequest,
  ListShipmentResponse,
} from "../models/Shipment";
import { apiGet, apiPost, apiPut } from "../utils/ApiRequest";

export const ShipmentApis = {
  // Get all shipments
  getAllShipments(): Promise<ListShipmentResponse> {
    return apiPost("/shipments/list", {});
  },

  // Create new shipment
  createShipment(request: CreateShipmentRequest): Promise<Shipment> {
    return apiPost("/shipments/list", request);
  },

  // Update shipment
  updateShipment(
    id: number,
    request: UpdateShipmentRequest
  ): Promise<Shipment> {
    return apiPut(`/shipments/${id}`, request);
  },
};
