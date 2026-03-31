export const dynamic = "force-dynamic";

import ProjectProgress from "../../components/projectProgress";
import DashboardCards from "../../components/DashboardCards";
import { ProjectProvider } from "../../components/projectsApi";
import { TaskProvider } from "../../components/tasksApi";
export default function Dashboard() {
  return (
    <TaskProvider>
      <ProjectProvider>
        <div className="bg-zinc-200 h-160 overflow-auto w-7xl">
          <DashboardCards />
          <ProjectProgress />
          <div className="flex ml-8 gap-4 mr-8"></div>
        </div>
      </ProjectProvider>
    </TaskProvider>
  );
}
