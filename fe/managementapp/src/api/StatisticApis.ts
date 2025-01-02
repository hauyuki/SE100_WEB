import {
  CategoryPercentages,
  Statistic,
  WeeklyData,
} from "../models/Statistic";
import { apiGet } from "../utils/ApiRequest";

export const StatisticApis = {
  // Get all statistics
  getAllStatistics(): Promise<Statistic> {
    return apiGet("/statistics");
  },
  getCategoryStatistic(): Promise<{ name: string; value: number }[]> {
    return apiGet("/statistics/category-percentages");
  },
  getWeekStatistic(): Promise<WeeklyData[]> {
    return apiGet("/statistics/week");
  },
};
