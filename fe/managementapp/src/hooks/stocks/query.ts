import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS, STOCK_REPORT_RANGE } from "../../utils/query-key";
import { StockReportApis } from "../../api/StockReportApis";
import { StockReportRequest } from "../../models/StockReport";

export const useGetStockReports = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.STOCK_REPORT_LIST],
    queryFn: () => StockReportApis.getAllStockReports(),
  });
};
export const useGetStockReportDetail = (id: number) => {
  return useQuery({
    queryKey: [QUERY_KEYS.STOCK_REPORT_LIST, id],
    queryFn: () => StockReportApis.getStockReport(id),
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
export const useCreateStockReport = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (request: StockReportRequest) =>
      StockReportApis.creeateStockReport(request),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.STOCK_REPORT_LIST],
      });
    },
  });
};
