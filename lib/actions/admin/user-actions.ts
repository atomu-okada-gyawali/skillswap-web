"use server";
import {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser,
  getUserById,
} from "@/lib/api/admin/user";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const handleUserSearch = async (searchTerm: string, size: number) => {
  const params = new URLSearchParams();
  params.set("page", "1");
  params.set("size", size.toString());
  if (searchTerm) params.set("search", searchTerm);
  redirect(`/admin/users?${params.toString()}`);
};

export const handleUserPagination = async (page: number, size: number, search?: string) => {
  const params = new URLSearchParams();
  params.set("page", page.toString());
  params.set("size", size.toString());
  if (search) params.set("search", search);
  redirect(`/admin/users?${params.toString()}`);
};

export const handleCreateUser = async (data: FormData) => {
  try {
    const response = await createUser(data);
    if (response.success) {
      revalidatePath("/admin/users");
      return {
        success: true,
        message: "Registration successful",
        data: response.data,
      };
    }
    return {
      success: false,
      message: response.message || "Registration failed",
    };
  } catch (error: Error | any) {
    return {
      success: false,
      message: error.message || "Registration action failed",
    };
  }
};

export const handleGetAllUsers = async (
  page: string,
  size: string,
  search?: string,
) => {
  try {
    const currentPage = parseInt(page) || 1;
    const currentSize = parseInt(size) || 10;

    const response = await getAllUsers(currentPage, currentSize, search);
    if (response.success) {
      return {
        success: true,
        message: "Get all users successful",
        data: response.data,
        pagination: response.pagination,
      };
    }
    return {
      success: false,
      message: response.message || "Get all users failed",
    };
  } catch (error: Error | any) {
    return {
      success: false,
      message: error.message || "Get all users action failed",
    };
  }
};
export const handleGetOneUser = async (id: string) => {
  try {
    const response = await getUserById(id);
    if (response.success) {
      return {
        success: true,
        message: "Get user by id successful",
        data: response.data,
      };
    }
    return {
      success: false,
      message: response.message || "Get user by id failed",
    };
  } catch (error: Error | any) {
    return {
      success: false,
      message: error.message || "Get user by id action failed",
    };
  }
};

export const handleUpdateUser = async (id: string, data: FormData) => {
  try {
    const response = await updateUser(id, data);
    if (response.success) {
      revalidatePath("/admin/users");
      return {
        success: true,
        message: "Update user successful",
        data: response.data,
      };
    }
    return {
      success: false,
      message: response.message || "Update user failed",
    };
  } catch (error: Error | any) {
    return {
      success: false,
      message: error.message || "Update user action failed",
    };
  }
};

export const handleDeleteUser = async (id: string) => {
  try {
    const response = await deleteUser(id);
    if (response.success) {
      revalidatePath("/admin/users");
      return {
        success: true,
        message: "Delete user successful",
      };
    }
    return {
      success: false,
      message: response.message || "Delete user failed",
    };
  } catch (error: Error | any) {
    return {
      success: false,
      message: error.message || "Delete user action failed",
    };
  }
};

export const handleUserSubmission = async (data: any) => {
  const formData = new FormData();
  formData.append("email", data.email);
  formData.append("username", data.username);
  formData.append("password", data.password);
  formData.append("confirmPassword", data.confirmPassword);
  if (data.fullName) formData.append("fullName", data.fullName);
  if (data.profilePicture)
    formData.append("profilePicture", data.profilePicture);
  if (data.role) formData.append("role", data.role);
  return await handleCreateUser(formData);
};

export const handleUserUpdate = async (id: string, data: any) => {
  const formData = new FormData();
  if (data.email) formData.append("email", data.email);
  if (data.username) formData.append("username", data.username);
  if (data.fullName) formData.append("fullName", data.fullName);
  if (data.profilePicture)
    formData.append("profilePicture", data.profilePicture);
  if (data.role) formData.append("role", data.role);
  return await handleUpdateUser(id, formData);
};
