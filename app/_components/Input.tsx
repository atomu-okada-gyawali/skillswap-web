import React from "react";

const baseCls =
  "w-full rounded-xl border border-neutral-300 bg-white px-3 py-2.5 outline-none focus:border-black placeholder:text-neutral-400";

export default function Input({ className = "", ...props }) {
  return <input className={[baseCls, className].join(" ")} {...props} />;
}

