"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import { Send, Loader2 } from "lucide-react";
import { handleCreateProposal } from "@/lib/actions/proposal-actions";
import { handleCreateSchedule } from "@/lib/actions/schedule-actions";
import { handleGetMyPosts } from "@/lib/actions/post-actions";
import { useEffect, useState } from "react";

interface MyPost {
  _id: string;
  title: string;
}

const ProposalSchema = z.object({
  whatYouOffer: z.string().min(1, "Please select what you offer"),
  proposalDetails: z
    .string()
    .min(10, "Proposal details must be at least 10 characters"),
  proposedDate: z.string().min(1, "Please select a date"),
  proposedTime: z.string().min(1, "Please select a time"),
  durationMinutes: z.number().min(15, "Duration must be at least 15 minutes"),
});

type ProposalFormData = z.infer<typeof ProposalSchema>;

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

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProposalFormData>({
    resolver: zodResolver(ProposalSchema),
    defaultValues: {
      whatYouOffer: "",
      proposalDetails: "",
      proposedDate: "",
      proposedTime: "",
      durationMinutes: 60,
    },
  });

  const onSubmit = async (data: ProposalFormData) => {
    try {
      const proposalFormData = new FormData();
      proposalFormData.append("receiverId", receiverId);
      proposalFormData.append("postId", postId);
      proposalFormData.append("offeredSkill", data.whatYouOffer);
      proposalFormData.append("message", data.proposalDetails);

      const proposalResponse = await handleCreateProposal(proposalFormData);

      if (proposalResponse.success && proposalResponse.data?._id) {
        const proposalId = proposalResponse.data._id;

        const scheduleFormData = new FormData();
        scheduleFormData.append("proposalId", proposalId);
        scheduleFormData.append("proposedDate", data.proposedDate);
        scheduleFormData.append("proposedTime", data.proposedTime);
        scheduleFormData.append("durationMinutes", data.durationMinutes.toString());

        const scheduleResponse = await handleCreateSchedule(scheduleFormData);

        if (scheduleResponse.success) {
          toast.success("Proposal and schedule created successfully!");
          reset();
        } else {
          toast.error("Proposal created but failed to create schedule");
        }
      } else {
        toast.error(proposalResponse.message || "Failed to submit proposal");
      }
    } catch {
      toast.error("Failed to submit proposal");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          What You Offer <span className="text-red-500">*</span>
        </label>
        <select
          {...register("whatYouOffer")}
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
        {errors.whatYouOffer && (
          <p className="mt-1.5 text-sm text-red-500">
            {errors.whatYouOffer.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Proposal Details <span className="text-red-500">*</span>
        </label>
        <textarea
          {...register("proposalDetails")}
          rows={4}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-gray-50 hover:bg-white resize-none"
          placeholder="Describe what you can offer and why you're a good fit..."
        />
        {errors.proposalDetails && (
          <p className="mt-1.5 text-sm text-red-500">
            {errors.proposalDetails.message}
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
