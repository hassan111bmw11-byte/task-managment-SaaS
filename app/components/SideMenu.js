// mui icons
"use client";

import OtherHousesIcon from "@mui/icons-material/OtherHouses";
import HomeIcon from "@mui/icons-material/Home";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
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
    setUser(parsedUser.data?.userName);
  }, []);

  function Logout() {
    window.location.href = "/";
  }

  return (
    <div className="w-60 bg-gray-900 h-lvh flex flex-col items-center ">
      <h1 className="text-3xl  text-amber-50 pt-4">
        <OtherHousesIcon className="scale-150 mr-4 mb-3" /> TaskPro
      </h1>
      <hr className="text-gray-500 w-52 mt-4" />
      <label className="text-white mr-40 mt-4">Main</label>
      <div className="ml-8 font-semibold text-amber-50 ">
        <Link href="/MainContent/dashboard">
          <nav className="hover:bg-gray-600 w-60 transition-all transition-discrete ">
            <SpaceDashboardIcon className="m-4 " />
            Dashboard
          </nav>
        </Link>
        <Link href="/MainContent/projects_temp">
          <nav className="hover:bg-gray-600 w-60 transition-all transition-discrete ">
            <FolderSharedIcon className="m-4" />
            My projects & Tasks
          </nav>
        </Link>

        {/* <nav className="hover:bg-gray-600 w-60 transition-all transition-discrete ">
          <SettingsIcon className="m-4" />
          Settings
        </nav> */}
      </div>
      <div className="absolute bottom-8 left-4 text-amber-600">
        <hr className="text-gray-500 w-52 mt-4" />
        {/* Users Info */}
        <div className="mt-4 ml-4 flex flex-col gap-4 text-gray-600">
          <div className="flex items-center gap-4 text text-amber-50"><Avatar /> {user}</div>
          <button onClick={Logout} className="text-gray-900 hover:bg-gray-600 hover:text-amber-50 transition-all duration-500 ease-in-out font-bold h-8 bg-amber-50 rounded-2xl">Logout</button>
        </div>
      </div>
    </div>
  );
}
