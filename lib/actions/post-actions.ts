"use server";

import { revalidatePath } from "next/cache";
import {
  createPost,
  deletePost,
  getAllPosts,
  getMyPosts,
  getPostById,
  updatePost,
} from "../api/post";

export const handleCreatePost = async (data: FormData) => {
  try {
    const response = await createPost(data);
    if (response.success) {
      revalidatePath("/posts");
      return {
        success: true,
        message: "Post created successfully",
        data: response.data,
      };
    }
    return {
      success: false,
      message: response.message || "Post creation failed",
    };
  } catch (error: Error | any) {
    return {
      success: false,
      message: error.message || "Post creation action failed",
    };
  }
};

export const handleGetAllPosts = async (
  page: string,
  size: string,
  search?: string,
  excludeUserId?: string,
) => {
  try {
    const currentPage = parseInt(page) || 1;
    const currentSize = parseInt(size) || 10;

    const response = await getAllPosts(
      currentPage,
      currentSize,
      search,
      excludeUserId,
    );
    if (response.success) {
      return {
        success: true,
        message: "Get all posts successful",
        data: response.data,
        pagination: response.pagination,
      };
    }
    return {
      success: false,
      message: response.message || "Get all posts failed",
    };
  } catch (error: Error | any) {
    return {
      success: false,
      message: error.message || "Get all posts action failed",
    };
  }
};
export const handleGetMyPosts = async (
  page: string,
  size: string,
  search?: string,
) => {
  try {
    const currentPage = parseInt(page) || 1;
    const currentSize = parseInt(size) || 10;

    const response = await getMyPosts(currentPage, currentSize, search);
    if (response.success) {
      return {
        success: true,
        message: "Get my posts successful",
        data: response.data,
        pagination: response.pagination,
      };
    }
    return {
      success: false,
      message: response.message || "Get my posts failed",
    };
  } catch (error: Error | any) {
    return {
      success: false,
      message: error.message || "Get my posts action failed",
    };
  }
};
export const handleGetOnePost = async (id: string) => {
  try {
    const response = await getPostById(id);
    if (response.success) {
      return {
        success: true,
        message: "Get post by id successful",
        data: response.data,
      };
    }
    return {
      success: false,
      message: response.message || "Get post by id failed",
    };
  } catch (error: Error | any) {
    return {
      success: false,
      message: error.message || "Get post by id action failed",
    };
  }
};

export const handleUpdatePost = async (id: string, data: FormData) => {
  try {
    const response = await updatePost(id, data);
    if (response.success) {
      revalidatePath("/posts");
      return {
        success: true,
        message: "Update post successful",
        data: response.data,
      };
    }
    return {
      success: false,
      message: response.message || "Update post failed",
    };
  } catch (error: Error | any) {
    return {
      success: false,
      message: error.message || "Update post action failed",
    };
  }
};

export const handleDeletePost = async (id: string) => {
  try {
    const response = await deletePost(id);
    if (response.success) {
      revalidatePath("/admin/posts");
      return {
        success: true,
        message: "Delete post successful",
      };
    }
    return {
      success: false,
      message: response.message || "Delete post failed",
    };
  } catch (error: Error | any) {
    return {
      success: false,
      message: error.message || "Delete post action failed",
    };
  }
};
