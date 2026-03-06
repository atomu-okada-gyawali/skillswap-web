import axios from "./axios";
import { API } from "./endpoints";

export const createFavorite = async (postId: string) => {
  try {
    const response = await axios.post(API.FAVORITE.CREATE, { postId });
    return response.data;
  } catch (error: Error | any) {
    throw new Error(
      error.response?.data?.message || error.message || "Create favorite failed",
    );
  }
};

export const deleteFavorite = async (postId: string) => {
  try {
    const response = await axios.delete(API.FAVORITE.DELETE(postId));
    return response.data;
  } catch (error: Error | any) {
    throw new Error(
      error.response?.data?.message || error.message || "Delete favorite failed",
    );
  }
};

export const getFavorites = async (page?: number, size?: number) => {
  try {
    const response = await axios.get(API.FAVORITE.GET_ALL, {
      params: { page, size },
    });
    return response.data;
  } catch (error: Error | any) {
    throw new Error(
      error.response?.data?.message || error.message || "Get favorites failed",
    );
  }
};

export const checkFavorite = async (postId: string) => {
  try {
    const response = await axios.get(API.FAVORITE.CHECK(postId));
    return response.data;
  } catch (error: Error | any) {
    throw new Error(
      error.response?.data?.message || error.message || "Check favorite failed",
    );
  }
};

export const getUserFavoritePostIds = async () => {
  try {
    const response = await axios.get(API.FAVORITE.GET_POST_IDS);
    return response.data;
  } catch (error: Error | any) {
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Get favorite post IDs failed",
    );
  }
};
