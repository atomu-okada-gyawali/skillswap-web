"use client";

import Link from "next/link";
import { User, Clock, CheckCircle, XCircle, Hourglass, MessageCircle, Check, X, ChevronDown, ChevronUp, Calendar } from "lucide-react";

interface Schedule {
  _id: string;
  proposalId: string;
  proposedDate: string;
  proposedTime: string;
  durationMinutes: number;
  accepted: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Proposal {
  _id: string;
  senderId: {
    username: string;
    profilePicture: string;
    fullName: string;
    _id: string;
  } | string;
  receiverId: {
    username: string;
    profilePicture: string;
    fullName: string;
    _id: string;
  } | string;
  postId: {
    title: string;
    _id: string;
  } | string;
  offeredSkill: {
    title: string;
    _id: string;
  } | string;
  message: string;
  status: "pending" | "accepted" | "rejected";
  createdAt: string;
  schedules?: Schedule[];
}

interface ProposalCardProps {
  proposal: Proposal;
  filter: "all" | "sent" | "received";
  userId?: string;
  expanded: boolean;
  actionLoading: boolean;
  onToggleExpand: () => void;
  onAccept: () => void;
  onReject: () => void;
  onChat: () => void;
}

export default function ProposalCard({
  proposal,
  filter,
  userId,
  expanded,
  actionLoading,
  onToggleExpand,
  onAccept,
  onReject,
  onChat,
}: ProposalCardProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "accepted":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "rejected":
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Hourglass className="w-4 h-4 text-yellow-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "accepted":
        return "bg-green-100 text-green-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  const senderId = typeof proposal.senderId === "object" ? proposal.senderId?._id : proposal.senderId;
  const receiverId = typeof proposal.receiverId === "object" ? proposal.receiverId?._id : proposal.receiverId;

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">
                {typeof proposal.senderId === "object" && typeof proposal.receiverId === "object" ? (
                  senderId === userId ? (
                    <>To: <span className="font-medium text-gray-900">{proposal.receiverId.username}</span></>
                  ) : (
                    <>From: <span className="font-medium text-gray-900">{proposal.senderId.username}</span></>
                  )
                ) : (
                  <span className="font-medium text-gray-900">User</span>
                )}
              </span>
            </div>
            <span className="text-gray-300">•</span>
            {typeof proposal.postId === "object" && proposal.postId ? (
              <Link
                href={`/dashboard/explore/${proposal.postId._id}`}
                className="text-sm text-c5 hover:underline truncate"
              >
                {proposal.postId.title}
              </Link>
            ) : (
              <Link
                href={`/dashboard/explore/${proposal.postId}`}
                className="text-sm text-c5 hover:underline truncate"
              >
                View Post
              </Link>
            )}
          </div>

          <h3 className="font-semibold text-gray-900 mb-1">
            {typeof proposal.offeredSkill === "object" && proposal.offeredSkill
              ? proposal.offeredSkill.title
              : proposal.offeredSkill}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-2">
            {proposal.message}
          </p>

          <div className="flex items-center gap-2 mt-3 text-xs text-gray-500">
            <Clock className="w-3.5 h-3.5" />
            {new Date(proposal.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium capitalize flex items-center gap-1.5 ${getStatusBadge(proposal.status)}`}
          >
            {getStatusIcon(proposal.status)}
            {proposal.status}
          </span>
          
          {filter === "received" && proposal.status === "pending" && (
            <div className="flex items-center gap-1 mt-2">
              <button
                onClick={onAccept}
                disabled={actionLoading}
                className="flex items-center gap-1 px-2.5 py-1.5 bg-green-500 hover:bg-green-600 text-white text-xs font-medium rounded-lg transition-colors disabled:opacity-50"
                title="Accept proposal"
              >
                <Check className="w-3.5 h-3.5" />
                Accept
              </button>
              <button
                onClick={onChat}
                disabled={actionLoading}
                className="flex items-center gap-1 px-2.5 py-1.5 bg-blue-500 hover:bg-blue-600 text-white text-xs font-medium rounded-lg transition-colors disabled:opacity-50"
                title="Start chat"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                Chat
              </button>
              <button
                onClick={onReject}
                disabled={actionLoading}
                className="flex items-center gap-1 px-2.5 py-1.5 bg-red-500 hover:bg-red-600 text-white text-xs font-medium rounded-lg transition-colors disabled:opacity-50"
                title="Reject proposal"
              >
                <X className="w-3.5 h-3.5" />
                Reject
              </button>
            </div>
          )}

          {(proposal.status === "accepted" || proposal.status === "pending") && (
            <button
              onClick={onToggleExpand}
              className="flex items-center gap-1 mt-2 text-xs text-c5 hover:underline"
            >
              {expanded ? (
                <>
                  <ChevronUp className="w-3.5 h-3.5" />
                  Hide Details
                </>
              ) : (
                <>
                  <ChevronDown className="w-3.5 h-3.5" />
                  View Details
                </>
              )}
            </button>
          )}

          {proposal.status === "accepted" && (
            <button
              onClick={onChat}
              disabled={actionLoading}
              className="flex items-center gap-1 mt-2 px-2.5 py-1.5 bg-blue-500 hover:bg-blue-600 text-white text-xs font-medium rounded-lg transition-colors disabled:opacity-50"
              title="Open chat"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              Chat
            </button>
          )}
        </div>
      </div>

      {(proposal.status === "accepted" || proposal.status === "pending") && expanded && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-gray-900 mb-2">Proposal Details</h4>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-gray-500">Offered Skill:</span>
                  <span className="ml-2 font-medium text-gray-900">
                    {typeof proposal.offeredSkill === "object" && proposal.offeredSkill
                      ? proposal.offeredSkill.title
                      : proposal.offeredSkill}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500">Message:</span>
                  <p className="mt-1 text-gray-900">{proposal.message}</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Schedules
              </h4>
              {proposal.schedules && proposal.schedules.length > 0 ? (
                <div className="space-y-2">
                  {proposal.schedules.map((schedule) => (
                    <div key={schedule._id} className="bg-white rounded-lg p-3 border border-gray-200">
                      <div className="flex items-center justify-between">
                        <div className="text-sm">
                          <p className="font-medium text-gray-900">
                            {new Date(schedule.proposedDate).toLocaleDateString("en-US", {
                              weekday: "short",
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </p>
                          <p className="text-gray-500">
                            {schedule.proposedTime} • {schedule.durationMinutes} minutes
                          </p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          schedule.accepted
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}>
                          {schedule.accepted ? "Accepted" : "Pending"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No schedules yet</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
