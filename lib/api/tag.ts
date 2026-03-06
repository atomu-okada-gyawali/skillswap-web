import axios from "./axios";
import { API } from "./endpoints";

export const getTagById = async (id: string) => {
  try {
    const response = await axios.get(API.TAG.GET_ONE(id));
    return response.data;
  } catch (error: Error | any) {
    throw new Error(
      error.response?.data?.message || error.message || "Get tag by id failed",
    );
  }
};

export const getAllTags = async () => {
  try {
    const response = await axios.get(API.TAG.GET_ALL);
    return response.data;
  } catch (error: Error | any) {
    throw new Error(
      error.response?.data?.message || error.message || "Get all tags failed",
    );
  }
};
