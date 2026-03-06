"use client";

import React, { useEffect, useState } from "react";
import { 
  Users, 
  FileText, 
  HandIcon as HandShake, 
  MessageCircle, 
  Tag as TagIcon,
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertCircle 
} from "lucide-react";
import StatCard from "../../dashboard/_components/StatCard";
import { handleGetAdminAnalytics } from "@/lib/actions/analytics-actions";
import { toast } from "react-toastify";

interface AdminAnalyticsData {
  totalUsers: number;
  totalPosts: number;
  totalProposals: number;
  totalChats: number;
  totalTags: number;
  statusBreakdown: {
    pending: number;
    accepted: number;
    rejected: number;
    cancelled: number;
  };
}

export default function AdminAnalyticsDashboard() {
  const [data, setData] = useState<AdminAnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const result = await handleGetAdminAnalytics();
        if (result.success) {
          setData(result.data);
        } else {
          toast.error(result.message);
        }
      } catch (error) {
        toast.error("Failed to load admin dashboard analytics");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 animate-pulse">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-40 bg-gray-200/50 rounded-2xl"></div>
        ))}
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-c7 tracking-tight">Admin Overview</h1>
        <p className="text-gray-500 mt-1">Global platform activity and metrics.</p>
      </div>

      {/* Primary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        <StatCard 
          title="Total Users" 
          value={data.totalUsers} 
          icon={Users} 
          iconColorClass="text-red"
          colorClass="bg-white"
        />
        <StatCard 
          title="Total Posts" 
          value={data.totalPosts} 
          icon={FileText} 
          iconColorClass="text-purple-600"
          colorClass="bg-white"
        />
        <StatCard 
          title="Total Proposals" 
          value={data.totalProposals} 
          icon={HandShake} 
          iconColorClass="text-emerald-600"
          colorClass="bg-white"
        />
        <StatCard 
          title="Total Chats" 
          value={data.totalChats} 
          icon={MessageCircle} 
          iconColorClass="text-orange-600"
          colorClass="bg-white"
        />
        <StatCard 
          title="Total Tags" 
          value={data.totalTags} 
          icon={TagIcon} 
          iconColorClass="text-pink-600"
          colorClass="bg-white"
        />
      </div>

      {/* Global Status Breakdown */}
      <div className="bg-white p-8 rounded-3xl border border-c2 shadow-sm">
        <h2 className="text-lg font-semibold text-c7 mb-6">Global Proposal Status</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-8">
          <div className="space-y-1">
            <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">Pending</span>
            <p className="text-3xl font-extrabold text-yellow-600">{data.statusBreakdown.pending}</p>
          </div>
          <div className="space-y-1">
            <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">Accepted</span>
            <p className="text-3xl font-extrabold text-green-600">{data.statusBreakdown.accepted}</p>
          </div>
          <div className="space-y-1">
            <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">Rejected</span>
            <p className="text-3xl font-extrabold text-red-600">{data.statusBreakdown.rejected}</p>
          </div>
          <div className="space-y-1">
            <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">Cancelled</span>
            <p className="text-3xl font-extrabold text-gray-400">{data.statusBreakdown.cancelled}</p>
          </div>
        </div>

        <div className="h-4 w-full bg-gray-100 rounded-full flex overflow-hidden">
          {Object.entries(data.statusBreakdown).map(([status, count], index) => {
            if (count === 0 || data.totalProposals === 0) return null;
            const width = (count / data.totalProposals) * 100;
            const colors = {
              pending: "bg-yellow-400",
              accepted: "bg-green-500",
              rejected: "bg-red-500",
              cancelled: "bg-gray-300",
            };
            return (
              <div 
                key={status}
                style={{ width: `${width}%` }}
                className={`${colors[status as keyof typeof colors]} h-full transition-all duration-700`}
              />
            );
          })}
        </div>
        <p className="mt-4 text-xs text-gray-400 italic">* Overall platform activity across all users.</p>
      </div>
    </div>
  );
}
