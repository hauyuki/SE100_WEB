import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../utils/query-key";
import { StatisticApis } from "../../api/StatisticApis";

// Query to fetch all statistics
export const useGetStatistics = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.STATISTIC_LIST],
    queryFn: () => StatisticApis.getAllStatistics(),
  });
};

// Query to fetch category percentages
export const useGetCategoryStatistic = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.STATISTIC_CATEGORY],
    queryFn: () => StatisticApis.getCategoryStatistic(),
  });
};

// Query to fetch weekly statistics
export const useGetWeekStatistic = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.STATISTIC_WEEK],
    queryFn: () => StatisticApis.getWeekStatistic(),
  });
};
