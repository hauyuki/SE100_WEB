import { Product } from "./Product";

// StockReportItem: Defines each item in the stock report
export type StockReportItem = {
  id: number; // Unique identifier for the item in the report
  product: Product;
  quantity: number; // Total quantity available
  outboundQuantity: number; // Quantity already shipped out
  expiredQuantity: number; // Quantity that is expired (if any)
  createdDate: string; // Date when the product was created or added
  inboundQuantity: number;
  stockQuantity: number;
  inboundPrice: number;
  outboundPrice: number;
  needInboundQuantity: number;
};

// StockReport: Defines the overall report, including a date and a list of StockReportItems
export type StockReport = {
  id: number;
  items: StockReportItem[];
  name: string;
  startDate: string; // ISO date string
  endDate: string; // ISO date string
  inboundQuantity: number;
  outboundQuantity: number;
  stockQuantity: number;
  inboundPrice: number;
  outboundPrice: number;
  totalPrice: number;
  needInboundQuantity: number | null;
};
export type StockReportRequest = {
  startDate: string;
  endDate: string;
  name: string;
};
