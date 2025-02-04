import { useQuery } from "@tanstack/react-query";
import { LIST_OUTBOUND_REPORT_KEY } from "../../utils/query-key";
import { OutboundReportApis } from "../../api/OutboundReportApis";

export const useGetOutboundReports = () => {
  return useQuery({
    queryKey: [LIST_OUTBOUND_REPORT_KEY],
    queryFn: () => OutboundReportApis.getOutboundReports(),
  });
};
export const useGetOutboundReportDetail = (id: number) => {
  return useQuery({
    queryKey: [LIST_OUTBOUND_REPORT_KEY, id],
    queryFn: () => OutboundReportApis.getOutboundReportById(id),
  });
};
