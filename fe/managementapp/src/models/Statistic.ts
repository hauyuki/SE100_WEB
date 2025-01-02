import { StockReport } from "./Stock";

export interface Statistic {
  stockNumber: number;
  indboundNumber: number;
  inboundNeededNumber: number;
  stockPercent: number;
  inboundPercent: number;
  inboundNeededPercent: number;
  stockPercentChange: string;
  inboundPercentChange: string;
  inboundNeededPercentChange: string;
}
export type CategoryPercentages = {
  [category: string]: number; // Category name as the key, percentage as the value
};
export type WeeklyData = {
  day: string; // Day of the week
  nhap: number; // Inbound quantity
  xuat: number; // Outbound quantity
};
