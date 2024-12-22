import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { ENDPOINTS } from "./constants";

export const useLikeThought = () => {
  const mutation = useMutation({
    mutationFn: (id: string) => axios.put(`${ENDPOINTS.LIKE_POST}/${id}/like`),
  });
  return mutation;
};
