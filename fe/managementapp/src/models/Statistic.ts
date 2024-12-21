import { StockReport } from "./Stock";

export interface Statistic {
  id: number;
  date: string;
  items: StockReport[];
}

export interface ListStatisticResponse {
  statistics: Statistic[];
}
