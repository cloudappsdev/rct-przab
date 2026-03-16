// src/hooks/useAuthors.ts
import { useQuery } from "@tanstack/react-query";
import { getAuthors } from "@/api/authors";

export function useAuthors() {
  return useQuery({
    queryKey: ["authors"],
    queryFn: async () => {
      const { data, error } = await getAuthors();
      // TanStack Query catches thrown errors automatically
      if (error) throw new Error(error);
      return data;
    },
    retry: 2, // retry failed requests twice before showing error
  });
}
