"use client";

import ProgressLine from "../components/progress";
import TaskStatisticspie from "./TaskStatistics";
import { useContext } from "react";
import { ProjectContext } from "./projectsApi";
import { TaskContext } from "./tasksApi";

export default function ProjectProgress() {
  const { projects } = useContext(ProjectContext);
  const { tasks } = useContext(TaskContext);
  // استخدم الـ Optional Chaining للحماية من الـ undefined
  const projectTasks =
    tasks?.filter((task) => task.project === projects?.[0]?._id) || [];
  const completedTasks = projectTasks.filter((task) => task.status === "Done");

  const projectTasks2 =
    tasks?.filter((task) => task.project === projects?.[1]?._id) || [];
  // تنبيه: هنا كان لديك خطأ، كنت تستخدم projectTasks بدلاً من projectTasks2
  const completedTasks2 = projectTasks2.filter(
    (task) => task.status === "Done",
  );

  const projectTasks3 = projects?.[2]
    ? tasks?.filter((task) => task.project === projects[2]._id)
    : [];
  const completedTasks3 = projectTasks3.filter(
    (task) => task.status === "Done",
  );

  return (
    <div className="flex w-246 justify-between  mt-4">
      <div className=" bg-white text-black border-white/20 w-170 rounded-2xl">
        <p className="p-4 text-2xl">Project Overview</p>
        <div className="">
          <ProgressLine
      
            title={projects[0]?.title}
            max={projectTasks.length}
            value={completedTasks.length}
            color="bg-orange-700"
          />
          <ProgressLine
            title={projects[1]?.title}
            max={projectTasks2.length}
            value={completedTasks2.length}
            color="bg-green-700"
          />
          <ProgressLine
            title={projects[2]?.title}
            max={projectTasks3.length}
            value={completedTasks3.length}
            color="bg-blue-700"
          />
        </div>
      </div>
      <div>
        <TaskStatisticspie />
      </div>
    </div>
  );
}
