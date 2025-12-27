import React from "react";
import Image from "next/image";
const SkillSwapPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col ">
      <div className="flex border justify-center items-center mt-10 md:mt-20 md:flex-row flex-col md:space-x-10 space-y-6 md:space-y-0 px-4">
        <div className=" borders text-center md:text-left md:w-1/2 space-y-6">
          <h1 className="text-5xl font-bold text-c40 text-c5">
            TRADING TALENTS
            <br />
            SWAPPING SKILLS.
          </h1>
          <p className="text-3xl font-bold bg-gradient-to-r from-[#3BB9D6] via-[#6A6CD2] via-[#5FDB8F] to-[#60A2FF] bg-clip-text text-transparent">
            Connecting communities
          </p>
        </div>

        {/* Right Image Section */}
        <div className="mt-6 md:mt-0 md:w-1/2 flex flex-col space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative w-full aspect-[729/533] md:col-span-2">
              <Image
                src="/images/homepage_art.png"
                alt="homepageart"
                fill
                className="object-cover rounded-lg border-2"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col items-center justify-center">
        <div className="flex-col items-center text-gray-700 mt-4 max-w-md flex">
          <p className="">WHAT IS SKILL SWAP?</p>
          <p>
            A peer to peer platform, where members can swap their skills and
            services for free. Our matchmaking technology will find you a direct
            trade, based on what you can offer and what you need.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0 mt-6 justify-center md:justify-start">
          <button className="bg-c4 text-white px-6 py-2 rounded-lg hover:bg-c4 transition">
            Login
          </button>
          <button className="bg-amber-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-amber-300 transition">
            Sign up
          </button>
          <button className="bg-c4 text-white px-6 py-2 rounded-lg hover:bg-c4 transition">
            Download app
          </button>
        </div>
      </div>
    </div>
  );
};

export default SkillSwapPage;
