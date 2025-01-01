import {
  Tag,
  CreateTagRequest,
  UpdateTagRequest,
  ListTagResponse,
} from "../models/Tag";
import { apiGet, apiPost, apiPut, apiDelete } from "../utils/ApiRequest";

export const TagApis = {
  // Get tag by ID
  getTagById(id: number): Promise<Tag> {
    return apiGet(`/tags/${id}`);
  },

  // Get all tags
  getAllTags(): Promise<Tag[]> {
    return apiGet("/tags/list");
  },

  // Create new tag
  createTag(request: CreateTagRequest): Promise<Tag> {
    return apiPost("/tags", request);
  },

  // Update tag
  updateTag(id: number, request: UpdateTagRequest): Promise<Tag> {
    return apiPut(`/tags/${id}`, request);
  },

  // Delete tag
  deleteTag(id: number): Promise<void> {
    return apiDelete(`/tags/${id}`);
  },
};
