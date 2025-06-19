import Link from "next/link";

interface JobProps {
  id: string;
  company: string;
  role: string;
  status: string;
}

const JobCard = ({ id, company, role, status }: JobProps) => {
  return (
    <Link
      href={`/jobs/${id}`}
      className="p-4 border rounded-lg shadow-md bg-white"
    >
      <h2 className="font-semibold">
        {role} at {company}
      </h2>
      <p className="text-sm text-gray-600">Status: {status}</p>
    </Link>
  );
};

export default JobCard;
