import { Product } from "./Product";

// StockReportItem: Defines each item in the stock report
export type StockReportItem = {
  id: number; // Unique identifier for the item in the report
  product: Product;
  quantity: number; // Total quantity available
  outboundQuantity: number; // Quantity already shipped out
  expiredQuantity: number; // Quantity that is expired (if any)
  createdDate: string; // Date when the product was created or added
};

// StockReport: Defines the overall report, including a date and a list of StockReportItems
export type StockReport = {
  id: number; // Unique ID for the stock report
  date: string; // Report date in ISO 8601 format
  items: StockReportItem[]; // List of items in the report
};
