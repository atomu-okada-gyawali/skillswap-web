import axios from "./axios";
import { API } from "./endpoints";

export const createProposal = async (proposalData: any) => {
  try {
    const response = await axios.post(API.PROPOSAL.CREATE, proposalData);
    return response.data;
  } catch (error: Error | any) {
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Create proposal failed",
    );
  }
};

export const getProposalById = async (id: string) => {
  try {
    const response = await axios.get(API.PROPOSAL.GET_ONE(id));
    return response.data;
  } catch (error: Error | any) {
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Get proposal by id failed",
    );
  }
};

export const getAllProposals = async (page: number, size: number) => {
  try {
    const response = await axios.get(API.PROPOSAL.GET_ALL, {
      params: { page, size },
    });
    return response.data;
  } catch (error: Error | any) {
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Get all proposals failed",
    );
  }
};

export const updateProposal = async (id: string, updateData: any) => {
  try {
    const response = await axios.put(API.PROPOSAL.UPDATE(id), updateData);
    return response.data;
  } catch (error: Error | any) {
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Update proposal failed",
    );
  }
};

export const updateProposalStatus = async (id: string, status: string) => {
  try {
    const response = await axios.patch(API.PROPOSAL.UPDATE_STATUS(id), {
      status,
    });
    return response.data;
  } catch (error: Error | any) {
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Update proposal status failed",
    );
  }
};

export const deleteProposal = async (id: string) => {
  try {
    const response = await axios.delete(API.PROPOSAL.DELETE(id));
    return response.data;
  } catch (error: Error | any) {
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Delete proposal failed",
    );
  }
};
