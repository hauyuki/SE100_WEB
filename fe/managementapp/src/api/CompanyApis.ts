import {
  Company,
  CreateCompanyRequest,
  UpdateCompanyRequest,
  ListCompanyResponse,
} from "../models/Company";
import { apiGet, apiPost, apiPut, apiDelete } from "../utils/ApiRequest";

export const CompanyApis = {
  // Get all companies
  getAllCompanies(): Promise<ListCompanyResponse> {
    return apiGet("/companies");
  },

  // Create new company
  createCompany(request: CreateCompanyRequest): Promise<Company> {
    return apiPost("/companies", request);
  },

  // Update company
  updateCompany(id: number, request: UpdateCompanyRequest): Promise<Company> {
    return apiPut(`/companies/${id}`, request);
  },

  // Delete company
  deleteCompany(id: number): Promise<void> {
    return apiDelete(`/companies/${id}`);
  },
};
