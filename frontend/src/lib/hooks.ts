import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { queryClient } from "../main";
import { ENDPOINTS } from "./constants";

export const useGetThoughts = () => {
  const query = useQuery({
    queryKey: ["thoughts"],
    queryFn: () => axios.get(ENDPOINTS.GET_POSTS),
  });
  return query;
};

export const useGetThought = (id: string) => {
  const query = useQuery({
    queryKey: ["thought", { id }],
    queryFn: () => axios.get(`${ENDPOINTS.GET_POST}/${id}`),
  });
  return query;
};

export const useCreateThought = () => {
  const mutation = useMutation({
    mutationFn: (data: { content: string; emotions: string[] }) =>
      axios.post(ENDPOINTS.CREATE_POST, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["thoughts_count"] });
    },
  });
  return mutation;
};

export const useGetLikeCount = (id: string) => {
  const query = useQuery({
    queryKey: ["likes", { id }],
    queryFn: () => axios.get(`${ENDPOINTS.LIKE_POST}/${id}`),
  });
  return query;
};

export const useLikeThought = () => {
  const mutation = useMutation({
    mutationFn: (id: string) => axios.put(`${ENDPOINTS.LIKE_POST}/${id}`),
  });
  return mutation;
};

export const useDeleteThought = () => {
  const mutation = useMutation({
    mutationFn: (id: string) => axios.delete(`${ENDPOINTS.DELETE_POST}/${id}`),
  });
  return mutation;
};

export const useGetThoughtCount = () => {
  const query = useQuery({
    queryKey: ["thoughts_count"],
    queryFn: () => axios.get(ENDPOINTS.POSTS_COUNT),
  });
  return query;
};
