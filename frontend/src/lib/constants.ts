export const CONSTANTS = {
  BACKEND_URI: "http://127.0.0.1:8000/",
};

export const ENDPOINTS = {
  GET_POSTS: CONSTANTS.BACKEND_URI + "thoughts",
  CREATE_POST: CONSTANTS.BACKEND_URI + "thoughts",
  GET_POST: CONSTANTS.BACKEND_URI + "thoughts/",
  DELETE_POST: CONSTANTS.BACKEND_URI + "thoughts/",
  LIKE_POST: CONSTANTS.BACKEND_URI + "thoughts",
  POSTS_COUNT: CONSTANTS.BACKEND_URI + "thoughts/stats/count",
};
