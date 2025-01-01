import { useQuery } from "@tanstack/react-query";
import { LIST_CATEGORY_KEY } from "../../utils/query-key";
import { CategoriesApi } from "../../api/CategoryApi";

export const useGetCategories = () => {
  return useQuery({
    queryKey: [LIST_CATEGORY_KEY],
    queryFn: () => CategoriesApi.getCategories(),
  });
};
