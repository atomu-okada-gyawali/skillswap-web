import { BASE_URL } from "@/lib/api/axios";
import Image from "next/image";
import { MapPin, Clock, Calendar } from "lucide-react";

interface PostHeroCardProps {
  title: string;
  tags?: string[];
  postPhoto?: string;
  userId: { username: string; profilePicture: string; fullName: string };
  availability?: string;
  duration?: string;
  locationType?: string;
}

export default function PostHeroCard(props: PostHeroCardProps) {
  const {
    title,
    tags = [],
    postPhoto ,
    availability,
    duration,
    locationType,
  } = props;

  return (
    <div className="relative w-full rounded-2xl overflow-hidden bg-white shadow-lg">
      <div className="relative h-64 w-full">
        <Image
          src={postPhoto? BASE_URL + postPhoto : "/images/skillplaceholder.jpg"}
          alt={title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex flex-wrap gap-2 mb-3">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-medium rounded-full border border-white/30"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-2xl font-bold text-white">{title}</h1>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-blue-500 ring-offset-2">
            <Image
              src={props.userId.profilePicture ? BASE_URL + props.userId.profilePicture : "/images/avatarplaceholder.png"}
              alt={props.userId.username}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <p className="font-semibold text-gray-900">
              {props.userId.fullName}
            </p>
            <p className="text-sm text-gray-500">@{props.userId.username}</p>
          </div>
        </div>

        {(availability || duration || locationType) && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {availability && (
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 flex items-center justify-center bg-blue-100 rounded-lg">
                  <Clock className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Availability</p>
                  <p className="text-sm font-medium text-gray-900">
                    {availability}
                  </p>
                </div>
              </div>
            )}
            {duration && (
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 flex items-center justify-center bg-green-100 rounded-lg">
                  <Calendar className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Duration</p>
                  <p className="text-sm font-medium text-gray-900">
                    {duration}
                  </p>
                </div>
              </div>
            )}
            {locationType && (
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 flex items-center justify-center bg-purple-100 rounded-lg">
                  <MapPin className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Location</p>
                  <p className="text-sm font-medium text-gray-900">
                    {locationType}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
