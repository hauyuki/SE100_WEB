import { useQuery } from "@tanstack/react-query";
import { LIST_EMPLOYEE_KEY } from "../../utils/query-key";
import { EmployeeApis } from "../../api/EmployeeApis";

export const useGetEmployees = () => {
  return useQuery({
    queryKey: [LIST_EMPLOYEE_KEY],
    queryFn: () => EmployeeApis.getAllEmployees(),
  });
};
