"use server";

import {
  createTag,
  getAllTags,
  updateTag,
  deleteTag,
  getTagById,
} from "@/lib/api/admin/tag";

import { revalidatePath } from "next/cache";

export const handleCreateTag = async (data: FormData) => {
  try {
    const response = await createTag(data);
    if (response.success) {
      revalidatePath("/admin/tags");
      return {
        success: true,
        message: "Tag created successfully",
        data: response.data,
      };
    }
    return {
      success: false,
      message: response.message || "Tag creation failed",
    };
  } catch (error: Error | any) {
    return {
      success: false,
      message: error.message || "Tag creation action failed",
    };
  }
};

export const handleGetAllTags = async (
  page: string,
  size: string,
  search?: string,
) => {
  try {
    const currentPage = parseInt(page || "1") || 1;
    const currentSize = parseInt(size || "10") || 10;

    const response = await getAllTags(currentPage, currentSize, search);
    if (response.success) {
      return {
        success: true,
        message: "Get all tags successful",
        data: response.data,
        pagination: response.pagination,
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

export const handleUpdateTag = async (id: string, data: FormData) => {
  try {
    const response = await updateTag(id, data);
    if (response.success) {
      revalidatePath("/admin/tags");
      return {
        success: true,
        message: "Tag updated successfully",
        data: response.data,
      };
    }
    return {
      success: false,
      message: response.message || "Tag update failed",
    };
  } catch (error: Error | any) {
    return {
      success: false,
      message: error.message || "Tag update action failed",
    };
  }
};

export const handleDeleteTag = async (id: string) => {
  try {
    const response = await deleteTag(id);
    if (response.success) {
      revalidatePath("/admin/tags");
      return {
        success: true,
        message: "Tag deleted successfully",
      };
    }
    return {
      success: false,
      message: response.message || "Tag deletion failed",
    };
  } catch (error: Error | any) {
    return {
      success: false,
      message: error.message || "Tag deletion action failed",
    };
  }
};
