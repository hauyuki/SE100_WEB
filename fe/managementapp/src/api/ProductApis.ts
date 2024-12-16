import {
  ListProductResponse,
  Product,
  UpsertProductModel,
} from "../models/Product";
import { apiGet, apiPut, apiDelete } from "../utils";

export const ProductApis = {
  /**
   * Fetch a product by its ID.
   * @param id - The ID of the product.
   * @returns A promise resolving to a Product.
   */
  getProductById(id: number): Promise<Product> {
    return apiGet(`/products/${id}`);
  },
  getAllProducts(): Promise<ListProductResponse> {
    return apiGet(`/products/all`);
  },

  /**
   * Update a product by its ID.
   * @param id - The ID of the product to update.
   * @param request - The updated product data.
   * @returns A promise resolving to the updated Product.
   */
  updateProduct(request: UpsertProductModel): Promise<Product> {
    return apiPut(`/products/${request.id}`, request);
  },
  postProduct(request: UpsertProductModel): Promise<Product> {
    return apiPut(`/products/`, request);
  },

  /**
   * Delete a product by its ID.
   * @param id - The ID of the product to delete.
   * @returns A promise resolving to the deleted Product.
   */
  deleteProduct(id: number): Promise<Product> {
    return apiDelete(`/products/${id}`);
  },
};
