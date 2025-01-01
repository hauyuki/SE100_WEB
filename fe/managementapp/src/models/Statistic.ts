import { StockReport } from "./Stock";

export interface Statistic {
  id: number;
  date: string;
  items: StockReport[];
}
