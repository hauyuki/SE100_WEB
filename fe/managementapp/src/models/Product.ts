import { Category } from "./Category";
import { Company } from "./Company";
import { Tag } from "./Tag";

export type Product = {
  name: string;
  id: number;
  sku: string;
  marketPrice: string; // Using string to handle BigDecimal values in Java
  productionCost: string; // Using string to handle BigDecimal values in Java
  image: string;
  minQuantity: number;
  maxQuantity: number;
  category: Category;
  company: Company;
  tags: Tag[];
};

export interface UpsertProductModel {
  id?: number;
  name: string;
  sku: string;
  marketPrice: number; // Assumes BigDecimal maps to number
  productionCost: number; // Assumes BigDecimal maps to number
  image: string;
  minQuantity: number;
  maxQuantity: number;
  categoryId: number; // Foreign key for the category
  companyId: number; // Foreign key for the company
  tagIds: number[]; // Array of tag IDs
}

export type ListProductResponse = {
  productList: Product[];
};
