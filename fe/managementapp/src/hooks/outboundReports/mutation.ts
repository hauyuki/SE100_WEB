import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LIST_OUTBOUND_REPORT_KEY } from "../../utils/query-key";
import { OutboundReportApis } from "../../api/OutboundReportApis";

export const usePostOutboundReports = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: OutboundReportApis.postOutboundReport,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [LIST_OUTBOUND_REPORT_KEY] });
    },
  });
};

export const useDeleteOutboundReport = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: OutboundReportApis.deleteOutboundReport,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [LIST_OUTBOUND_REPORT_KEY] });
    },
  });
};
