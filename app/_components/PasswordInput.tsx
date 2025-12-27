import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Input from "../_components/Input";

export default function PasswordInput() {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <Input
      />
      <button
        type="button"
        onClick={() => setShow((s) => !s)}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-neutral-600 hover:text-black"
        aria-label={show ? "Hide password" : "Show password"}
      >
        {show ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
      </button>
    </div>
  );
}
