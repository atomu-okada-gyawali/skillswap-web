"use server";

import { revalidatePath } from "next/cache";
import {
  createSchedule,
  deleteSchedule,
  getAllSchedules,
  getScheduleById,
  updateSchedule,
} from "../api/schedule";

export const handleCreateSchedule = async (data: FormData) => {
  try {
    const response = await createSchedule(data);
    if (response.success) {
      revalidatePath("/schedules");
      return {
        success: true,
        message: "Schedule created successfully",
        data: response.data,
      };
    }
    return {
      success: false,
      message: response.message || "Schedule creation failed",
    };
  } catch (error: Error | any) {
    return {
      success: false,
      message: error.message || "Schedule creation action failed",
    };
  }
};

export const handleGetAllSchedules = async (page: string, size: string) => {
  try {
    const currentPage = parseInt(page) || 1;
    const currentSize = parseInt(size) || 10;

    const response = await getAllSchedules(currentPage, currentSize);
    if (response.success) {
      return {
        success: true,
        message: "Get all schedules successful",
        data: response.data,
        pagination: response.pagination,
      };
    }
    return {
      success: false,
      message: response.message || "Get all schedules failed",
    };
  } catch (error: Error | any) {
    return {
      success: false,
      message: error.message || "Get all schedules action failed",
    };
  }
};

export const handleGetOneSchedule = async (id: string) => {
  try {
    const response = await getScheduleById(id);
    if (response.success) {
      return {
        success: true,
        message: "Get schedule by id successful",
        data: response.data,
      };
    }
    return {
      success: false,
      message: response.message || "Get schedule by id failed",
    };
  } catch (error: Error | any) {
    return {
      success: false,
      message: error.message || "Get schedule by id action failed",
    };
  }
};

export const handleUpdateSchedule = async (id: string, data: FormData) => {
  try {
    const response = await updateSchedule(id, data);
    if (response.success) {
      revalidatePath("/schedules");
      return {
        success: true,
        message: "Update schedule successful",
        data: response.data,
      };
    }
    return {
      success: false,
      message: response.message || "Update schedule failed",
    };
  } catch (error: Error | any) {
    return {
      success: false,
      message: error.message || "Update schedule action failed",
    };
  }
};

export const handleDeleteSchedule = async (id: string) => {
  try {
    const response = await deleteSchedule(id);
    if (response.success) {
      revalidatePath("/schedules");
      return {
        success: true,
        message: "Delete schedule successful",
      };
    }
    return {
      success: false,
      message: response.message || "Delete schedule failed",
    };
  } catch (error: Error | any) {
    return {
      success: false,
      message: error.message || "Delete schedule action failed",
    };
  }
};
