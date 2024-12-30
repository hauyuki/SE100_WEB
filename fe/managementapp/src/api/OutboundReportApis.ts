import {
  OutboundReport,
  OutboundReportRequest,
} from "../models/OutboundReport";
import { apiDelete, apiGet, apiPatch, apiPost, getFormData } from "../utils";

export const OutboundReportApis = {
  postOutboundReport(request: OutboundReportRequest): Promise<OutboundReport> {
    return apiPost("/outboundReports", request);
  },

  getOutboundReports(): Promise<{ data: OutboundReport[]; total: number }> {
    const response = apiGet("/outboundReports");
    return response;
  },

  getOutboundReportById(id: OutboundReport["id"]): Promise<OutboundReport> {
    return apiGet(`/outboundReports/${id}`);
  },

  putOutboundReports(
    request: Partial<OutboundReport & Pick<OutboundReport, "id">>
  ): Promise<number> {
    return apiPatch(`/outboundReports/${request.id}`, request);
  },

  deleteOutboundReport(id: OutboundReport["id"]): Promise<number> {
    return apiDelete(`/outboundReports/${id}`, { id });
  },

  deleteManyOutboundReports(ids: OutboundReport["id"][]): Promise<number> {
    return apiDelete(`/outboundReports/many`, ids);
  },
};
