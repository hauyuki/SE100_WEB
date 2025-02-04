import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LIST_INBOUND_REPORT_KEY, QUERY_KEYS } from "../../utils/query-key";
import { InboundReportApis } from "../../api/InboundReportApis";

export const usePostInboundReports = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: InboundReportApis.postInboundReport,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [LIST_INBOUND_REPORT_KEY] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.STATISTIC_LIST] });
    },
  });
};

export const useDeleteInboundReport = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: InboundReportApis.deleteInboundReport,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [LIST_INBOUND_REPORT_KEY] });
    },
  });
};
