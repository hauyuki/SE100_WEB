import { Product } from "./Product";

export interface StockReport {
  id: number;
  product: Product;
  quantity: number;
  outboundQuantity: number;
  expiredQuantity: number;
  createdDate: string;
}

export interface ListStockReportResponse {
  reports: StockReport[];
}
