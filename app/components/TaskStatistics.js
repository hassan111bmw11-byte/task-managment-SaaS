import { PieChart } from "@mui/x-charts/PieChart";
import { useContext, useEffect, useState } from "react";
import { TaskContext } from "./tasksApi";
import { ProjectContext } from "./projectsApi";
import PieChartIcon from "@mui/icons-material/PieChart";
import CircleIcon from "@mui/icons-material/Circle";

export default function DonutChart() {
  const { projects } = useContext(ProjectContext);
  const { tasks } = useContext(TaskContext);

  const [users, setUsers] = useState(null);

  useEffect(() => {
    // هذا الكود سيعمل فقط في المتصفح
    const user = JSON.parse(localStorage.getItem("data")) ?? " ";
    setUsers(user);
  }, []);

  const userId = users.data._id;
  const curentProject = projects.filter((project) => project.owner === userId);
  console.log("curentProject", curentProject);
  console.log("all tasks: ", tasks);
  const totalTasks = tasks.filter((task) => {
    if (task.project === curentProject) return task;
  });
  console.log("total task: ", totalTasks);
  const doneTasks = tasks.filter((task) => task.status === "Done").length;
  const todoTasks = tasks.filter((task) => task.status === "Todo").length;
  const DoingTasks = tasks.filter((task) => task.status === "Doing").length;

  const data = [
    { label: "Done", value: doneTasks, color: "green" },
    { label: "Doing", value: DoingTasks, color: "blue" },
    { label: "Todo", value: todoTasks, color: "orange" },
  ];

  const settings = {
    width: 200,
    height: 200,
    hideLegend: true,
    label: "",
  };

  return (
    <div className="rounded-2xl bg-white w-fit  p-4 h-80 ml-4">
      <h1 className="font-bold">
        {" "}
        <PieChartIcon sx={{ color: "blueviolet" }} /> Task Statistics
      </h1>
      <PieChart
        className="m-4 text-white"
        series={[
          { innerRadius: 50, outerRadius: 100, data, arcLabel: "label" },
        ]}
        sx={{
          "& .MuiPieArcLabel-root": {
            fill: "white",
            fontSize: 16,
            fontWeight: "bold",
          },
        }}
        {...settings}
      />
      <div className="flex justify-center gap-4">
        {" "}
        <span>
          <CircleIcon sx={{ color: "orange" }} /> Todo
        </span>
        <span>
          <CircleIcon sx={{ color: "blue" }} /> Doing
        </span>
        <span>
          <CircleIcon sx={{ color: "green" }} /> Done
        </span>
      </div>
    </div>
  );
}
