"use client";

import { useState, useEffect } from "react";
import { handleGetAllProposals } from "@/lib/actions/proposal-actions";
import { useAuth } from "@/context/AuthContext";
import { FileText, Clock, User, CheckCircle, XCircle, Hourglass } from "lucide-react";
import Link from "next/link";

const ITEMS_PER_PAGE = 10;

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
  offeredSkill: string;
  message: string;
  status: "pending" | "accepted" | "rejected";
  createdAt: string;
}

export default function ProposalsPage() {
  const { user } = useAuth();
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProposals, setTotalProposals] = useState(0);
  const [filter, setFilter] = useState<"all" | "sent" | "received">("all");

  useEffect(() => {
    const fetchProposals = async () => {
      setLoading(true);
      const result = await handleGetAllProposals(
        currentPage.toString(),
        ITEMS_PER_PAGE.toString(),
      );
      if (result.success && result.data) {
        setProposals(result.data as Proposal[]);
        setTotalProposals(result.pagination?.total || 0);
      }
      setLoading(false);
    };
    fetchProposals();
  }, [currentPage]);

  const filteredProposals = proposals.filter((proposal) => {
    if (filter === "all") return true;
    if (filter === "sent") return proposal.senderId._id === user?._id;
    if (filter === "received") return proposal.receiverId._id === user?._id;
    return true;
  });

  const totalPages = Math.ceil(totalProposals / ITEMS_PER_PAGE);

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

  return (
    <div className="min-h-screen bg-[#fff2e0] p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-4 mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Proposals</h1>
          
          <div className="flex gap-2">
            {(["all", "sent", "received"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  filter === f
                    ? "bg-c5 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                }`}
              >
                {f === "all" ? "All Proposals" : f === "sent" ? "Sent" : "Received"}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-c5"></div>
          </div>
        ) : filteredProposals.length > 0 ? (
          <div className="space-y-4">
            {filteredProposals.map((proposal) => (
              <div
                key={proposal._id}
                className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">
                          {proposal.senderId._id === user?._id ? (
                            <>To: <span className="font-medium text-gray-900">{proposal.receiverId.username}</span></>
                          ) : (
                            <>From: <span className="font-medium text-gray-900">{proposal.senderId.username}</span></>
                          )}
                        </span>
                      </div>
                      <span className="text-gray-300">•</span>
                      <Link
                        href={`/dashboard/explore/${proposal.postId._id}`}
                        className="text-sm text-c5 hover:underline truncate"
                      >
                        {proposal.postId.title}
                      </Link>
                    </div>

                    <h3 className="font-semibold text-gray-900 mb-1">
                      {proposal.offeredSkill}
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
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 text-lg">No proposals found</p>
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-full bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              ←
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 rounded-full font-medium transition-colors ${
                  currentPage === page
                    ? "bg-orange-500 text-white"
                    : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-full bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
