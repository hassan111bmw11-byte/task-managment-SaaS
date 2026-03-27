// mui icons
"use client";

import OtherHousesIcon from "@mui/icons-material/OtherHouses";
import HomeIcon from "@mui/icons-material/Home";
// import DashboardIcon from "@mui/icons-material/Dashboard";
import FolderSharedIcon from "@mui/icons-material/FolderShared";
import TaskIcon from "@mui/icons-material/Task";
import SettingsIcon from "@mui/icons-material/Settings";
import Avatar from "@mui/material/Avatar";
import Link from "next/link";
import { useState, useEffect, use } from "react";

// ====mui icons==

export default function SideMenu() {
  const [user, setUser] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("data") || [];
    const parsedUser = storedUser ? JSON.parse(storedUser) : null;
    setUser(parsedUser.data.userName);
  }, []);

  return (
    <div className="w-60 bg-gray-900 h-lvh flex flex-col items-center ">
      <h1 className="text-3xl  text-amber-50 pt-4">
        <OtherHousesIcon className="scale-150 mr-4 mb-3" /> TaskPro
      </h1>
      <hr className="text-gray-500 w-52 mt-4" />

      <div className=" mt-8 font-semibold text-amber-50 ">
        <Link href="/">
          <nav className="hover:bg-gray-600 w-60 transition-all transition-discrete ">
            <HomeIcon className="m-4 " />
            Home
          </nav>
        </Link>
        <Link href="/MainContent/dashboard">
          <nav className="hover:bg-gray-600 w-60 transition-all transition-discrete ">
            {/* <DashboardIcon className="m-4 " /> */}
            Dashboard
          </nav>
        </Link>
        <Link href="/MainContent/projects_temp">
          <nav className="hover:bg-gray-600 w-60 transition-all transition-discrete ">
            <FolderSharedIcon className="m-4" />
            My projects & Tasks
          </nav>
        </Link>

        <nav className="hover:bg-gray-600 w-60 transition-all transition-discrete ">
          <SettingsIcon className="m-4" />
          Settings
        </nav>
      </div>
      <div className="absolute bottom-8 left-4 text-amber-600">
        <hr className="text-gray-500 w-52 mt-4" />
        {/* Users Info */}
        <div className="mt-4 ml-4 flex items-center gap-4 text-gray-600">
          <Avatar /> {user}
        </div>
      </div>
    </div>
  );
}
