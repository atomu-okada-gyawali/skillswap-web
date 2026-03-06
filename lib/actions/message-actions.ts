"use server";

import { revalidatePath } from "next/cache";
import {
  createMessage,
  deleteMessage,
  getMessageById,
  getMessagesByChat,
} from "../api/message";

export const handleCreateMessage = async (data: FormData) => {
  try {
    const response = await createMessage(data);
    if (response.success) {
      revalidatePath("/chats");
      return {
        success: true,
        message: "Message created successfully",
        data: response.data,
      };
    }
    return {
      success: false,
      message: response.message || "Message creation failed",
    };
  } catch (error: Error | any) {
    return {
      success: false,
      message: error.message || "Message creation action failed",
    };
  }
};

export const handleGetOneMessage = async (id: string) => {
  try {
    const response = await getMessageById(id);
    if (response.success) {
      return {
        success: true,
        message: "Get message by id successful",
        data: response.data,
      };
    }
    return {
      success: false,
      message: response.message || "Get message by id failed",
    };
  } catch (error: Error | any) {
    return {
      success: false,
      message: error.message || "Get message by id action failed",
    };
  }
};

export const handleGetMessagesByChat = async (chatId: string) => {
  try {
    const response = await getMessagesByChat(chatId);
    if (response.success) {
      return {
        success: true,
        message: "Get messages by chat successful",
        data: response.data,
      };
    }
    return {
      success: false,
      message: response.message || "Get messages by chat failed",
    };
  } catch (error: Error | any) {
    return {
      success: false,
      message: error.message || "Get messages by chat action failed",
    };
  }
};

export const handleDeleteMessage = async (id: string) => {
  try {
    const response = await deleteMessage(id);
    if (response.success) {
      revalidatePath("/chats");
      return {
        success: true,
        message: "Delete message successful",
      };
    }
    return {
      success: false,
      message: response.message || "Delete message failed",
    };
  } catch (error: Error | any) {
    return {
      success: false,
      message: error.message || "Delete message action failed",
    };
  }
};
