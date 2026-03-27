// import DashboardIcon from "@mui/icons-material/Dashboard";
import ViewKanbanIcon from "@mui/icons-material/ViewKanban";
import ListAltIcon from "@mui/icons-material/ListAlt";
export default function HomeFeatures() {
  return (
    <div id="Features" className="bg-white w-screen h-100">
      <h1 className="font-bold text-2xl text-gray-800 text-center mt-20">
        Key Features
      </h1>
      {/* cards */}
      <div className="flex gap-4 justify-center mt-10">
        <div className="w-1/4 bg-zinc-300 hover:bg-zinc-400 h-45 p-5 flex gap-4 flex-col justify-center items-center rounded-2xl">
          <div>
            <div className="flex items-center gap-4">
              <div className="bg-blue-600 p-4 w-fit h-14 rounded-2xl">
                {/* <DashboardIcon className="text-5xl text-white mb-5" /> */}
              </div>
              <span className="font-bold text-2xl w-30 text-zinc-800">
                Dashboard Overview
              </span>
            </div>
            <p className="text-zinc-700 mt-4">
              Get a quick overview of your tasks and progress.
            </p>
          </div>
        </div>
        <div className="w-1/4 bg-zinc-300  h-45 p-5 hover:bg-zinc-400 rounded-2xl ">
          {" "}
          <div>
            <div className="flex items-center gap-4">
              <div className="bg-purple-600 p-4 w-fit h-14 rounded-2xl">
                <ViewKanbanIcon className="text-5xl text-white mb-5" />
              </div>
              <span className="font-bold text-2xl w-30 text-zinc-800">
                Kanban Boards
              </span>
            </div>
            <p className="text-zinc-700 mt-4">
              Organize your tasks and move them through different stages.
            </p>
          </div>
        </div>
        <div className="w-1/4 bg-zinc-300 h-45 p-5 rounded-lg ">
          {" "}
          <div>
            <div className="flex items-center gap-4">
              <div className="bg-orange-400 p-4 w-fit h-14 rounded-2xl">
                <ListAltIcon className="text-5xl text-white mb-5" />
              </div>
              <span className="font-bold text-2xl w-30 text-zinc-800">
                Easy Task Management
              </span>
            </div>
            <p className="text-zinc-700 mt-4">
              Create, organize, and complete your tasks with ease.
            </p>
          </div>
        </div>
      </div>
      {/* ===cards=== */}
    </div>
  );
}
