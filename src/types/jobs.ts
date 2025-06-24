import { Dayjs } from "dayjs";

export type ResultType = "Pending" | "Selected" | "Rejected";

export interface InterviewInterface {
  title: string;
  date: Dayjs | null;
  result: ResultType;
  notes: string;
}

export interface JobFormInterface {
  _id?: string; // optional for new jobs
  role: string;
  company: string;
  salary: number;
  location: string;
  status: string;
  priority: string;
  contact: string;
  notes: string;
  interviewRounds: InterviewInterface[];
}

export interface JobEntity extends JobFormInterface {
  _id: string;
}