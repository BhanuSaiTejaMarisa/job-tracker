import { Button } from "@mui/material";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <div>
      <div className="flex justify-between items-center p-4 bg-gray-100">
        <Link href="/">
          <h1 className="text-3xl font-bold text-center">Job Tracker</h1>
        </Link>
        <div className="flex space-x-4">
          <Button>Profile</Button>
          <Button>Logout</Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
