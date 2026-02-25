"use client";

import { useState, useEffect } from "react";
import { handleGetMyPosts } from "@/lib/actions/post-actions";
import { handleGetAllChats } from "@/lib/actions/chat-actions";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { User, MapPin, Clock, MessageCircle, Edit, Trash2, Send } from "lucide-react";
import { BASE_URL } from "@/lib/api/axios";
import Image from "next/image";

const ITEMS_PER_PAGE = 10;

interface Post {
  _id: string;
  title: string;
  description: string;
  tags: string[];
  postPhoto: string;
  locationType: string;
  availability: string;
  duration: string;
  requirements: string[];
}

interface Chat {
  _id: string;
  participants: {
    _id: string;
    username: string;
    profilePicture: string;
  }[];
  lastMessage?: {
    content: string;
    createdAt: string;
  };
  proposalId: {
    postId: {
      title: string;
    };
  };
  updatedAt: string;
}

export default function ProfilePage() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [chats, setChats] = useState<Chat[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [loadingChats, setLoadingChats] = useState(true);
  const [activeTab, setActiveTab] = useState<"posts" | "messages">("posts");

  useEffect(() => {
    const fetchPosts = async () => {
      setLoadingPosts(true);
      const result = await handleGetMyPosts("1", "100");
      if (result.success && result.data) {
        setPosts(result.data as Post[]);
      }
      setLoadingPosts(false);
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    const fetchChats = async () => {
      setLoadingChats(true);
      const result = await handleGetAllChats("1", "20");
      if (result.success && result.data) {
        setChats(result.data as Chat[]);
      }
      setLoadingChats(false);
    };
    if (activeTab === "messages") {
      fetchChats();
    }
  }, [activeTab]);

  const getOtherParticipant = (chat: Chat) => {
    return chat.participants.find((p) => p._id !== user?._id);
  };

  return (
    <div className="min-h-screen bg-[#fff2e0] p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-c3 to-c4 flex items-center justify-center">
              {user?.profilePicture ? (
                <Image
                  src={BASE_URL + user.profilePicture}
                  alt={user.username}
                  width={96}
                  height={96}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <User className="w-12 h-12 text-white" />
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{user?.name || "User"}</h1>
              <p className="text-gray-500">@{user?.username}</p>
              <p className="text-sm text-gray-500 mt-1">{user?.email}</p>
            </div>
          </div>
        </div>

        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab("posts")}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${
              activeTab === "posts"
                ? "bg-c5 text-white"
                : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
            }`}
          >
            My Posts ({posts.length})
          </button>
          <button
            onClick={() => setActiveTab("messages")}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${
              activeTab === "messages"
                ? "bg-c5 text-white"
                : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
            }`}
          >
            Messages
          </button>
        </div>

        {activeTab === "posts" && (
          <>
            {loadingPosts ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-c5"></div>
              </div>
            ) : posts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {posts.map((post) => (
                  <div
                    key={post._id}
                    className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                  >
                    <div className="relative mb-3">
                      <div className="w-full aspect-[4/3] overflow-hidden rounded-xl">
                        <Image
                          width={300}
                          height={300}
                          src={post.postPhoto ? BASE_URL + post.postPhoto : "/images/skillplaceholder.jpg"}
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2 truncate">{post.title}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-3">{post.description}</p>
                    
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {post.tags?.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-0.5 bg-gray-50 border border-gray-100 text-gray-600 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {post.locationType}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {post.availability}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <Link
                        href={`/dashboard/profile/${post._id}`}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-c5 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                        Edit
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
                <p className="text-gray-500 text-lg">You haven't created any posts yet</p>
                <Link
                  href="/dashboard"
                  className="inline-block mt-4 px-5 py-2.5 bg-c5 text-white rounded-full text-sm font-medium hover:bg-purple-700 transition-colors"
                >
                  Create your first post
                </Link>
              </div>
            )}
          </>
        )}

        {activeTab === "messages" && (
          <>
            {loadingChats ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-c5"></div>
              </div>
            ) : chats.length > 0 ? (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {chats.map((chat) => {
                  const other = getOtherParticipant(chat);
                  return (
                    <Link
                      key={chat._id}
                      href={`/dashboard/messages/${chat._id}`}
                      className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0"
                    >
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-c3 to-c4 flex items-center justify-center flex-shrink-0">
                        {other?.profilePicture ? (
                          <Image
                            src={BASE_URL + other.profilePicture}
                            alt={other.username}
                            width={48}
                            height={48}
                            className="w-full h-full rounded-full object-cover"
                          />
                        ) : (
                          <User className="w-6 h-6 text-white" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold text-gray-900">{other?.username || "User"}</h3>
                          <span className="text-xs text-gray-500">
                            {new Date(chat.updatedAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 truncate">
                          {chat.proposalId?.postId?.title || "No post"}
                        </p>
                        {chat.lastMessage && (
                          <p className="text-sm text-gray-400 truncate">{chat.lastMessage.content}</p>
                        )}
                      </div>
                      <MessageCircle className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
                <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 text-lg">No messages yet</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
