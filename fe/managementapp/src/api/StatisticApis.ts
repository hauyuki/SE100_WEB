import { ListStatisticResponse } from "../models/Statistic";
import { apiGet } from "../utils/ApiRequest";

export const StatisticApis = {
  // Get all statistics
  getAllStatistics(): Promise<ListStatisticResponse> {
    return apiGet("/statistics");
  },
};
