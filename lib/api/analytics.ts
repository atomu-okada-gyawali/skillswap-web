import axios from "./axios";
import { API } from "./endpoints";

export const getAdminAnalytics = async () => {
  try {
    const response = await axios.get(API.ANALYTICS.GET_ADMIN_STATS);
    return response.data;
  } catch (error: Error | any) {
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Get admin analytics failed",
    );
  }
};
