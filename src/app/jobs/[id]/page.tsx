import { getJobById, getJobs } from "@/api/jobsApi";
import JobForm from "@/components/JobForm";

import React from "react";

interface PageProps {
  params: { id: string };
}

const page = async (props: PageProps) => {
   const params = await props.params; 
  const jobData = await getJobById(params.id);
  const jobsList = await getJobs();

  console.log(params.id, jobData, jobsList);
  return <JobForm jobData={jobData} />;
};

export default page;
