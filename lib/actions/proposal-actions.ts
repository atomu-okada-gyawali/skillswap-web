"use server";

import { revalidatePath } from "next/cache";
import {
  createProposal,
  deleteProposal,
  getAllProposals,
  getProposalById,
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

    const proposalRes = await createProposal(proposalData);

    if (!proposalRes.success || !proposalRes.data?._id) {
      return {
        success: false,
        message: proposalRes.message || "Failed to create proposal",
      };
    }

    const proposalId = proposalRes.data._id;

    const scheduleFormData = new FormData();
    scheduleFormData.append("proposalId", proposalId);
    scheduleFormData.append("proposedDate", scheduleData.proposedDate);
    scheduleFormData.append("proposedTime", scheduleData.proposedTime);
    scheduleFormData.append(
      "durationMinutes",
      scheduleData.durationMinutes.toString(),
    );

    const scheduleRes = await createSchedule(scheduleFormData);



    revalidatePath("/dashboard/proposals");

    if (scheduleRes.success) {
      return {
        success: true,
        message: "Proposal and schedule created successfully!",
        data: proposalRes.data,
      };
    } else {
      return {
        success: true,
        message: "Proposal created but failed to create schedule",
        data: proposalRes.data,
        warning: true,
      };
    }
  } catch (error: Error | any) {
    return {
      success: false,
      message: error.message || "Failed to complete proposal submission",
    };
  }
};
