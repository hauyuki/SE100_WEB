import { Employee } from "./Employee";
import { Product } from "./Product";

export interface InventoryCheckDetail {
  id: number;
  unitPrice: number;
  stock: number;
  actualQuantity: number;
  loss: number;
  lossValue: number;
  createdDate: string;
  product: Product;
}

// Inventory Check Model
export interface InventoryCheck {
  id: number;
  items: InventoryCheckDetail[];
  totalPrice: number;
  name: string;
  createdDate: string;
  employee: Employee;
}

// Response Model
export interface InventoryCheckResponse {
  data: InventoryCheck[];
  total: number;
}
// Inventory Check Request Item Model
export interface InventoryCheckRequestItem {
  loss: number;
  productId: number;
}

// Inventory Check Request Model
export interface InventoryCheckRequest {
  date: string; // ISO-8601 date format
  name: string;
  employeeId: number;
  items: InventoryCheckRequestItem[];
}
