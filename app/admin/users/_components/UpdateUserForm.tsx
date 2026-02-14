"use client";
import { Controller, useForm } from "react-hook-form";
import { UserData, UserSchema } from "@/app/admin/users/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState, useTransition } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { handleUpdateUser } from "@/lib/actions/admin/user-actions";
import Image from "next/image";
import { Upload, X, ArrowLeft, Save } from "lucide-react";

export default function UpdateUserForm({ user }: { user: any }) {
  const [pending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<Partial<UserData>>({
    resolver: zodResolver(UserSchema.partial()),
    defaultValues: {
      fullName: user.fullName || "",
      email: user.email || "",
      username: user.username || "",
      profilePicture: undefined,
    },
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (
    file: File | undefined,
    onChange: (file: File | undefined) => void,
  ) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
    onChange(file);
  };

  const handleDismissImage = (onChange?: (file: File | undefined) => void) => {
    setPreviewImage(null);
    onChange?.(undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const onSubmit = async (data: Partial<UserData>) => {
    startTransition(async () => {
      try {
        const formData = new FormData();
        if (data.fullName) {
          formData.append("fullName", data.fullName);
        }
        if (data.email) {
          formData.append("email", data.email);
        }
        if (data.username) {
          formData.append("username", data.username);
        }
        if (data.profilePicture) {
          formData.append("profilePicture", data.profilePicture);
        }
        const response = await handleUpdateUser(user._id, formData);

        if (!response.success) {
          throw new Error(response.message || "Update failed");
        }
        toast.success("User updated successfully");
      } catch (error: Error | any) {
        toast.error(error.message || "Update failed");
      }
    });
  };

  const inputClass =
    "h-11 w-full rounded-lg border border-c3 bg-white px-4 text-sm text-c7 outline-none focus:border-c5 focus:ring-2 focus:ring-c5/20 transition-colors";

  const labelClass = "block text-sm font-medium text-c7 mb-1.5";

  return (
    <div className="max-w-xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-c2 p-8">
        <Link
          href="/admin/users"
          className="inline-flex items-center gap-1.5 text-sm text-c7 opacity-60 hover:text-c5 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Users
        </Link>

        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-c5 rounded-lg flex items-center justify-center">
            <Save className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-c7">Edit User</h1>
            <p className="text-sm text-c7 opacity-60">Update user information</p>
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
                      onClick={() => handleDismissImage(onChange)}
                      className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                />
              </div>
            ) : user.profilePictureUrl ? (
              <Image
                src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${user.profilePictureUrl}`}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover ring-4 ring-c1"
                width={96}
                height={96}
              />
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
                    handleImageChange(e.target.files?.[0], onChange)
                  }
                  className="block w-full text-sm text-c7 opacity-60 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-c5 file:text-white file:cursor-pointer file:transition-opacity hover:file:opacity-90"
                />
              </div>
            )}
          />
          {errors.profilePicture && (
            <p className="text-xs text-red-500">{errors.profilePicture.message}</p>
          )}

          <div>
            <label className={labelClass}>Full Name</label>
            <input
              {...register("fullName")}
              placeholder="Enter full name"
              className={inputClass}
            />
            {errors.fullName && (
              <p className="text-xs text-red-500 mt-1">{errors.fullName.message}</p>
            )}
          </div>

          <div>
            <label className={labelClass}>Email</label>
            <input
              {...register("email")}
              type="email"
              placeholder="Enter email address"
              className={inputClass}
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className={labelClass}>Username</label>
            <input
              {...register("username")}
              placeholder="Enter username"
              className={inputClass}
            />
            {errors.username && (
              <p className="text-xs text-red-500 mt-1">{errors.username.message}</p>
            )}
          </div>

          <div className="flex gap-3 pt-2">
            <Link
              href={`/admin/users/${user._id}`}
              className="flex-1 h-11 rounded-lg border border-c3 text-c7 font-medium flex items-center justify-center hover:bg-c1 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting || pending}
              className="flex-1 h-11 rounded-lg bg-c5 text-white font-medium hover:bg-c4 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting || pending ? "Updating..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
