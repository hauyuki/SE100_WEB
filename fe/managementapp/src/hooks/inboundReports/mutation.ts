import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LIST_PRODUCT_KEY } from "../../utils/query-key";
import { InboundReportApis } from "../../api/InboundReportApis";

export const usePostInboundReports = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: InboundReportApis.postInboundReport,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [LIST_PRODUCT_KEY] });
    },
  });
};

export const useDeleteInboundReport = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: InboundReportApis.deleteInboundReport,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [LIST_PRODUCT_KEY] });
    },
  });
};
