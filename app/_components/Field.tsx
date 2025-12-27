import React from "react";

type FieldProps = {
  label?: string;
  htmlFor?: string;
  error?: string;
  children: React.ReactNode;
};

export default function Field({ label, htmlFor, error, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          className="text-sm font-medium text-gray-700"
          htmlFor={htmlFor}
        >
          {label}
        </label>
      )}

      {children}

      {error && (
        <p
          className="text-sm text-red-500"
          role="alert"
          aria-live="polite"
        >
          {error}
        </p>
      )}
    </div>
  );
}