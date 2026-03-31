"use client";
import { PieChart } from "@mui/x-charts/PieChart";
import { useContext, useEffect, useState } from "react";
import { TaskContext } from "./tasksApi";
import { ProjectContext } from "./projectsApi";
import PieChartIcon from "@mui/icons-material/PieChart";
import CircleIcon from "@mui/icons-material/Circle";

export default function DonutChart() {
  const { projects = [] } = useContext(ProjectContext) ?? []; // ضمان قيمة افتراضية
  const { tasks = [] } = useContext(TaskContext);       // ضمان قيمة افتراضية
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedData = localStorage.getItem("data");
    if (storedData) {
      const parsed = JSON.parse(storedData);
      // تأكد من تخزين الـ ID فقط أو الكائن كاملاً حسب حاجتك
      setUserId(parsed?.data?._id || parsed?._id); 
    }
  }, []);

  // تصفية المشاريع والمهام بأمان
  const curentProjects =  (projects && Array.isArray(projects)) 
  ? projects?.filter((p) => p.owner === userId) : " fffffff";
  const currentProjectIds =   (curentProjects && Array.isArray(curentProjects)) 
  ?  curentProjects.map(p => p._id) : "ewwwwew";

  const totalTasks = tasks?.filter((task) => currentProjectIds.includes(task.project));
  
  // حساب الحالات بناءً على المهام المفلترة (أو كل المهام حسب رغبتك)
  const doneTasks = totalTasks?.filter((t) => t.status === "Done").length;
  const todoTasks = totalTasks?.filter((t) => t.status === "Todo").length;
  const doingTasks = totalTasks?.filter((t) => t.status === "Doing").length;

  const chartData = [
    { id: 0, value: doneTasks, label: "Done", color: "green" },
    { id: 1, value: doingTasks, label: "Doing", color: "blue" },
    { id: 2, value: todoTasks, label: "Todo", color: "orange" },
  ];

  if (!userId) return <div className="p-4">Loading User Data...</div>;

  return (
    <div className="rounded-2xl bg-white w-fit p-4 h-80 ml-4">
      <h1 className="font-bold">
        <PieChartIcon sx={{ color: "blueviolet" }} /> Task Statistics
      </h1>
      <PieChart
        series={[
          {
            data: chartData, // تأكد أنها data وليست dat
            innerRadius: 50,
            outerRadius: 100,
            paddingAngle: 2,
          }
        ]}
        width={200}
        height={200}
        slotProps={{ legend: { hidden: true } }}
      />
      <div className="flex justify-center gap-4 mt-2 text-sm">
        <span><CircleIcon sx={{ color: "orange", fontSize: 12 }} /> Todo</span>
        <span><CircleIcon sx={{ color: "blue", fontSize: 12 }} /> Doing</span>
        <span><CircleIcon sx={{ color: "green", fontSize: 12 }} /> Done</span>
      </div>
    </div>
  );
}
