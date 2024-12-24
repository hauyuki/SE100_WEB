import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../utils/query-key";
import { StockReportApis } from "../../api/StockReportApis";

export const useGetStockReports = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.STOCK_REPORT_LIST],
    queryFn: () => StockReportApis.getAllStockReports(),
  });
};
