import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const initializeSocket = (): Socket => {
  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_API_URL || "http://localhost:5050", {
      transports: ["websocket", "polling"],
      autoConnect: true,
    });

    socket.on("connect", () => {
      console.log("Socket connected:", socket?.id);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    socket.on("connect_error", (error: Error) => {
      console.error("Socket connection error:", error);
    });
  }
  return socket;
};

export const getSocket = (): Socket | null => {
  return socket;
};

export const joinChat = (chatId: string) => {
  if (socket) {
    socket.emit("join_chat", chatId);
  }
};

export const leaveChat = (chatId: string) => {
  if (socket) {
    socket.emit("leave_chat", chatId);
  }
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
