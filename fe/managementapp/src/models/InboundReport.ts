import { Product } from "./Product";
import { Shipment } from "./Shipment";

// Define the Shipment type
export type ShipmentRequest = {
  date: string; // ISO 8601 format date
  carrier: string;
  employeeId: number;
  fromLocation: string;
  toLocation: string;
  type: string;
  status: string;
  completedDate: string;
};

// Define the Item export type
export type ItemRequest = {
  quantity: number;
  unitPrice: number;
  manufactoringDate: string; // ISO 8601 format date
  expirationDate: string; // ISO 8601 format date
  productId: number;
};

// Define the root object type which includes the shipment and items
export type InboundReportRequest = {
  date: string; // ISO 8601 format date
  shipment: ShipmentRequest;
  items: ItemRequest[];
};

export type InboundReportItem = {
  id: number;
  quantity: number;
  expirationDate: string; // ISO date
  totalPrice: number;
  unitPrice: number;
  manufactoringDate: string; // ISO date
  stockQuantity: number;
  product: Product;
};

// Define the main InboundReport type
export type InboundReport = {
  id: number;
  date: string; // ISO date
  quantity: number;
  price: number;
  shipment: Shipment;
  items: InboundReportItem[];
};
