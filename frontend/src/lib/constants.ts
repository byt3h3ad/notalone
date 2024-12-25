const BACKEND_URI = import.meta.env.DEV
  ? "http://127.0.0.1:8000/"
  : "https://notalone-4f0d.onrender.com/";

export const ENDPOINTS = {
  GET_POSTS: BACKEND_URI + "thoughts",
  CREATE_POST: BACKEND_URI + "thoughts",
  GET_POST: BACKEND_URI + "thoughts",
  DELETE_POST: BACKEND_URI + "thoughts",
  LIKE_POST: BACKEND_URI + "thoughts/like",
  POSTS_COUNT: BACKEND_URI + "thoughts/stats/count",
};

export const EMOTIONS: string[] = [
  "I Don't Know",
  "Anger",
  "Irritability",
  "Sadness",
  "Despair",
  "Anxiety",
  "Fear",
  "Guilt",
  "Shame",
  "Loneliness",
  "Isolation",
  "Overwhelm",
  "Stress",
  "Confusion",
  "Uncertainty",
  "Frustration",
  "Helplessness",
  "Insecure",
  "Low Self-Esteem",
  "Grief",
  "Loss",
  "Relax & Calm",
];
