"use server";

import { revalidatePath } from "next/cache";
import {
  createFavorite,
  deleteFavorite,
  getFavorites,
  getUserFavoritePostIds,
} from "../api/favorite";

export const handleCreateFavorite = async (postId: string) => {
  try {
    const response = await createFavorite(postId);
    if (response.success) {
      revalidatePath("/dashboard/explore");
      revalidatePath("/dashboard/favorites");
      return {
        success: true,
        message: "Post favorited successfully",
        data: response.data,
      };
    }
    return {
      success: false,
      message: response.message || "Favorite creation failed",
    };
  } catch (error: Error | any) {
    return {
      success: false,
      message: error.message || "Favorite creation action failed",
    };
  }
};

export const handleDeleteFavorite = async (postId: string) => {
  try {
    const response = await deleteFavorite(postId);
    if (response.success) {
      revalidatePath("/dashboard/explore");
      revalidatePath("/dashboard/favorites");
      return {
        success: true,
        message: "Favorite removed successfully",
      };
    }
    return {
      success: false,
      message: response.message || "Favorite removal failed",
    };
  } catch (error: Error | any) {
    return {
      success: false,
      message: error.message || "Favorite removal action failed",
    };
  }
};

export const handleGetFavorites = async (page?: string, size?: string) => {
  try {
    const currentPage = parseInt(page || "1") || 1;
    const currentSize = parseInt(size || "10") || 10;

    const response = await getFavorites(currentPage, currentSize);
    if (response.success) {
      return {
        success: true,
        message: "Get favorites successful",
        data: response.data,
        pagination: response.pagination,
      };
    }
    return {
      success: false,
      message: response.message || "Get favorites failed",
    };
  } catch (error: Error | any) {
    return {
      success: false,
      message: error.message || "Get favorites action failed",
    };
  }
};

export const handleGetUserFavoritePostIds = async () => {
  try {
    const response = await getUserFavoritePostIds();
    if (response.success) {
      return {
        success: true,
        message: "Get favorite post IDs successful",
        data: response.data,
      };
    }
    return {
      success: false,
      message: response.message || "Get favorite post IDs failed",
    };
  } catch (error: Error | any) {
    return {
      success: false,
      message: error.message || "Get favorite post IDs action failed",
    };
  }
};
