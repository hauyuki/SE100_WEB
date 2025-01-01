import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../utils/query-key";
import { CategoriesApi } from "../../api/CategoryApi";

// export const useCreateCategory = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: (request: CreateCategoryRequest) =>
//       CategoryApis.createCategory(request),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.COMPANY_LIST] });
//     },
//   });
// };

// export const useUpdateCategory = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: ({
//       id,
//       request,
//     }: {
//       id: number;
//       request: UpdateCategoryRequest;
//     }) => CategoryApis.updateCategory(id, request),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.COMPANY_LIST] });
//     },
//   });
// };

// export const useDeleteCategory = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: (id: number) => CategoryApis.deleteCategory(id),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.COMPANY_LIST] });
//     },
//   });
// };
