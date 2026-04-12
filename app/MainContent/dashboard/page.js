export const dynamic = "force-dynamic";

import ProjectProgress from "../../components/projectProgress";
import DashboardCards from "../../components/DashboardCards";
import { ProjectProvider } from "../../components/projectsApi";
import { TaskProvider } from "../../components/tasksApi";

export default function Dashboard() {
  return (
    <TaskProvider>
      <ProjectProvider>
        <div className="flex flex-col bg-linear-to-r  from-blue-900 via-blue-500 to-blue-900 text-amber-50 justfy-center items-center h-screen overflow-auto w-screen">
          <div className="bg-white/30 py-3 mt-8 rounded-2xl px-10 h-4xl">
                <DashboardCards />
               <ProjectProgress />
          </div>
        </div>
      </ProjectProvider>
    </TaskProvider>
  );
}
