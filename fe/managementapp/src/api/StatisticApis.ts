import { Statistic } from "../models/Statistic";
import { apiGet } from "../utils/ApiRequest";

export const StatisticApis = {
  // Get all statistics
  getAllStatistics(): Promise<Statistic> {
    return apiGet("/statistics");
  },
};
