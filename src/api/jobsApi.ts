import { JobFormInterface } from "@/types/jobs";
import axiosInstance from "./axiosInstance";

export const getJobs = async (filters?: Record<string, string>) => {
  const params = new URLSearchParams();

  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== "") {
        params.append(key, value);
      }
    });
  }

  const response = await axiosInstance.get(`/jobs?${params.toString()}`);
  return response.data;
};

export const getJobById = async (id: string) => {
  const response = await axiosInstance.get(`/jobs/${id}`);
  return response.data;
};

export const createJob = async (jobData: JobFormInterface) => {
  const response = await axiosInstance.post("/jobs", jobData);
  return response.data;
};

export const updateJob = async (id: string, jobData: JobFormInterface) => {
  const response = await axiosInstance.put(`/jobs/${id}`, jobData);
  return response.data;
};

// You can add more functions like getJobs, updateJob, etc.
