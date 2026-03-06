"use server";

import { getAdminAnalytics } from "../api/analytics";

export const handleGetAdminAnalytics = async () => {
  try {
    const response = await getAdminAnalytics();
    if (response.success) {
      return {
        success: true,
        message: "Admin analytics retrieved successfully",
        data: response.data,
      };
    }
    return {
      success: false,
      message: response.message || "Failed to retrieve admin analytics",
    };
  } catch (error: Error | any) {
    return {
      success: false,
      message: error.message || "Admin analytics action failed",
    };
  }
};
