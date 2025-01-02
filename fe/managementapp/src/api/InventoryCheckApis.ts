import {
  InventoryCheck,
  InventoryCheckRequest,
} from "../models/InventoryCheck";
import { apiDelete, apiGet, apiPatch, apiPost, getFormData } from "../utils";

export const InventoryCheckApis = {
  postInventoryCheck(request: InventoryCheckRequest): Promise<InventoryCheck> {
    return apiPost("/inventoryChecks", request);
  },

  getInventoryChecks(): Promise<{ data: InventoryCheck[]; total: number }> {
    const response = apiGet("/inventoryChecks");
    return response;
  },

  getInventoryCheckById(id: InventoryCheck["id"]): Promise<InventoryCheck> {
    return apiGet(`/inventoryChecks/${id}`);
  },
};
