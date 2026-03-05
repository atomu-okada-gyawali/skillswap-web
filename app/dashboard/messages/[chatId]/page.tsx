"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useChat } from "@/context/ChatContext";
import { handleGetOneChat } from "@/lib/actions/chat-actions";
import { ArrowLeft, Send, User } from "lucide-react";
import Link from "next/link";

interface Proposal {
  _id: string;
  senderId: {
    username: string;
    profilePicture: string;
    fullName: string;
    _id: string;
  };
  receiverId: {
    username: string;
    profilePicture: string;
    fullName: string;
    _id: string;
  };
  postId: {
    title: string;
    _id: string;
  };
  offeredSkill: {
    title: string;
    _id: string;
  };
}

interface ChatData {
  _id: string;
  proposalId: Proposal;
  createdAt: string;
  updatedAt: string;
}

export default function ChatPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const { messages, sendMessage, isLoading, setActiveChat } = useChat();
  const [chatData, setChatData] = useState<ChatData | null>(null);
  const [messageInput, setMessageInput] = useState("");
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const chatId = params.chatId as string;

  useEffect(() => {
    const loadChat = async () => {
      const result = await handleGetOneChat(chatId);
      if (result.success && result.data) {
        setChatData(result.data);
        setActiveChat(result.data as any);
      } else {
        router.push("/dashboard/messages");
      }
    };

    if (chatId) {
      loadChat();
    }

    return () => {
      setActiveChat(null);
    };
  }, [chatId, router, setActiveChat]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!messageInput.trim() || sending) return;

    setSending(true);
    await sendMessage(messageInput);
    setMessageInput("");
    setSending(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const getOtherUser = () => {
    if (!chatData?.proposalId || !user?._id) return null;
    const proposal = chatData.proposalId;
    if (proposal.senderId._id === user._id) {
      return proposal.receiverId;
    }
    return proposal.senderId;
  };

  const otherUser = getOtherUser();

  if (!chatData) {
    return (
      <div className="min-h-screen bg-[#fff2e0] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-c5"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fff2e0] flex flex-col">
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center gap-4">
        <Link
          href="/dashboard/proposals"
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </Link>
        <div className="flex items-center gap-3">
          {otherUser?.profilePicture ? (
            <img
              src={otherUser.profilePicture}
              alt={otherUser.username}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
              <User className="w-5 h-5 text-gray-500" />
            </div>
          )}
          <div>
            <h2 className="font-semibold text-gray-900">{otherUser?.username}</h2>
            <p className="text-sm text-gray-500">
              {chatData.proposalId.postId?.title || "Chat"}
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-c5"></div>
          </div>
        ) : messages.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p>No messages yet. Start the conversation!</p>
          </div>
        ) : (
          messages.map((msg) => {
            const isOwnMessage = msg.senderId === user?._id;
            return (
              <div
                key={msg._id}
                className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                    isOwnMessage
                      ? "bg-c5 text-white"
                      : "bg-white text-gray-900 border border-gray-200"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                  <p
                    className={`text-xs mt-1 ${
                      isOwnMessage ? "text-white/70" : "text-gray-500"
                    }`}
                  >
                    {new Date(msg.createdAt).toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="bg-white border-t border-gray-200 px-6 py-4">
        <div className="flex gap-3">
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-c5"
            disabled={sending}
          />
          <button
            onClick={handleSend}
            disabled={!messageInput.trim() || sending}
            className="p-2 bg-c5 text-white rounded-full hover:bg-c4 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
