import Link from "next/link";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { deleteJob } from "@/api/jobsApi";
import { toast } from "react-toastify";

interface JobProps {
  _id: string;
  company: string;
  role: string;
  status: string;
  salary: number;
  onDelete?: (id: string) => void; // Optional callback for parent to update list
}

const JobCard = ({
  _id,
  company,
  role,
  status,
  salary,
  onDelete,
}: JobProps) => {
  const router = useRouter();

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent Link navigation
    try {
      await deleteJob(_id);
      toast.success("Job deleted!");
      if (onDelete) onDelete(_id);
      else router.refresh(); // fallback: refresh page if no callback
    } catch (err) {
      toast.error("Failed to delete job.");
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-md bg-white flex items-center justify-between">
      <Link href={`/jobs/${_id}`} className="flex-1 min-w-0 mr-4">
        <h2 className="font-semibold truncate">
          {role} at {company}
        </h2>
        <h4 className="text-blue-700 font-medium">{salary} LPA</h4>
        <p className="text-sm text-gray-600">Status: {status}</p>
      </Link>
      <Button
        variant="outlined"
        color="error"
        size="small"
        onClick={handleDelete}
      >
        Delete
      </Button>
    </div>
  );
};

export default JobCard;
