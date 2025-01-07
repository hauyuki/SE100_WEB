import { useQuery } from "@tanstack/react-query";
import { LIST_INBOUND_REPORT_KEY } from "../../utils/query-key";
import { InboundReportApis } from "../../api/InboundReportApis";

export const useGetInboundReports = () => {
  return useQuery({
    queryKey: [LIST_INBOUND_REPORT_KEY],
    queryFn: () => InboundReportApis.getInboundReports(),
  });
};
export const useGetInboundReportDetail = (id: number) => {
  return useQuery({
    queryKey: [LIST_INBOUND_REPORT_KEY, id],
    queryFn: () => InboundReportApis.getInboundReportById(id),
  });
};
