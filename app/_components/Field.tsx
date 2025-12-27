import React from "react";

type FieldProps = {
  label?: string;
  htmlFor?: string;
  error?: string;
  children: React.ReactNode;
};

export default function Field({ label, htmlFor, error, children }: FieldProps) {
  return (
    <div className="grid gap-1.5">
      {label && (
        <label
          className="text-sm font-medium text-neutral-800"
          htmlFor={htmlFor}
        >
          {label}
        </label>
      )}

      {children}

      {error && (
        <p
          className="text-sm text-red-600 flex items-center gap-1"
          role="alert"
          aria-live="polite"
        >
          {error}
        </p>
      )}
    </div>
  );
}
