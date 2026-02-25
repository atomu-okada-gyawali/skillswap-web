import axios from "./axios";
import { API } from "./endpoints";

export const createPost = async (postData: any) => {
  try {
    const response = await axios.post(API.POST.CREATE, postData, {
      headers: {
        "Content-Type": "multipart/form-data", // for file upload/multer
      },
    });
    return response.data;
  } catch (error: Error | any) {
    throw new Error(
      error.response?.data?.message || error.message || "Create post failed",
    );
  }
};
export const getPostById = async (id: string) => {
  try {
    const response = await axios.get(API.POST.GET_ONE(id));
    return response.data;
  } catch (error: Error | any) {
    throw new Error(
      error.response?.data?.message || error.message || "Get post by id failed",
    );
  }
};

export const getAllPosts = async (
  page: number,
  size: number,
  search?: string,
  excludeUserId?: string,
) => {
  try {
    const response = await axios.get(API.POST.GET_ALL, {
      params: { page, size, search, excludeUserId },
    });
    return response.data;
  } catch (error: Error | any) {
    throw new Error(
      error.response?.data?.message || error.message || "Get all posts failed",
    );
  }
};

export const getMyPosts = async (
  page: number,
  size: number,
  search?: string,
) => {
  try {
    const response = await axios.get(API.POST.GET_MY_POSTS, {
      params: { page, size, search },
    });
    return response.data;
  } catch (error: Error | any) {
    throw new Error(
      error.response?.data?.message || error.message || "Get my posts failed",
    );
  }
};
export const updatePost = async (id: string, updateData: any) => {
  try {
    const response = await axios.put(API.POST.UPDATE(id), updateData, {
      headers: {
        "Content-Type": "multipart/form-data", // for file upload/multer
      },
    });
    return response.data;
  } catch (error: Error | any) {
    throw new Error(
      error.response?.data?.message || error.message || "Update user failed",
    );
  }
};

export const deletePost = async (id: string) => {
  try {
    const response = await axios.delete(API.POST.DELETE(id));
    return response.data;
  } catch (error: Error | any) {
    throw new Error(
      error.response?.data?.message || error.message || "Delete user failed",
    );
  }
};
