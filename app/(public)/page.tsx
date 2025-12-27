import React from "react";
import Image from "next/image";
import Link from "next/link";

const SkillSwapPage: React.FC = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-gray-50 text-gray-800">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between md:mt-20 py-10 md:py-20">
          <div className="md:w-1/2 text-center md:text-left space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold text-c5 leading-tight">
              TRADING TALENTS
              <br />
              SWAPPING SKILLS.
            </h1>
            <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#3BB9D6] via-[#6A6CD2] via-[#5FDB8F] to-[#60A2FF] bg-clip-text text-transparent">
              Connecting communities
            </p>
          </div>
          <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
            <div className="relative w-full max-w-lg aspect-[729/533]">
              <Image
                src="/images/homepage_art.png"
                alt="Homepage Art"
                fill
                className="object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            WHAT IS SKILL SWAP?
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            A peer-to-peer platform where members can swap their skills and
            services for free. Our matchmaking technology will find you a direct
            trade, based on what you can offer and what you need.
          </p>
          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 mt-8 justify-center">
            <Link
              href="/login"
              className="inline-block bg-c4 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-c5 transition shadow-md"
            >
              Login
            </Link>
            <Link
              className="inline-block bg-amber-300 text-gray-800 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-amber-400 transition shadow-md"
              href="/register"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillSwapPage;
