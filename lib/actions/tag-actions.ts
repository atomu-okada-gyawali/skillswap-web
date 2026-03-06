"use server";

import { getAllTags, getTagById } from "../api/tag";

export const handleGetAllTags = async () => {
  try {
    const response = await getAllTags();
    if (response.success) {
      return {
        success: true,
        message: "Get all tags successful",
        data: response.data,
      };
    }
    return {
      success: false,
      message: response.message || "Get all tags failed",
    };
  } catch (error: Error | any) {
    return {
      success: false,
      message: error.message || "Get all tags action failed",
    };
  }
};

export const handleGetOneTag = async (id: string) => {
  try {
    const response = await getTagById(id);
    if (response.success) {
      return {
        success: true,
        message: "Get tag by id successful",
        data: response.data,
      };
    }
    return {
      success: false,
      message: response.message || "Get tag by id failed",
    };
  } catch (error: Error | any) {
    return {
      success: false,
      message: error.message || "Get tag by id action failed",
    };
  }
};
