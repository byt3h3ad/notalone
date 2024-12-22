export const CONSTANTS = {
  BACKEND_URI: "http://127.0.0.1:8000/",
};

export const ENDPOINTS = {
  GET_POSTS: CONSTANTS.BACKEND_URI + "thoughts",
  CREATE_POST: CONSTANTS.BACKEND_URI + "thoughts",
  GET_POST: CONSTANTS.BACKEND_URI + "thoughts",
  DELETE_POST: CONSTANTS.BACKEND_URI + "thoughts",
  LIKE_POST: CONSTANTS.BACKEND_URI + "thoughts",
  POSTS_COUNT: CONSTANTS.BACKEND_URI + "thoughts/stats/count",
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
