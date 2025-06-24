"use client";
import { getJobs } from "@/api/jobsApi";
import JobCard from "@/components/JobCard";
import { JobEntity } from "@/types/jobs";
import { MenuItem, Select, Slider, Stack, Typography } from "@mui/material";
import Link from "next/link";
import React, { useCallback, useEffect } from "react";
import { toast } from "react-toastify";

export default function JobsListPage() {
  const [salaryRange, setSalaryRange] = React.useState<number[]>([20, 30]);
  const [jobs, setJobs] = React.useState<JobEntity[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [status, setStatus] = React.useState<string>("Applied");

  useEffect(() => {
    // Fetch jobs with filters
    const fetchJobs = async () => {
      try {
        setIsLoading(true);
        const jobsData = await getJobs({
          salary_gte: salaryRange[0],
          salary_lte: salaryRange[1],
          // status: "active",
        });
        setJobs(jobsData);
      } catch (error) {
        toast.error("Error fetching jobs:" + (error as Error).message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchJobs();
  }, [salaryRange]);

  const handleChange = (event: Event, newValue: number[]) => {
    setSalaryRange(newValue);
  };

  const handleDelete = useCallback((id: string) => {
    setJobs((prevJobs) => prevJobs.filter((job) => job._id !== id));
  }, []);

  return (
    <div>
      <Typography variant="h5" component="h1" className="mb-4 font-bold">
        Jobs List
      </Typography>
      <div className="flex justify-center items-center gap-6 mb-4">
        <Stack spacing={2} direction="row" sx={{ alignItems: "center", mb: 1 }}>
          <Typography
            variant="body2"
            className="min-w-[48px] text-right text-gray-600"
          >
            15 LPA
          </Typography>
          <Slider
            min={15}
            max={40}
            value={salaryRange}
            onChange={handleChange}
            valueLabelDisplay="auto"
            sx={{ width: "300px" }}
          />
          <Typography
            variant="body2"
            className="min-w-[48px] text-left text-gray-600"
          >
            40 LPA
          </Typography>
        </Stack>

        <Select value={status} onChange={(e) => setStatus(e.target.value)}>
          <MenuItem value="Applied">Applied</MenuItem>
          <MenuItem value="Interviewing">Interviewing</MenuItem>
          <MenuItem value="Offered">Offered</MenuItem>
          <MenuItem value="Rejected">Rejected</MenuItem>
        </Select>
      </div>
      {/* <ul>
        {jobs.map((job: JobFormInterface) => (
          <li key={job.id}>
            <Link href={`/jobs/${job.id}`}>
              {job.role} at {job.company}
            </Link>
          </li>
        ))}
      </ul> */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading ? (
          <div>Loading...</div>
        ) : jobs.length > 0 ? (
          jobs.map((job: JobEntity) => (
            <JobCard key={job._id} onDelete={handleDelete} {...job} />
          ))
        ) : (
          <div>No jobs found.</div>
        )}
      </div>
      <div className="mt-8 flex justify-end">
        <Link
          href="/jobs/new"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded shadow transition-colors"
        >
          Add New Job
        </Link>
      </div>
    </div>
  );
}
