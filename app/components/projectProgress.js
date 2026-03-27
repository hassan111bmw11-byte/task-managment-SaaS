"use client";

import ProgressLine from "../components/progress";
import TaskStatisticspie from "./TaskStatistics";
import { useContext } from "react";
import { ProjectContext } from "./projectsApi";
export default function ProjectProgress() {
  const { projects } = useContext(ProjectContext);

  return (
    <div className="w-7xl flex h-80 m-8">
      <div className=" bg-white w-180 rounded-2xl">
        <p className=" p-4 text-2xl pl-8">Project Overview</p>
        <div className="">
          <ProgressLine title={projects[0]?.title} />
          <ProgressLine title={projects[1]?.title} color="bg-green-400" />
          <ProgressLine title={projects[2]?.title} color="bg-zinc-800" />
        </div>
      </div>
      <div>
        <TaskStatisticspie />
      </div>
    </div>
  );
}
