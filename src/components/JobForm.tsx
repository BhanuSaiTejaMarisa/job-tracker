"use client";
import React, { useEffect, useState } from "react";

import { Button, MenuItem, TextField } from "@mui/material";
import InterviewRounds from "./InterviewRounds";
import { createJob, updateJob } from "@/api/jobsApi";
import { JobFormInterface } from "@/types/jobs";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const initJobFormData: JobFormInterface = {
  role: "",
  company: "",
  salary: 0,
  location: "",
  status: "",
  priority: "",
  contact: "",
  notes: "",
  interviewRounds: [
    {
      title: "",
      date: null,
      result: "Pending",
      notes: "",
    },
  ],
};

interface JobFormProps {
  jobData?: JobFormInterface; // optional, for edit
}

const JobForm: React.FC<JobFormProps> = ({ jobData }) => {
  const [formData, setFormData] = useState<JobFormInterface>(
    jobData || initJobFormData
  );
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (jobData) setFormData(jobData);
  }, [jobData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "salary") {
      // Validate salary to be a number
      // const numericValue = value.replace(/[^0-9]/g, "");
      setFormData({ ...formData, [name]: Number(value) });
      return;
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // submit form data
    try {
      let response;
      setLoading(true);
      if (jobData && jobData._id) {
        response = await updateJob(jobData._id, formData);
        setFormData(response);
        toast.success("Job updated successfully!");
      } else {
        response = await createJob(formData);
        // or redirect to jobs list page
        // setFormData(initJobFormData);
        router.push("/jobs");
        toast.success("Job created successfully!");
      }
    } catch (err) {
      toast.error("Failed to create job.");
      console.error("Error submitting form:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-4 gap-4 mb-4">
        <TextField
          name="role"
          placeholder="Frontend Developer"
          label="Role"
          value={formData.role}
          onChange={handleChange}
        />
        <TextField
          name="company"
          placeholder="Google"
          label="Company Name"
          value={formData.company}
          onChange={handleChange}
        />
        {/* salary to be validated to a number */}
        <TextField
          name="salary"
          placeholder="30 LPA"
          label="Salary (LPA)"
          value={formData.salary}
          onChange={handleChange}
        />
        <TextField
          name="location"
          placeholder="Bangalore"
          label="Location"
          value={formData.location}
          onChange={handleChange}
        />
        <TextField
          select
          name="status"
          label="Status"
          value={formData.status}
          onChange={handleChange}
        >
          <MenuItem value={"Applied"}>Applied</MenuItem>
          <MenuItem value={"Interviewing"}>Interviewing</MenuItem>
          <MenuItem value={"Offered"}>Offered</MenuItem>
          <MenuItem value={"Rejected"}>Rejected</MenuItem>
        </TextField>

        <TextField
          select
          name="priority"
          label="Priority"
          value={formData.priority}
          onChange={handleChange}
        >
          <MenuItem value={"High"}>High</MenuItem>
          <MenuItem value={"Medium"}>Medium</MenuItem>
          <MenuItem value={"Low"}>Low</MenuItem>
        </TextField>

        {/* type phone number */}
        <TextField
          name="contact"
          label="Contact"
          value={formData.contact}
          onChange={handleChange}
        />
      </div>

      <TextField
        multiline
        rows={4}
        name="notes"
        label="Notes"
        value={formData.notes}
        onChange={handleChange}
        className="w-2/3"
      />
      {/* Interveiw Rounds */}
      <InterviewRounds formData={formData} setFormData={setFormData} />
      <div className="flex justify-end mt-6">
        <Button
          variant="outlined"
          type="submit"
          size="large"
          loading={isLoading}
        >
          {isLoading ? "Submitting..." : jobData ? "Update Job" : "Create Job"}
        </Button>
      </div>
    </form>
  );
};

export default JobForm;
