import { Category } from "../models";
import { apiDelete, apiGet, apiPatch, apiPost, getFormData } from "../utils";

export const CategoriesApi = {
  postCategory(request: Omit<Category, "id">): Promise<string> {
    return apiPost("/categories", request);
  },

  getCategories(): Promise<Category[]> {
    const response = apiGet("/categories");
    return response;
  },

  getCategoryById(id: Category["id"]): Promise<Category> {
    return apiGet(`/categories/${id}`);
  },

  putCategories(
    request: Partial<Category & Pick<Category, "id">>
  ): Promise<number> {
    return apiPatch(`/categories/${request.id}`, request);
  },

  deleteCategory(id: Category["id"]): Promise<number> {
    return apiDelete(`/categories/${id}`, { id });
  },

  deleteManyCategories(ids: Category["id"][]): Promise<number> {
    return apiDelete(`/categories/many`, ids);
  },
};
