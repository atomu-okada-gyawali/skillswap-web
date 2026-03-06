"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { handleGetAllChats } from "@/lib/actions/chat-actions";
import { useAuth } from "@/context/AuthContext";
import { useChat } from "@/context/ChatContext";
import { MessageCircle, User, Clock } from "lucide-react";
import { BASE_URL } from "@/lib/api/axios";

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
}

interface Chat {
  _id: string;
  proposalId: Proposal | null;
  createdAt: string;
  updatedAt: string;
}

export default function MessagesIndexPage() {
  const { user, loading: authLoading } = useAuth();
  const { setActiveChat } = useChat();
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setActiveChat(null);
    const loadChats = async () => {
      try {
        const result = await handleGetAllChats("1", "50");
        if (result.success && result.data) {
          setChats(result.data as Chat[]);
        }
      } catch (error) {
        console.error("Failed to load chats:", error);
      } finally {
        setLoading(false);
      }
    };

    loadChats();
  }, [setActiveChat]);

  const getOtherUser = (chat: Chat) => {
    const proposal = chat.proposalId;
    if (!proposal?.senderId || !proposal?.receiverId) return null;
    if (proposal.senderId._id === user?._id) {
      return proposal.receiverId;
    }
    return proposal.senderId;
  };

  return (
    <div className="min-h-screen bg-[#fff2e0] p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Messages</h1>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-c5"></div>
          </div>
        ) : chats.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
            <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 text-lg">No conversations yet</p>
            <p className="text-gray-400 text-sm mt-1"></p>
          </div>
        ) : (
          <div className="space-y-3">
            {chats.map((chat) => {
              const otherUser = getOtherUser(chat);
              if (!otherUser) return null;

              return (
                <Link
                  key={chat._id}
                  href={`/dashboard/messages/${chat._id}`}
                  className="block bg-white rounded-xl p-4 hover:shadow-md transition-shadow border border-gray-100"
                >
                  <div className="flex items-center gap-4">
                    {otherUser.profilePicture ? (
                      <img
                        src={BASE_URL + otherUser.profilePicture}
                        alt={otherUser.username}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                        <User className="w-6 h-6 text-gray-500" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-gray-900 truncate">
                          {otherUser.username}
                        </h3>
                        <span className="text-xs text-gray-500">
                          {new Date(chat.updatedAt).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                            },
                          )}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 truncate">
                        {chat.proposalId?.postId?.title || "Chat"}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
