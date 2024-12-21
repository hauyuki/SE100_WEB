import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../utils/query-key";
import { StatisticApis } from "../../api/StatisticApis";

export const useGetStatistics = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.STATISTIC_LIST],
    queryFn: () => StatisticApis.getAllStatistics(),
  });
};
