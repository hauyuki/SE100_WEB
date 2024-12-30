// Assuming we already have types for Product and Shipment as in the Inbound report

import { Product } from "./Product";
import { Shipment } from "./Shipment";

// Define the Shipment type (same as inbound)
export type ShipmentRequest = {
  date: string; // ISO 8601 format date
  carrier: string;
  employeeId: number;
};

// Define the ItemRequest type (same as inbound)
export type ItemRequest = {
  quantity: number;
  unitPrice: number;
  productId: number;
};

// Define the root object type for the OutboundReportRequest
export type OutboundReportRequest = {
  date: string; // ISO 8601 format date
  quantity: number; // Total quantity of items to ship out
  shipment: ShipmentRequest; // Shipment details
  items: ItemRequest[]; // Items being shipped out
};

// Define the OutboundReportItem type which includes product information
export type OutboundReportItem = {
  id: number;
  quantity: number;
  totalPrice: number;
  unitPrice: number;
  productId: number;
  product: Product; // Include the product details in outbound report item
};

// Define the full OutboundReport type, which includes the shipment and items
export type OutboundReport = {
  id: number;
  date: string; // ISO date for the report
  quantity: number; // Total quantity of items
  price: number; // Total price of the shipped items
  shipment: Shipment; // Shipment object
  items: OutboundReportItem[]; // Array of items that were shipped
};
