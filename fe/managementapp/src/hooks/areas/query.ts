import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../utils/query-key";
import { AreaApis } from "../../api/AreaApis";

export const useGetArea = (id: number) => {
  return useQuery({
    queryKey: [QUERY_KEYS.AREA, id],
    queryFn: () => AreaApis.getAreaById(id),
  });
};

export const useGetAreas = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.AREA_LIST],
    queryFn: () => AreaApis.getAllAreas(),
  });
};
