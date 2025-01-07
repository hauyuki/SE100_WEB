import { WeeklyData } from "../models/Statistic";
import { ListStockReportResponse } from "../models/Stock";
import { StockReport } from "../models/StockReport";
import { apiGet, apiPost } from "../utils/ApiRequest";

export const StockReportApis = {
  // Get all stock reports
  getAllStockReports(): Promise<StockReport[]> {
    return apiGet("/stocks");
  },
  getStockReport(id: number): Promise<StockReport> {
    return apiGet(`/stocks/${id}`);
  },
  getDateRangeStockReport(request: {
    startDate: string;
    endDate: string;
  }): Promise<WeeklyData[]> {
    return apiPost("/stocks/dateRange", request);
  },
  creeateStockReport(request: {
    startDate: string;
    endDate: string;
    name: string;
  }): Promise<StockReport> {
    return apiPost("/stocks", request);
  },
};
