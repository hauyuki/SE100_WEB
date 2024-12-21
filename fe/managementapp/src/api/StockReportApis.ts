import { ListStockReportResponse } from "../models/Stock";
import { apiGet } from "../utils/ApiRequest";

export const StockReportApis = {
  // Get all stock reports
  getAllStockReports(): Promise<ListStockReportResponse> {
    return apiGet("/stocks");
  },
};
