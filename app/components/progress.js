" use client";
import { ProjectContext } from "./projectsApi";
import { useContext } from "react";
import { TaskContext } from "./tasksApi";
export default function ProgressLine({
  title,
  value = 0,
  max = 0,
  color = "bg-blue-700",
}) {
  // contexts
  const { projects } = useContext(ProjectContext);
  const { tasks } = useContext(TaskContext);

  const totalTasks = projects[0]?.tasks?.length;
  const projectId = projects[0]?._id;
  const completedTasks =
    tasks?.filter((task) => task.project === projectId).length || [];
  const percentage = Math.min((value / max) * 100, 100) || 0;
  return (
    <>
      <div className="w-160 pl-4 mt-4 pr-4 pt-2 h-16 ml-8 bg-zinc-300 rounded shadow-lg ">
        {/* Header */}
        <div className="flex mb-2  justify-between  items-center">
          <h3 className="text-lg font-semibold text-gray-700">{title || "add new project"}</h3>
          <span className="text-sm font-medium text-gray-500">
            <p>
              {value}/{max} Tasks
            </p>
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-150 h-3 bg-gray-300 rounded-full overflow-hidden">
          <div
            className={`h-full  ${color}  transition-all  duration-700 ease-in-out`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </>
  );
}
