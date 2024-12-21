import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../utils/query-key";
import { TagApis } from "../../api/TagApis";

export const useGetTag = (id: number) => {
  return useQuery({
    queryKey: [QUERY_KEYS.TAG, id],
    queryFn: () => TagApis.getTagById(id),
  });
};

export const useGetTags = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.TAG_LIST],
    queryFn: () => TagApis.getAllTags(),
  });
};
