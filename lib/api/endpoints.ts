export const API = {
  AUTH: {
    LOGIN: "/api/auth/login",
    REGISTER: "/api/auth/register",
    UPDATEPROFILE: "/api/auth/update-profile",
    GET_PROFILE_IMAGE: (filename: string) =>
      `/api/auth/profile-image/${filename}`,
    GET_USER_PROFILE_IMAGE: (userId: string) =>
      `/api/auth/user/${userId}/profile-image`,
    REQUEST_PASSWORD_RESET: "/api/auth/request-password-reset",
    RESET_PASSWORD: (token: string) => `/api/auth/reset-password/${token}`,
  },

  ADMIN: {
    USER: {
      CREATE: "/api/admin/users/",
      GET_ALL: "/api/admin/users/",
      GET_ONE: (userId: string) => `/api/admin/users/${userId}`,
      UPDATE: (userId: string) => `/api/admin/users/${userId}`,
      DELETE: (userId: string) => `/api/admin/users/${userId}`,
    },
    TAG: {
      CREATE: "/api/admin/tags/",
      GET_ALL: "/api/admin/tags/",
      GET_ONE: (tagId: string) => `/api/admin/tags/${tagId}`,
      UPDATE: (tagId: string) => `/api/admin/tags/${tagId}`,
      DELETE: (tagId: string) => `/api/admin/tags/${tagId}`,
    },
  },
  POST: {
    CREATE: "/api/posts/",
    GET_ALL: "/api/posts/",
    GET_ONE: (postId: string) => `/api/posts/${postId}`,
    UPDATE: (postId: string) => `/api/posts/${postId}`,
    DELETE: (postId: string) => `/api/posts/${postId}`,
    GET_MY_POSTS: "/api/posts/my-posts",
  },

  PROPOSAL: {
    CREATE: "/api/proposals/",
    GET_ALL: "/api/proposals/",
    GET_ONE: (proposalId: string) => `/api/proposals/${proposalId}`,
    UPDATE: (proposalId: string) => `/api/proposals/${proposalId}`,
    UPDATE_STATUS: (proposalId: string) =>
      `/api/proposals/${proposalId}/status`,
    DELETE: (proposalId: string) => `/api/proposals/${proposalId}`,
  },

  CHAT: {
    CREATE: "/api/chats/",
    GET_ALL: "/api/chats/",
    GET_BY_PROPOSAL: (proposalId: string) =>
      `/api/chats/proposal/${proposalId}`,
    GET_ONE: (chatId: string) => `/api/chats/${chatId}`,
    DELETE: (chatId: string) => `/api/chats/${chatId}`,
  },

  MESSAGE: {
    CREATE: "/api/messages/",
    GET_BY_CHAT: (chatId: string) => `/api/messages/chat/${chatId}`,
    GET_ONE: (messageId: string) => `/api/messages/${messageId}`,
    DELETE: (messageId: string) => `/api/messages/${messageId}`,
  },

  SCHEDULE: {
    CREATE: "/api/schedules/",
    GET_ALL: "/api/schedules/",
    GET_ONE: (scheduleId: string) => `/api/schedules/${scheduleId}`,
    UPDATE: (scheduleId: string) => `/api/schedules/${scheduleId}`,
    DELETE: (scheduleId: string) => `/api/schedules/${scheduleId}`,
  },

  TAG: {
    GET_ALL: "/api/tags/",
    GET_ONE: (tagId: string) => `/api/tags/${tagId}`,
  },

  FAVORITE: {
    CREATE: "/api/favorites/",
    DELETE: (postId: string) => `/api/favorites/${postId}`,
    GET_ALL: "/api/favorites/",
    CHECK: (postId: string) => `/api/favorites/check/${postId}`,
    GET_POST_IDS: "/api/favorites/post-ids",
  },
};
