"use client";
import React from "react";
import {
  Button,
  IconButton,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import InputFileUpload from "./InputFileUpload";
import { DatePicker } from "@mui/x-date-pickers";
import { JobFormInterface } from "@/types/jobs";
import dayjs, { Dayjs } from "dayjs";

interface InterviewRoundsProps {
  formData: JobFormInterface;
  setFormData: React.Dispatch<React.SetStateAction<JobFormInterface>>;
}

const InterviewRounds: React.FC<InterviewRoundsProps> = ({
  formData,
  setFormData,
}) => {
  const handleAddRound = () => {
    setFormData((prev) => ({
      ...prev,
      interviewRounds: [
        ...prev.interviewRounds,
        { title: "", date: null, result: "Pending", notes: "" },
      ],
    }));
  };

  const handleDeleteRound = (index: number) => () => {
    setFormData((prev) => ({
      ...prev,
      interviewRounds: prev.interviewRounds.filter((_, i) => i !== index),
    }));
  };

  const handleRoundChange =
    (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;

      setFormData((prev) => ({
        ...prev,
        interviewRounds: prev.interviewRounds.map((round, i) =>
          i === index ? { ...round, [name]: value } : round
        ),
      }));
    };

  const handleDateChange = (index: number, value: Dayjs | null) => {
    console.log(value);

    setFormData((prev) => ({
      ...prev,
      interviewRounds: prev.interviewRounds.map((round, i) =>
        i === index ? { ...round, date: value } : round
      ),
    }));
  };

  return (
    <div className="my-4">
      {/* label="Interview Rounds" */}
      {/* add round button */}
      {/* List of Interveiw Card */}
      <Typography className="">Interview Rounds</Typography>

      {formData.interviewRounds.map((round, index) => (
        <div key={index} className="mb-4">
          <Typography className="text-lg font-bold mb-2">
            Interview Round {index + 1}
          </Typography>
          <div className="relative grid grid-cols-4 gap-4 mb-4">
            <TextField
              name="title"
              placeholder="Tech Round 1"
              label="Title"
              value={round.title}
              onChange={handleRoundChange(index)}
            />
            <DatePicker
              name="date"
              // placeholder="Date"
              label="Date"
              value={round.date ? dayjs(round.date) : null}
              onChange={(value) => handleDateChange(index, value)}
            />
            <TextField
              name="result"
              placeholder="Pending" //enum: ["Pending", "Selected", "Rejected"]
              select
              label="Result"
              value={round.result}
              onChange={handleRoundChange(index)}
            >
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Selected">Selected</MenuItem>
              <MenuItem value="Rejected">Rejected</MenuItem>
            </TextField>
            <div className="absolute right-0 top-1/2 -translate-y-1/2">
              <IconButton onClick={handleDeleteRound(index)}>
                <DeleteIcon />
              </IconButton>
            </div>
          </div>

          <div className="flex gap-4 items-center">
            <TextField
              multiline
              minRows={2}
              maxRows={4}
              name="notes"
              placeholder="Asked about React Hooks"
              label="Notes"
              className="w-2/3"
              value={formData.interviewRounds[index].notes}
              onChange={handleRoundChange(index)}
            />

            <InputFileUpload />
          </div>
        </div>
      ))}
      <div className="flex justify-end">
        <Button
          variant="contained"
          color="primary"
          className="mb-4"
          onClick={handleAddRound}
        >
          Add Interview Round
        </Button>
      </div>
    </div>
  );
};

export default InterviewRounds;
