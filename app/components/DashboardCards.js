"use client";
import { useContext, useEffect, useState } from "react";
import { TaskContext } from "./tasksApi";
import { ProjectContext } from "./projectsApi";
import AssignmentIcon from "@mui/icons-material/Assignment";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import FolderIcon from "@mui/icons-material/Folder";

import NumberCards from "../components/CardsNumbers";

export default function DashboardNumberCard() {
  const { userName } = useContext(ProjectContext);
  const { tasks } = useContext(TaskContext);

    console.log("tasks from dashboard Card", tasks);
  const completedTasks =
    tasks?.filter((task) => task.status === "Done").length || 0;
  const DoingTasks =
    tasks?.filter((task) => task.status === "Doing").length || 0;
  const TodoTasks = tasks?.filter((task) => task.status === "Todo").length || 0;

  return (
    <div>
      <h1 className="ml-2 mt-8 text-3xl font-bold">
        Welcome back, {userName}!
      </h1>
      <p className="ml-2">Manage your tasks efficiently</p>
      <div className="flex">
        <NumberCards
          status="Total Tasks"
          numbers={tasks?.length}
          icon={<AssignmentIcon sx={{ color: "purple" }} />}
        />
        <NumberCards
          status="Completed"
          numbers={completedTasks}
          icon={<HourglassTopIcon sx={{ color: "green" }} />}
        />
        <NumberCards
          status="In Progress"
          numbers={DoingTasks}
          icon={<CheckCircleIcon sx={{ color: "blue" }} />}
        />
        <NumberCards
          status="Todo"
          numbers={TodoTasks}
          icon={<FolderIcon sx={{ color: "orange" }} />}
        />
      </div>
    </div>
  );
}
