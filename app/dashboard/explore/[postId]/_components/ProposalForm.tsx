"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { Send, Loader2 } from "lucide-react";
import { handleCompleteProposalSubmission } from "@/lib/actions/proposal-actions";
import { handleGetMyPosts } from "@/lib/actions/post-actions";
import { useEffect, useState } from "react";
import { ProposalSchema, ScheduleSchema, ProposalFormDataComplete } from "../schema";

interface MyPost {
  _id: string;
  title: string;
}

type ProposalFormData = ProposalFormDataComplete;

interface ProposalFormProps {
  postId: string;
  receiverId: string;
}

export default function ProposalForm({ postId, receiverId }: ProposalFormProps) {
  const [myPosts, setMyPosts] = useState<MyPost[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(true);

  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        const result = await handleGetMyPosts("1", "100");
        if (result.success && result.data) {
          setMyPosts(result.data);
        }
      } catch (error: any) {
        toast.error("Failed to load your posts");
      } finally {
        setLoadingPosts(false);
      }
    };

    fetchMyPosts();
  }, []);

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ProposalFormData>({
    resolver: zodResolver(ProposalSchema.merge(ScheduleSchema)),
    defaultValues: {
      offeredSkill: "",
      message: "",
      proposedDate: "",
      proposedTime: "",
      durationMinutes: 60,
    },
  });

  const onSubmit = async (data: ProposalFormData) => {
    const submittingToastId = toast.loading("Submitting your proposal...");
    try {
      const proposalFormData = new FormData();
      proposalFormData.append("receiverId", receiverId);
      proposalFormData.append("postId", postId);
      proposalFormData.append("offeredSkill", data.offeredSkill);
      proposalFormData.append("message", data.message);

      const scheduleData = {
        proposedDate: data.proposedDate,
        proposedTime: data.proposedTime,
        durationMinutes: data.durationMinutes,
      };

      const result = await handleCompleteProposalSubmission(proposalFormData, scheduleData);

      if (result.success) {
        if (result.warning) {
          toast.update(submittingToastId, { render: result.message, type: "warning", isLoading: false, autoClose: 3000 });
        } else {
          toast.update(submittingToastId, { render: result.message, type: "success", isLoading: false, autoClose: 3000 });
          reset();
        }
      } else {
        toast.update(submittingToastId, { render: result.message || "Failed to submit proposal", type: "error", isLoading: false, autoClose: 3000 });
      }
    } catch {
      toast.update(submittingToastId, { render: "Failed to submit proposal", type: "error", isLoading: false, autoClose: 3000 });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          What You Offer <span className="text-red-500">*</span>
        </label>
        <select
          {...register("offeredSkill")}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-gray-50 hover:bg-white"
          disabled={loadingPosts}
        >
          <option value="">Select a post to offer</option>
          {loadingPosts ? (
            <option value="">Loading your posts...</option>
          ) : (
            myPosts.map((post) => (
              <option key={post._id} value={post._id}>
                {post.title}
              </option>
            ))
          )}
        </select>
        {errors.offeredSkill && (
          <p className="mt-1.5 text-sm text-red-500">
            {errors.offeredSkill.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Proposal Details <span className="text-red-500">*</span>
        </label>
        <textarea
          {...register("message")}
          rows={4}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-gray-50 hover:bg-white resize-none"
          placeholder="Describe what you can offer and why you're a good fit..."
        />
        {errors.message && (
          <p className="mt-1.5 text-sm text-red-500">
            {errors.message.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Proposed Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            {...register("proposedDate")}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-gray-50 hover:bg-white"
          />
          {errors.proposedDate && (
            <p className="mt-1.5 text-sm text-red-500">
              {errors.proposedDate.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Proposed Time <span className="text-red-500">*</span>
          </label>
          <input
            type="time"
            {...register("proposedTime")}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-gray-50 hover:bg-white"
          />
          {errors.proposedTime && (
            <p className="mt-1.5 text-sm text-red-500">
              {errors.proposedTime.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Duration (minutes) <span className="text-red-500">*</span>
        </label>
        <select
          {...register("durationMinutes", { valueAsNumber: true })}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-gray-50 hover:bg-white"
        >
          <option value={15}>15 minutes</option>
          <option value={30}>30 minutes</option>
          <option value={45}>45 minutes</option>
          <option value={60}>1 hour</option>
          <option value={90}>1.5 hours</option>
          <option value={120}>2 hours</option>
        </select>
        {errors.durationMinutes && (
          <p className="mt-1.5 text-sm text-red-500">
            {errors.durationMinutes.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Submit Proposal
          </>
        )}
      </button>

      <p className="text-xs text-gray-500 text-center">
        Your proposal will be sent to the skill poster for review.
      </p>
    </form>
  );
}
