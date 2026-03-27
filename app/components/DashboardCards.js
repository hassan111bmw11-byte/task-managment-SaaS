"use client";
import { useContext } from "react";
import { TaskContext } from "./tasksApi";
import AssignmentIcon from "@mui/icons-material/Assignment";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import FolderIcon from "@mui/icons-material/Folder";

import NumberCards from "../components/CardsNumbers";
import { Task } from "@mui/icons-material";

export default function DashboardNumberCard() {
  const { tasks } = useContext(TaskContext);
  console.log("tasks from dashboard number card", tasks.length);
  const completedTasks = tasks.filter((task) => task.status === "Done").length;
  console.log(completedTasks)
  const DoingTasks = tasks.filter((task) => task.status === "Doing").length;
  const TodoTasks = tasks.filter((task) => task.status === "Todo").length;

  // const user = JSON.parse(localStorage.getItem("data"));
  // const UserName = user.data.userName;

  return (
    <div className=" w-258 h-50">
      <h1 className="ml-8 mt-8 text-3xl font-bold">Welcome back, {""}!</h1>
      <p className="ml-8">Manage your tasks efficiently</p>
      <div className="flex">
        <NumberCards
          status="Total Tasks"
          numbers={tasks?.length}
          icon={<AssignmentIcon sx={{ color: "blue" }} />}
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
