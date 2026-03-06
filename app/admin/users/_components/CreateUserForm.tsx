"use client";

import { Controller, useForm } from "react-hook-form";
import { UserData, UserSchema } from "@/app/admin/users/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState, useTransition } from "react";
import { toast } from "react-toastify";
import { handleUserSubmission } from "@/lib/actions/admin/user-actions";
import { Upload, X, UserPlus } from "lucide-react";

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

  const onImageChange = (
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

  const onDismissImage = (onChange?: (file?: File) => void) => {
    setPreviewImage(null);
    onChange?.(undefined);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const onSubmit = async (data: UserData) => {
    startTransition(async () => {
      try {
        const res = await handleUserSubmission(data);

        if (!res.success) throw new Error(res.message);

        reset();
        onDismissImage();
        toast.success("User created successfully");
      } catch (err: any) {
        toast.error(err.message || "Create failed");
      }
    });
  };

  const inputClass =
    "h-11 w-full rounded-lg border border-c3 bg-white px-4 text-sm text-c7 outline-none focus:border-c5 focus:ring-2 focus:ring-c5/20 transition-colors";

  const labelClass = "block text-sm font-medium text-c7 mb-1.5";

  return (
    <div className="max-w-xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-c2 p-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-c5 rounded-lg flex items-center justify-center">
            <UserPlus className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-c7">Create User</h1>
            <p className="text-sm text-c7 opacity-60">
              Add a new member to your team
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="flex justify-center">
            {previewImage ? (
              <div className="relative">
                <img
                  src={previewImage}
                  alt="Preview"
                  className="w-24 h-24 rounded-full object-cover ring-4 ring-c1"
                />
                <Controller
                  name="profilePicture"
                  control={control}
                  render={({ field: { onChange } }) => (
                    <button
                      type="button"
                      onClick={() => onDismissImage(onChange)}
                      className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                />
              </div>
            ) : (
              <div className="w-24 h-24 rounded-full bg-c1 flex items-center justify-center">
                <Upload className="w-8 h-8 text-c7 opacity-40" />
              </div>
            )}
          </div>

          <Controller
            name="profilePicture"
            control={control}
            render={({ field: { onChange } }) => (
              <div>
                <label className={labelClass}>Profile Photo</label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".jpg,.jpeg,.png,.webp"
                  onChange={(e) =>
                    onImageChange(e.target.files?.[0], onChange)
                  }
                  className="block w-full text-sm text-c7 opacity-60 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-c5 file:text-white file:cursor-pointer file:transition-opacity hover:file:opacity-90"
                />
              </div>
            )}
          />
          {errors.profilePicture && (
            <p className="text-xs text-red-500">
              {errors.profilePicture.message}
            </p>
          )}

          <div>
            <label className={labelClass}>Full Name</label>
            <input
              {...register("fullName")}
              placeholder="default"
              className={inputClass}
            />
            {errors.fullName && (
              <p className="text-xs text-red-500 mt-1">
                {errors.fullName.message}
              </p>
            )}
          </div>

          <div>
            <label className={labelClass}>Email</label>
            <input
              {...register("email")}
              type="email"
              placeholder="default"
              className={inputClass}
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className={labelClass}>Username</label>
            <input
              {...register("username")}
              placeholder="default"
              className={inputClass}
            />
            {errors.username && (
              <p className="text-xs text-red-500 mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          <div>
            <label className={labelClass}>Password</label>
            <input
              type="password"
              {...register("password")}
              placeholder="default"
              className={inputClass}
            />
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label className={labelClass}>Confirm Password</label>
            <input
              type="password"
              {...register("confirmPassword")}
              placeholder="default"
              className={inputClass}
            />
            {errors.confirmPassword && (
              <p className="text-xs text-red-500 mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting || pending}
            className="w-full h-11 rounded-lg bg-c5 text-white font-semibold hover:bg-c4 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting || pending ? (
              "Creating..."
            ) : (
              <>
                <UserPlus className="w-4 h-4" />
                Create User
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
