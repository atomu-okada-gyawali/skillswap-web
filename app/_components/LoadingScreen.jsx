import React from "react";

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 rounded-full border-4 border-gray-200 border-t-black animate-spin" />
        <div className="text-sm text-gray-700">Loading…</div>
      </div>
    </div>
  );
}

