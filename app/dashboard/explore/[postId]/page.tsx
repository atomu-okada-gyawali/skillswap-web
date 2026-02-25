import { handleGetOnePost } from "@/lib/actions/post-actions";
import PostHeroCard from "./_components/PostHeroCard";
import { CircleCheckBig, ArrowLeft } from "lucide-react";
import ProposalForm from "./_components/ProposalForm";
import Link from "next/link";

interface PostUserId {
  username: string;
  profilePicture: string;
  fullName: string;
  _id: string;
}

export default async function Page({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const { postId } = await params;
  const response = await handleGetOnePost(postId);
  if (!response.success) {
    throw new Error(response.message || "Failed to load post");
  }

  const post = response.data;
  const receiverId = (post.userId as PostUserId)._id;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4">
        <Link
          href="/dashboard/explore"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Back to Explore</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <PostHeroCard
              title={post.title}
              userId={{
                username: post.userId.username,
                profilePicture: post.userId.profilePicture,
                fullName: post.userId.fullName,
              }}
              postPhoto={post.postPhoto}
              tags={post.tags}
              availability={post.availability}
              duration={post.duration}
              locationType={post.locationType}
            />

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                About this skill
              </h2>
              <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                {post.description}
              </p>
            </div>

            {post.requirements && post.requirements.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Requirements
                </h2>
                <ul className="space-y-3">
                  {post.requirements.map((req: string, index: number) => (
                    <li key={index} className="flex items-start gap-3">
                      <CircleCheckBig className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Send a Proposal
                </h2>
                <ProposalForm postId={postId} receiverId={receiverId} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
