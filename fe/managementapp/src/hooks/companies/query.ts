import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../utils/query-key";
import { CompanyApis } from "../../api/CompanyApis";

export const useGetCompanies = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.COMPANY_LIST],
    queryFn: () => CompanyApis.getAllCompanies(),
  });
};
