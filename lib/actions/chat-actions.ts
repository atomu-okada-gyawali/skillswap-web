"use server";

import { revalidatePath } from "next/cache";
import {
  createChat,
  deleteChat,
  getAllChats,
  getChatById,
  getChatsByProposal,
} from "../api/chat";

export const handleCreateChat = async (data: FormData) => {
  try {
    const response = await createChat(data);
    if (response.success) {
      return {
        success: true,
        message: "Chat created successfully",
        data: response.data,
      };
    }
    return {
      success: false,
      message: response.message || "Chat creation failed",
    };
  } catch (error: Error | any) {
    return {
      success: false,
      message: error.message || "Chat creation action failed",
    };
  }
};

export const handleGetAllChats = async (page: string, size: string) => {
  try {
    const currentPage = parseInt(page) || 1;
    const currentSize = parseInt(size) || 10;

    const response = await getAllChats(currentPage, currentSize);
    if (response.success) {
      return {
        success: true,
        message: "Get all chats successful",
        data: response.data,
        pagination: response.pagination,
      };
    }
    return {
      success: false,
      message: response.message || "Get all chats failed",
    };
  } catch (error: Error | any) {
    return {
      success: false,
      message: error.message || "Get all chats action failed",
    };
  }
};

export const handleGetOneChat = async (id: string) => {
  try {
    const response = await getChatById(id);
    if (response.success) {
      return {
        success: true,
        message: "Get chat by id successful",
        data: response.data,
      };
    }
    return {
      success: false,
      message: response.message || "Get chat by id failed",
    };
  } catch (error: Error | any) {
    return {
      success: false,
      message: error.message || "Get chat by id action failed",
    };
  }
};

export const handleGetChatsByProposal = async (proposalId: string) => {
  try {
    const response = await getChatsByProposal(proposalId);
    if (response.success) {
      return {
        success: true,
        message: "Get chats by proposal successful",
        data: response.data,
      };
    }
    return {
      success: false,
      message: response.message || "Get chats by proposal failed",
    };
  } catch (error: Error | any) {
    return {
      success: false,
      message: error.message || "Get chats by proposal action failed",
    };
  }
};

export const handleStartChat = async (proposalId: string) => {
  try {
    const formData = new FormData();
    formData.append("proposalId", proposalId);
    return await handleCreateChat(formData);
  } catch (error: Error | any) {
    return {
      success: false,
      message: error.message || "Failed to start chat",
    };
  }
};

export const handleDeleteChat = async (id: string) => {
  try {
    const response = await deleteChat(id);
    if (response.success) {
      revalidatePath("/chats");
      return {
        success: true,
        message: "Delete chat successful",
      };
    }
    return {
      success: false,
      message: response.message || "Delete chat failed",
    };
  } catch (error: Error | any) {
    return {
      success: false,
      message: error.message || "Delete chat action failed",
    };
  }
};
