import axios from "./axios";
import { API } from "./endpoints";

export const createSchedule = async (scheduleData: any) => {
  try {
    const response = await axios.post(API.SCHEDULE.CREATE, scheduleData);
    return response.data;
  } catch (error: Error | any) {
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Create schedule failed",
    );
  }
};

export const getScheduleById = async (id: string) => {
  try {
    const response = await axios.get(API.SCHEDULE.GET_ONE(id));
    return response.data;
  } catch (error: Error | any) {
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Get schedule by id failed",
    );
  }
};

export const getAllSchedules = async (page: number, size: number) => {
  try {
    const response = await axios.get(API.SCHEDULE.GET_ALL, {
      params: { page, size },
    });
    return response.data;
  } catch (error: Error | any) {
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Get all schedules failed",
    );
  }
};

export const updateSchedule = async (id: string, updateData: any) => {
  try {
    const response = await axios.put(API.SCHEDULE.UPDATE(id), updateData);
    return response.data;
  } catch (error: Error | any) {
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Update schedule failed",
    );
  }
};

export const deleteSchedule = async (id: string) => {
  try {
    const response = await axios.delete(API.SCHEDULE.DELETE(id));
    return response.data;
  } catch (error: Error | any) {
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Delete schedule failed",
    );
  }
};
