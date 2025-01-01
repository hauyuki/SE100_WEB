import { InboundReport, InboundReportRequest } from "../models";
import { apiDelete, apiGet, apiPatch, apiPost, getFormData } from "../utils";

export const InboundReportApis = {
  postInboundReport(request: InboundReportRequest): Promise<InboundReport> {
    return apiPost("/inboundReports", request);
  },

  getInboundReports(): Promise<{ data: InboundReport[]; total: number }> {
    const response = apiGet("/inboundReports");
    return response;
  },

  getInboundReportById(id: InboundReport["id"]): Promise<InboundReport> {
    return apiGet(`/inboundReports/${id}`);
  },

  putInboundReports(
    request: Partial<InboundReport & Pick<InboundReport, "id">>
  ): Promise<number> {
    return apiPatch(`/inboundReports/${request.id}`, request);
  },

  deleteInboundReport(id: InboundReport["id"]): Promise<number> {
    return apiDelete(`/inboundReports/${id}`, { id });
  },

  deleteManyInboundReports(ids: InboundReport["id"][]): Promise<number> {
    return apiDelete(`/inboundReports/many`, ids);
  },
};
