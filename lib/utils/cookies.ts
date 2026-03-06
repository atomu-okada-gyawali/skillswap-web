"use client";

export interface UserData {
  _id: string;
  email: string;
  username: string;
  fullName: string;
  profilePicture?: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export const getCookie = (name: string): string | null => {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  if (match) return match[2];
  return null;
};

export const getUserDataFromCookie = (): UserData | null => {
  const userDataStr = getCookie("user_data");
  if (!userDataStr) return null;
  try {
    return JSON.parse(decodeURIComponent(userDataStr));
  } catch {
    return null;
  }
};
