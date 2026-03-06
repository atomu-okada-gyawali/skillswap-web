import { API } from "../endpoints";
import axios from "../axios";

export const createTag = async (tagData: FormData) => {
  try {
    const response = await axios.post(API.ADMIN.TAG.CREATE, tagData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error: Error | any) {
    throw new Error(
      error.response?.data?.message || error.message || "Create tag failed",
    );
  }
};

export const getTagById = async (id: string) => {
  try {
    const response = await axios.get(API.ADMIN.TAG.GET_ONE(id));
    return response.data;
  } catch (error: Error | any) {
    throw new Error(
      error.response?.data?.message || error.message || "Get tag by id failed",
    );
  }
};

export const getAllTags = async (
  page: number,
  size: number,
  search?: string,
) => {
  try {
    const response = await axios.get(API.ADMIN.TAG.GET_ALL, {
      params: { page, size, search },
    });
    return response.data;
  } catch (error: Error | any) {
    throw new Error(
      error.response?.data?.message || error.message || "Get all tags failed",
    );
  }
};

export const updateTag = async (id: string, tagData: FormData) => {
  try {
    const response = await axios.put(API.ADMIN.TAG.UPDATE(id), tagData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error: Error | any) {
    throw new Error(
      error.response?.data?.message || error.message || "Update tag failed",
    );
  }
};

export const deleteTag = async (id: string) => {
  try {
    const response = await axios.delete(API.ADMIN.TAG.DELETE(id));
    return response.data;
  } catch (error: Error | any) {
    throw new Error(
      error.response?.data?.message || error.message || "Delete tag failed",
    );
  }
};
