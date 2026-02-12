"use client";

import { Controller, useForm } from "react-hook-form";
import { UserData, UserSchema } from "@/app/admin/users/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState, useTransition } from "react";
import { toast } from "react-toastify";
import { handleCreateUser } from "@/lib/actions/admin/user-actions";

export default function CreateUserForm() {
  const [pending, startTransition] = useTransition();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UserData>({
    resolver: zodResolver(UserSchema),
  });

  /* ---------------- Image logic ---------------- */

  const handleImageChange = (
    file: File | undefined,
    onChange: (file?: File) => void,
  ) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }

    onChange(file);
  };

  const handleDismissImage = (onChange?: (file?: File) => void) => {
    setPreviewImage(null);
    onChange?.(undefined);

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  /* ---------------- Submit logic ---------------- */

  const onSubmit = async (data: UserData) => {
    startTransition(async () => {
      try {
        const formData = new FormData();

        formData.append("email", data.email);
        formData.append("username", data.username);
        formData.append("password", data.password);
        formData.append("confirmPassword", data.confirmPassword);

        if (data.fullName) formData.append("fullName", data.fullName);
        if (data.image) formData.append("profilePicture", data.image);

        const res = await handleCreateUser(formData);

        if (!res.success) throw new Error(res.message);

        reset();
        handleDismissImage();
        toast.success("Profile created successfully");
      } catch (err: any) {
        toast.error(err.message || "Create failed");
      }
    });
  };

  /* ---------------- Reusable styles ---------------- */

  const inputClass =
    "h-10 w-full rounded-md border border-c2 bg-c6 px-3 text-sm text-c7 outline-none focus:border-c5";

  const errorClass = "text-xs text-c5";

  /* ---------------- UI ---------------- */

  return (
    <div className="min-h-full w-full flex items-center justify-center bg-c1 p-6">
      {/* Card container */}
      <div className="w-full max-w-xl bg-c6 border border-c2 rounded-xl p-8 space-y-5 shadow-sm">
        <h2 className="text-lg font-semibold text-c7 text-center">
          Create User
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-c7">
          {/* ---------------- Image preview ---------------- */}
          <div className="flex justify-center">
            {previewImage ? (
              <div className="relative w-24 h-24">
                <img
                  src={previewImage}
                  className="w-24 h-24 rounded-full object-cover border border-c2"
                />

                <Controller
                  name="image"
                  control={control}
                  render={({ field: { onChange } }) => (
                    <button
                      type="button"
                      onClick={() => handleDismissImage(onChange)}
                      className="
                        absolute top-0 right-0
                        w-6 h-6 rounded-full
                        bg-c5 text-c6
                        flex items-center justify-center
                      "
                    >
                      ✕
                    </button>
                  )}
                />
              </div>
            ) : (
              <div className="w-24 h-24 rounded-full bg-c3 flex items-center justify-center text-c6 text-xs">
                No Image
              </div>
            )}
          </div>

          {/* ---------------- File chooser ---------------- */}
          <Controller
            name="image"
            control={control}
            render={({ field: { onChange } }) => (
              <input
                ref={fileInputRef}
                type="file"
                accept=".jpg,.jpeg,.png,.webp"
                onChange={(e) =>
                  handleImageChange(e.target.files?.[0], onChange)
                }
                className="
                  w-full text-sm text-c7

                  file:mr-4
                  file:px-4 file:py-2
                  file:rounded-md
                  file:border-0
                  file:bg-c4
                  file:text-c6
                  file:cursor-pointer
                  file:hover:opacity-90
                "
              />
            )}
          />
          {errors.image && <p className={errorClass}>{errors.image.message}</p>}

          {/* ---------------- Inputs ---------------- */}
          <input
            {...register("fullName")}
            placeholder="Full name"
            className={inputClass}
          />
          {errors.fullName && (
            <p className={errorClass}>{errors.fullName.message}</p>
          )}

          <input
            {...register("email")}
            placeholder="Email"
            className={inputClass}
          />
          {errors.email && <p className={errorClass}>{errors.email.message}</p>}

          <input
            {...register("username")}
            placeholder="Username"
            className={inputClass}
          />
          {errors.username && (
            <p className={errorClass}>{errors.username.message}</p>
          )}

          <input
            type="password"
            {...register("password")}
            placeholder="Password"
            className={inputClass}
          />
          {errors.password && (
            <p className={errorClass}>{errors.password.message}</p>
          )}

          <input
            type="password"
            {...register("confirmPassword")}
            placeholder="Confirm password"
            className={inputClass}
          />
          {errors.confirmPassword && (
            <p className={errorClass}>{errors.confirmPassword.message}</p>
          )}

          {/* ---------------- Submit ---------------- */}
          <button
            type="submit"
            disabled={isSubmitting || pending}
            className="
              h-10 w-full rounded-md
              bg-c5 text-c6
              font-semibold
              hover:opacity-90
              disabled:opacity-60
            "
          >
            {isSubmitting || pending ? "Creating account..." : "Create account"}
          </button>
        </form>
      </div>
    </div>
  );
}
