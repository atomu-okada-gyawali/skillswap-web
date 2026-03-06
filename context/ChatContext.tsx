"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import { initializeSocket, joinChat, leaveChat, getSocket } from "@/lib/socket";
import { useAuth } from "./AuthContext";

export interface Message {
  _id: string;
  chatId: string;
  senderId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface Chat {
  _id: string;
  proposalId: string;
  createdAt: string;
  updatedAt: string;
  lastMessage?: Message;
}

interface ChatContextProps {
  activeChat: Chat | null;
  messages: Message[];
  setActiveChat: (chat: Chat | null) => void;
  sendMessage: (content: string) => Promise<void>;
  loadMessages: (chatId: string) => Promise<void>;
  isLoading: boolean;
}

const ChatContext = createContext<ChatContextProps | undefined>(undefined);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [activeChat, setActiveChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user?._id) {
      initializeSocket();
    }
  }, [user?._id]);

  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    const handleNewMessage = (message: Message) => {
      setMessages((prev) => [...prev, message]);
    };

    socket.on("new_message", handleNewMessage);

    return () => {
      socket.off("new_message", handleNewMessage);
    };
  }, [activeChat?._id]);

  useEffect(() => {
    if (activeChat?._id) {
      joinChat(activeChat._id);
      loadMessages(activeChat._id);
    }

    return () => {
      if (activeChat?._id) {
        leaveChat(activeChat._id);
      }
    };
  }, [activeChat?._id]);

  const loadMessages = useCallback(async (chatId: string) => {
    setIsLoading(true);
    try {
      const { getMessagesByChat } = await import("@/lib/api/message");
      const response = await getMessagesByChat(chatId);
      if (response.success && response.data) {
        setMessages(response.data);
      }
    } catch (error) {
      console.error("Failed to load messages:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const sendMessage = useCallback(
    async (content: string) => {
      if (!activeChat?._id || !user?._id || !content.trim()) return;

      try {
        const { createMessage } = await import("@/lib/api/message");
        await createMessage({
          chatId: activeChat._id,
          senderId: user._id,
          content: content.trim(),
        });
      } catch (error) {
        console.error("Failed to send message:", error);
      }
    },
    [activeChat?._id, user?._id]
  );

  return (
    <ChatContext.Provider
      value={{
        activeChat,
        messages,
        setActiveChat,
        sendMessage,
        loadMessages,
        isLoading,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
