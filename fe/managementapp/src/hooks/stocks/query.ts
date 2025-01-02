import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS, STOCK_REPORT_RANGE } from "../../utils/query-key";
import { StockReportApis } from "../../api/StockReportApis";

export const useGetStockReports = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.STOCK_REPORT_LIST],
    queryFn: () => StockReportApis.getAllStockReports(),
  });
};
export const useGetStockReportDateRanges = (request: {
  startDate: string;
  endDate: string;
}) => {
  return useQuery({
    queryKey: [STOCK_REPORT_RANGE],
    queryFn: () => StockReportApis.getDateRangeStockReport(request),
    enabled: request.startDate !== "" && request.endDate !== "",
  });
};
