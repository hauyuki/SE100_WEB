import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../utils/query-key";
import { CompanyApis } from "../../api/CompanyApis";
import {
  CreateCompanyRequest,
  UpdateCompanyRequest,
} from "../../models/Company";

export const useCreateCompany = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (request: CreateCompanyRequest) =>
      CompanyApis.createCompany(request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.COMPANY_LIST] });
    },
  });
};

export const useUpdateCompany = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      request,
    }: {
      id: number;
      request: UpdateCompanyRequest;
    }) => CompanyApis.updateCompany(id, request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.COMPANY_LIST] });
    },
  });
};

export const useDeleteCompany = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => CompanyApis.deleteCompany(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.COMPANY_LIST] });
    },
  });
};
