import { CircularProgress } from "@mui/material";

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-96">
      <CircularProgress />
      <span className="text-lg font-semibold">Fetching jobs...</span>
    </div>
  );
}
