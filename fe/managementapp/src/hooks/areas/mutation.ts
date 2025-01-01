import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../utils/query-key";
import { AreaApis } from "../../api/AreaApis";
import { CreateAreaRequest, UpdateAreaRequest } from "../../models/Area";

export const useCreateArea = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (request: CreateAreaRequest) => AreaApis.createArea(request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.AREA_LIST] });
    },
  });
};

export const useUpdateArea = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, request }: { id: number; request: UpdateAreaRequest }) =>
      AreaApis.updateArea(id, request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.AREA_LIST] });
    },
  });
};

export const useDeleteArea = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => AreaApis.deleteArea(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.AREA_LIST] });
    },
  });
};
