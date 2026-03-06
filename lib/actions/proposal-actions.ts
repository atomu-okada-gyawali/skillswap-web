"use server";

import { revalidatePath } from "next/cache";
import {
  createProposal,
  deleteProposal,
  getAllProposals,
  getProposalById,
  submitCompleteProposal,
  updateProposal,
  updateProposalStatus,
} from "../api/proposal";
import { createSchedule } from "../api/schedule";
import { createChat } from "../api/chat";

export const handleCreateProposal = async (data: FormData) => {
  try {
    const response = await createProposal(data);
    if (response.success) {
      revalidatePath("/proposals");
      return {
        success: true,
        message: "Proposal created successfully",
        data: response.data,
      };
    }
    return {
      success: false,
      message: response.message || "Proposal creation failed",
    };
  } catch (error: Error | any) {
    return {
      success: false,
      message: error.message || "Proposal creation action failed",
    };
  }
};

export const handleGetAllProposals = async (page: string, size: string) => {
  try {
    const currentPage = parseInt(page) || 1;
    const currentSize = parseInt(size) || 10;

    const response = await getAllProposals(currentPage, currentSize);
    if (response.success) {
      return {
        success: true,
        message: "Get all proposals successful",
        data: response.data,
        pagination: response.pagination,
      };
    }
    return {
      success: false,
      message: response.message || "Get all proposals failed",
    };
  } catch (error: Error | any) {
    return {
      success: false,
      message: error.message || "Get all proposals action failed",
    };
  }
};

export const handleGetOneProposal = async (id: string) => {
  try {
    const response = await getProposalById(id);
    if (response.success) {
      return {
        success: true,
        message: "Get proposal by id successful",
        data: response.data,
      };
    }
    return {
      success: false,
      message: response.message || "Get proposal by id failed",
    };
  } catch (error: Error | any) {
    return {
      success: false,
      message: error.message || "Get proposal by id action failed",
    };
  }
};

export const handleUpdateProposal = async (id: string, data: FormData) => {
  try {
    const response = await updateProposal(id, data);
    if (response.success) {
      revalidatePath("/proposals");
      return {
        success: true,
        message: "Update proposal successful",
        data: response.data,
      };
    }
    return {
      success: false,
      message: response.message || "Update proposal failed",
    };
  } catch (error: Error | any) {
    return {
      success: false,
      message: error.message || "Update proposal action failed",
    };
  }
};

export const handleUpdateProposalStatus = async (
  id: string,
  status: string,
) => {
  try {
    const response = await updateProposalStatus(id, status);
    if (response.success) {
      revalidatePath("/proposals");
      return {
        success: true,
        message: "Update proposal status successful",
        data: response.data,
      };
    }
    return {
      success: false,
      message: response.message || "Update proposal status failed",
    };
  } catch (error: Error | any) {
    return {
      success: false,
      message: error.message || "Update proposal status action failed",
    };
  }
};

export const handleDeleteProposal = async (id: string) => {
  try {
    const response = await deleteProposal(id);
    if (response.success) {
      revalidatePath("/proposals");
      return {
        success: true,
        message: "Delete proposal successful",
      };
    }
    return {
      success: false,
      message: response.message || "Delete proposal failed",
    };
  } catch (error: Error | any) {
    return {
      success: false,
      message: error.message || "Delete proposal action failed",
    };
  }
};
export const handleAcceptProposal = async (id: string) => {
  return await handleUpdateProposalStatus(id, "accepted");
};

export const handleRejectProposal = async (id: string) => {
  return await handleUpdateProposalStatus(id, "rejected");
};

export const handleCompleteProposalSubmission = async (
  proposalData: FormData,
  scheduleData: {
    proposedDate: string;
    proposedTime: string;
    durationMinutes: number;
  },
) => {
  try {
    // Convert FormData and scheduleData into a single object for the unified backend endpoint
    const unifiedData: any = {};
    proposalData.forEach((value, key) => {
      unifiedData[key] = value;
    });

    unifiedData.proposedDate = scheduleData.proposedDate;
    unifiedData.proposedTime = scheduleData.proposedTime;
    unifiedData.durationMinutes = scheduleData.durationMinutes;

    const result = await submitCompleteProposal(unifiedData);

    if (result.success) {
      revalidatePath("/dashboard/proposals");
      return {
        success: true,
        message: "Proposal submitted successfully!",
        data: result.data,
      };
    }

    return {
      success: false,
      message: result.message || "Failed to submit proposal",
    };
  } catch (error: Error | any) {
    return {
      success: false,
      message: error.message || "Failed to complete proposal submission",
    };
  }
};
