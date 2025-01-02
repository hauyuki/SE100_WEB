import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  QUERY_KEYS,
  LIST_EMPLOYEE_KEY,
  LIST_OUTBOUND_REPORT_KEY,
} from "../../utils/query-key";
import { EmployeeApis } from "../../api/EmployeeApis";
import { EmployeeRequest, Employee } from "../../models/Employee";

export const useCreateEmployee = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (request: EmployeeRequest) =>
      EmployeeApis.createEmployee(request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [LIST_EMPLOYEE_KEY] });
    },
  });
};

export const useUpdateEmployee = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (request: EmployeeRequest) =>
      EmployeeApis.updateEmployee(request.id ?? 0, request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [LIST_EMPLOYEE_KEY] });
    },
  });
};
export const useUpdateEmployeeWithPassword = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (request: EmployeeRequest) =>
      EmployeeApis.updateEmployeeWithPassword(request.id ?? 0, request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [LIST_EMPLOYEE_KEY] });
    },
  });
};
