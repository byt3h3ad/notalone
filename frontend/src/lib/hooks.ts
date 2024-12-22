import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { ENDPOINTS } from "./constants";

export const useGetThoughts = () => {
  const query = useQuery({
    queryKey: ["thoughts"],
    queryFn: () => axios.get(ENDPOINTS.GET_POSTS),
  });
  return query;
};

export const useCreateThought = () => {
  const mutation = useMutation({
    mutationFn: (data: { content: string; emotions: string[] }) =>
      axios.post(ENDPOINTS.CREATE_POST, data),
  });
  return mutation;
};

export const useLikeThought = () => {
  const mutation = useMutation({
    mutationFn: (id: string) => axios.put(`${ENDPOINTS.LIKE_POST}/${id}/like`),
  });
  return mutation;
};
