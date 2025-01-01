import { Area, CreateAreaRequest, UpdateAreaRequest } from "../models/Area";
import { apiGet, apiPost, apiPut, apiDelete } from "../utils/ApiRequest";

export const AreaApis = {
  // Get tag by ID
  getAreaById(id: number): Promise<Area> {
    return apiGet(`/areas/${id}`);
  },

  // Get all areas
  getAllAreas(): Promise<Area[]> {
    return apiGet("/areas");
  },

  // Create new tag
  createArea(request: CreateAreaRequest): Promise<Area> {
    return apiPost("/areas", request);
  },

  // Update tag
  updateArea(id: number, request: UpdateAreaRequest): Promise<Area> {
    return apiPut(`/areas/${id}`, request);
  },

  // Delete tag
  deleteArea(id: number): Promise<void> {
    return apiDelete(`/areas/${id}`);
  },
};
