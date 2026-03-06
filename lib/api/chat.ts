import axios from "./axios";
import { API } from "./endpoints";

export const createChat = async (chatData: any) => {
  try {
    const response = await axios.post(API.CHAT.CREATE, chatData);
    return response.data;
  } catch (error: Error | any) {
    throw new Error(
      error.response?.data?.message || error.message || "Create chat failed",
    );
  }
};

export const getChatById = async (id: string) => {
  try {
    const response = await axios.get(API.CHAT.GET_ONE(id));
    return response.data;
  } catch (error: Error | any) {
    throw new Error(
      error.response?.data?.message || error.message || "Get chat by id failed",
    );
  }
};

export const getAllChats = async (page: number, size: number) => {
  try {
    const response = await axios.get(API.CHAT.GET_ALL, {
      params: { page, size },
    });
    return response.data;
  } catch (error: Error | any) {
    throw new Error(
      error.response?.data?.message || error.message || "Get all chats failed",
    );
  }
};

export const getChatsByProposal = async (proposalId: string) => {
  try {
    const response = await axios.get(API.CHAT.GET_BY_PROPOSAL(proposalId));
    return response.data;
  } catch (error: Error | any) {
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Get chats by proposal failed",
    );
  }
};

export const deleteChat = async (id: string) => {
  try {
    const response = await axios.delete(API.CHAT.DELETE(id));
    return response.data;
  } catch (error: Error | any) {
    throw new Error(
      error.response?.data?.message || error.message || "Delete chat failed",
    );
  }
};
