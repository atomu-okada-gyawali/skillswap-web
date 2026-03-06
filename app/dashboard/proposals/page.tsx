"use client";

import { useState, useEffect } from "react";
import { handleGetAllProposals, handleAcceptProposal, handleRejectProposal } from "@/lib/actions/proposal-actions";
import { handleStartChat } from "@/lib/actions/chat-actions";
import { useAuth } from "@/context/AuthContext";
import { FileText } from "lucide-react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import ProposalCard from "./_components/ProposalCard";
import ProposalFilters from "./_components/ProposalFilters";
import Pagination from "./_components/Pagination";

const ITEMS_PER_PAGE = 10;

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
  schedules?: {
    _id: string;
    proposalId: string;
    proposedDate: string;
    proposedTime: string;
    durationMinutes: number;
    accepted: boolean;
    createdAt: string;
    updatedAt: string;
  }[];
}

export default function ProposalsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProposals, setTotalProposals] = useState(0);
  const [filter, setFilter] = useState<"sent" | "received">("received");
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [expandedProposal, setExpandedProposal] = useState<string | null>(null);

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

  useEffect(() => {
    fetchProposals();
  }, [currentPage]);

  const onAccept = async (proposalId: string) => {
    setActionLoading(proposalId);
    const result = await handleAcceptProposal(proposalId);
    if (result.success) {
      toast.success("Proposal accepted!");
      fetchProposals();
    } else {
      toast.error(result.message || "Failed to accept proposal");
    }
    setActionLoading(null);
  };

  const onReject = async (proposalId: string) => {
    setActionLoading(proposalId);
    const result = await handleRejectProposal(proposalId);
    if (result.success) {
      toast.success("Proposal rejected!");
      fetchProposals();
    } else {
      toast.error(result.message || "Failed to reject proposal");
    }
    setActionLoading(null);
  };

  const onChat = async (proposalId: string, receiverId: string) => {
    setActionLoading(proposalId);
    try {
      const result = await handleStartChat(proposalId);
      if (result.success && result.data) {
        router.push(`/dashboard/messages/${result.data._id}`);
      } else {
        toast.error(result.message || "Failed to start chat");
      }
    } catch {
      toast.error("Failed to start chat");
    }
    setActionLoading(null);
  };

  const filteredProposals = proposals.filter((proposal) => {
    const senderId = typeof proposal.senderId === "object" ? proposal.senderId?._id : proposal.senderId;
    const receiverId = typeof proposal.receiverId === "object" ? proposal.receiverId?._id : proposal.receiverId;
    if (filter === "sent") return senderId === user?._id;
    if (filter === "received") return receiverId === user?._id;
    return true;
  });

  const totalPages = Math.ceil(totalProposals / ITEMS_PER_PAGE);

  const getReceiverId = (proposal: Proposal) => {
    return typeof proposal.senderId === "object" ? proposal.senderId._id : "";
  };

  const getChatReceiverId = (proposal: Proposal) => {
    const senderId = typeof proposal.senderId === "object" ? proposal.senderId._id : "";
    const receiverId = typeof proposal.receiverId === "object" ? proposal.receiverId._id : "";
    if (senderId === user?._id) return receiverId;
    return senderId;
  };

  return (
    <div className="min-h-screen bg-[#fff2e0] p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-4 mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Proposals</h1>
          
          <ProposalFilters currentFilter={filter} onFilterChange={setFilter} />
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-c5"></div>
          </div>
        ) : filteredProposals.length > 0 ? (
          <div className="space-y-4">
            {filteredProposals.map((proposal) => (
              <ProposalCard
                key={proposal._id}
                proposal={proposal}
                filter={filter}
                userId={user?._id}
                expanded={expandedProposal === proposal._id}
                actionLoading={actionLoading === proposal._id}
                onToggleExpand={() => setExpandedProposal(expandedProposal === proposal._id ? null : proposal._id)}
                onAccept={() => onAccept(proposal._id)}
                onReject={() => onReject(proposal._id)}
                onChat={() => onChat(proposal._id, filter === "received" ? getReceiverId(proposal) : getChatReceiverId(proposal))}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 text-lg">No proposals found</p>
          </div>
        )}

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
