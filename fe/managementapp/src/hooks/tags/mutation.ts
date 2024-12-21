import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../utils/query-key";
import { TagApis } from "../../api/TagApis";
import { CreateTagRequest, UpdateTagRequest } from "../../models/Tag";

export const useCreateTag = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (request: CreateTagRequest) => TagApis.createTag(request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.TAG_LIST] });
    },
  });
};

export const useUpdateTag = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, request }: { id: number; request: UpdateTagRequest }) =>
      TagApis.updateTag(id, request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.TAG_LIST] });
    },
  });
};

export const useDeleteTag = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => TagApis.deleteTag(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.TAG_LIST] });
    },
  });
};
