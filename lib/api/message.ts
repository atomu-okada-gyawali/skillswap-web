import axios from "./axios";
import { API } from "./endpoints";

export const createMessage = async (messageData: any) => {
  try {
    const response = await axios.post(API.MESSAGE.CREATE, messageData);
    return response.data;
  } catch (error: Error | any) {
    throw new Error(
      error.response?.data?.message || error.message || "Create message failed",
    );
  }
};

export const getMessageById = async (id: string) => {
  try {
    const response = await axios.get(API.MESSAGE.GET_ONE(id));
    return response.data;
  } catch (error: Error | any) {
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Get message by id failed",
    );
  }
};

export const getMessagesByChat = async (chatId: string) => {
  try {
    const response = await axios.get(API.MESSAGE.GET_BY_CHAT(chatId));
    return response.data;
  } catch (error: Error | any) {
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Get messages by chat failed",
    );
  }
};

export const deleteMessage = async (id: string) => {
  try {
    const response = await axios.delete(API.MESSAGE.DELETE(id));
    return response.data;
  } catch (error: Error | any) {
    throw new Error(
      error.response?.data?.message || error.message || "Delete message failed",
    );
  }
};
