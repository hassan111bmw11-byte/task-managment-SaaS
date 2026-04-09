"use client";
import { useState, use, useContext } from "react";
import { useRouter } from "next/navigation";
import { TaskContext } from "@/app/components/tasksApi";
// mui Icons
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CircleIcon from "@mui/icons-material/Circle";
import { ProjectContext } from "@/app/components/projectsApi";
import NumberCards from "@/app/components/CardsNumbers";
import AssignmentIcon from "@mui/icons-material/Assignment";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import FolderIcon from "@mui/icons-material/Folder";


export default function Page({ params }) {
  const router = useRouter();

  // option menu
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event, _id) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
    setSelectedId(_id);
  };

  const handleClose = () => {
    setAnchorEl(false);
  };
  // ==option menu==

  const { projectId } = use(params);
  // states

  const [inputValue, setInputValue] = useState("");
  const [updateInputValue, setUpdateInputValue] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const { tasks, setTasks } = useContext(TaskContext);

  const { projects, token } = useContext(ProjectContext);
  const projectTasks = tasks.filter((task) => task.project === projectId);

  // show btn
  const [showupdateBtn, setShowupdateBtn] = useState("hidden");
  const [showAddBtn, setShowAddBtn] = useState("");

  // add a new task
  const addTask = async () => {
    if (!inputValue.trim()) return; // منع إضافة مهام فارغة

    const res = await fetch(
      `https://demo-rrxv.onrender.com/createTasks/${projectId}/tasks`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: inputValue }),
      },
    );

    if (res.ok) {
      const data = await res.json();
      // تأكد من هيكلة البيانات القادمة من السيرفر (data.newTask أو data مباشرة)
      const newTask = data?.newTask || data;
      setTasks((prev) => [...prev, newTask]);
      setInputValue("");
    }
  };
  // update task status
  async function HandelUpdateStatus(projectId, taskId) {
    const res = await fetch(
      `https://demo-rrxv.onrender.com/projects/${projectId}/tasks/${taskId}/status`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const data = (await res?.json()) || [];
    setTasks((prevTasks) => {
      return prevTasks?.map((task) => {
        if (task?._id === taskId) {
          return { ...task, status: data?.status };
        }
        return task;
      });
    });
  }
  // filter tasks
  const TodosTasks = projectTasks.filter((task) => task.status === "Todo");
  const DoingTasks = projectTasks.filter((task) => task.status === "Doing");
  const DoneTasks = projectTasks.filter((task) => task.status === "Done");
// this task numbers
  const tasksNumber = tasks.filter((task) => task.project === projectId);
  const tododTasksNumbers = tasksNumber.filter((task) => task.status === "Todo");
  const doingTasksNumbers = tasksNumber.filter(
    (task) => task.status === "Doing"
  )
  const doneTasksNumbers = tasksNumber.filter(
    (task) => task.status === "Done"
  )
  // ====filter tasks====

  // delete tasks
  function HandelDeleteTask(id) {
    fetch(`https://demo-rrxv.onrender.com/projects/${projectId}/tasks/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          // تحديث الحالة المحلية لحذف العنصر من الشاشة فوراً
          setTasks((prev) => prev.filter((task) => task._id !== id));
        }
      })
      .catch((err) => console.log("Error deleting task:", err))
      .finally(() => {
        handleClose(); // إغلاق القائمة بعد الانتهاء
      });
  }

  async function HandelUpdateTask(id) {
    setSelectedId(id);
    const response = await fetch(
      `https://demo-rrxv.onrender.com/projects/${projectId}/tasks/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: updateInputValue }),
      },
    );
    const data = (await response?.json()) || [];
    console.log("update done", data);

    setTasks((prev) =>
      prev.map((task) =>
        task._id === id ? { ...task, title: updateInputValue } : task,
      ),
    );

    setShowAddBtn("");
    setShowupdateBtn("hidden");
    setUpdateInputValue("");
  }
  const currentProject = projects.filter((p) => p._id === projectId);
  console.log("projects>>>>>>>>>", currentProject);
  return (
    <div className="bg-linear-to-r from-blue-900 via-blue-500 to-blue-900 p-10  w-screen h-screen flex justify-center">
      <div className="bg-white p-4 rounded-lg h-screen w-5xl shadow-2xl ">
        {/* project title and date and add button container */}
        <div className="flex justify-between items-center ">
          {/* project title and date  */}
          <div>
            <h1 className="font-bold text-4xl w-60 text-shadow-mauve-800 ">
              {currentProject?.[0]?.title}
            </h1>
            <h4 className="text-gray-600 mt-4 ">
              {currentProject?.[0]?.tasks?.length} tasks . Created at{" "}
              <span className="text-gray-600">
                {new Date(currentProject?.[0]?.createdAt).toLocaleDateString(
                  "en-US",
                  {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  },
                )}
              </span>
              {/* ===project date=== */}
            </h4>
          </div>
          {/* ===project title and date=== */}
          {/* add task button & input*/}
          <div className={`${showAddBtn} flex gap-4`}>
            {/* add task input */}
            <input
              value={inputValue || ""}
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
              placeholder="Add New Task "
              className={` border transition duration-300 ease-in-out focus:border-2 focus:border-blue-500 focus:outline-none focus:shadow-lg shadow-md border-blue-700 pl-2 h-10 rounded-lg w-140`}
            />
            {/* === add task input=== */}

            {/* add task button */}
            <button
              onClick={addTask}
              className={`bg-blue-600 addBtn shadow-md w-32 text-center h-10 text-amber-50 flex justify-center items-center rounded-lg`}
            >
              + Add
            </button>
          </div>
          {/* ===add task button=== */}
          <div className={`${showupdateBtn} flex gap-4`}>
            {/* update task input */}
            <input
              value={updateInputValue || ""}
              onChange={(e) => {
                setUpdateInputValue(e.target.value);
              }}
              placeholder="Update Task"
              className={` border transition duration-300 ease-in-out focus:border-2 focus:border-blue-500 focus:outline-none focus:shadow-lg shadow-md border-blue-700 pl-2 h-10 rounded-lg w-140`}
            />
            {/* === update task input=== */}

            {/* update button */}
            <button
              onClick={() => {
                HandelUpdateTask(selectedId);
              }}
              className={` bg-blue-600 addBtn shadow-md w-32 text-center h-10 text-amber-50 flex justify-center items-center rounded-lg`}
            >
              Update
            </button>
            {/* ====update button==== */}
          </div>
          
        </div>
        {/* dashboards cards */}
        <div className="flex justify-betwee items-center mt-4">
         <NumberCards
          status="Total Tasks"
          numbers={tasksNumber?.length}
          icon={<AssignmentIcon sx={{ color: "purple" }} />}
        />  <NumberCards
          status="Completed"
          numbers={doneTasksNumbers?.length}
          icon={<HourglassTopIcon sx={{ color: "green" }} />}
        />
        <NumberCards
          status="In Progress"
          numbers={doingTasksNumbers?.length}
          icon={<CheckCircleIcon sx={{ color: "blue" }} />}
        />
        <NumberCards
          status="Todo"
          numbers={tododTasksNumbers?.length}
          icon={<FolderIcon sx={{ color: "orange" }} />}
        />
        
        </div>  

        {/* ===dashboards cards=== */}
        {/* ===project title and date and add button container=== */}
        <hr className=" border-zinc-300 mt-4" />
        {/*  todo & in progres & done Tasks grid conteainer  */}
        <div className="grid grid-cols-3 justify-center overflow-auto items-center ">
          {/* tasks todo */}

          <div className=" mt-4">
            <h1 className="font-bold text-2xl ">
              Todo
              <span className="rounded ml-2 pl-2 pr-2 text-center bg-gray-200 text-sm">
                {/* {TodosTasks?.length} */}
              </span>
            </h1>
            <hr className=" mt-4 w-80 border border-yellow-500"></hr>
            <div className="w-80 no-scrollbar rounded transition-all duration-500 ease-in-out bg-zinc-200  h-screen mt-4 overflow-auto shadow border border-zinc-400">
              {TodosTasks?.map((task) => {
                return (
                  <div
                    className="flex justify-between items-center p-4 shadow-lg hover:bg-gray-100 transition-all bg-white ml-1 mr-1 rounded mt-1"
                    key={task?._id}
                  >
                    {/* Title & date */}
                    <div className="flex flex-col">
                      <div>
                        <button
                          className="pr-2"
                          onClick={() =>
                            HandelUpdateStatus(projectId, task._id)
                          }
                        >
                          <CircleIcon sx={{ color: "#ffea00" }} />
                        </button>
                        <span className="font-bold">{task.title}</span>
                      </div>
                      <span className="text-gray-600 text-sm ml-8">
                        {new Date(task.createdAt).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    {/* task option button */}

                    <MoreHorizIcon
                      id="basic-button"
                      aria-controls={open ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      onClick={(event) => {
                        handleClick(event, task._id);
                      }}
                      className="optionBtn w-6 rounded-4xl h-fit flex justify-between items-center"
                    />

                    {/* ====task option button==== */}

                    {/* popover Delete & Edit menu*/}
                    <Menu
                      id="demo-positioned-menu"
                      aria-labelledby="demo-positioned-button"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "left",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "left",
                      }}
                      disableRestoreFocus
                    >
                      <MenuItem
                        sx={{
                          color: "primary.main",
                          fontWeight: "bold",
                        }}
                        onClick={() => handleEditTask(selectedId)}
                      >
                        Edit
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          HandelDeleteTask(selectedId);
                        }}
                      >
                        Delete
                      </MenuItem>
                      <MenuItem onClick={handleClose}>Cancel</MenuItem>
                    </Menu>

                    {/* popover Delete & Edit menu*/}
                  </div>
                );
              })}
            </div>
          </div>

          {/* ===tasks todo=== */}

          {/* tasks Doing */}

          <div className="mt-4">
            <h1 className="font-bold text-2xl ">
              Doing
              <span className="rounded ml-2 pl-2 pr-2 text-center bg-gray-200  text-sm">
                {DoingTasks?.length}
              </span>
            </h1>
            <hr className=" mt-4 w-80 border border-blue-800"></hr>
            <div className="w-80 no-scrollbar transition-all duration-500 ease-in-out rounded bg-zinc-200 h-screen mt-4 overflow-auto shadow border border-zinc-400">
              {DoingTasks?.map((task) => {
                return (
                  <div
                    className="flex justify-between items-center p-4 shadow-lg hover:bg-gray-100 transition-all bg-white ml-1 mr-1 rounded mt-1"
                    key={task?._id}
                  >
                    {/* Title & date */}
                    <div className="flex flex-col">
                      <div>
                        <button
                          className="pr-2"
                          onClick={() =>
                            HandelUpdateStatus(projectId, task._id)
                          }
                        >
                          <CircleIcon sx={{ color: "#0024c8" }} />
                        </button>
                        <span className="font-bold">{task?.title}</span>
                      </div>
                      <span className="text-gray-600 text-sm ml-8">
                        {new Date(task?.createdAt).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    {/* task option button */}

                    <MoreHorizIcon
                      id="basic-button"
                      aria-controls={open ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      onClick={(event) => {
                        handleClick(event, task?._id);
                      }}
                      className="optionBtn w-6 rounded-4xl h-fit flex justify-between items-center"
                    />

                    {/* ====task option button==== */}

                    {/* popover Delete & Edit menu*/}
                    <Menu
                      id="demo-positioned-menu"
                      aria-labelledby="demo-positioned-button"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "left",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "left",
                      }}
                      disableRestoreFocus
                    >
                      <MenuItem
                        sx={{
                          color: "primary.main",
                          fontWeight: "bold",
                        }}
                        onClick={() => handleEditTask(selectedId)}
                      >
                        Edit
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          HandelDeleteTask(selectedId);
                        }}
                      >
                        Delete
                      </MenuItem>
                      <MenuItem onClick={handleClose}>Cancel</MenuItem>
                    </Menu>

                    {/* popover Delete & Edit menu*/}
                  </div>
                );
              })}
            </div>
          </div>

          {/* ===tasks Doing===

          {/* tasks Done */}

          <div className=" mt-4">
            <h1 className="font-bold text-2xl ">
              Done
              <span className="rounded ml-2 pl-2 pr-2 text-center bg-gray-200 text-sm">
                {DoneTasks?.length}
              </span>
            </h1>
            <hr className="mt-4 w-80 border border-green-700"></hr>
            <div className="w-80 no-scrollbar rounded transition-all duration-500 ease-in-out bg-zinc-200  h-screen mt-4 overflow-auto shadow border border-zinc-400">
              {DoneTasks.map((task) => {
                return (
                  <div
                    className="flex justify-between items-center p-4 hover:bg-gray-100 transition-all duration-500 ease-in-out shadow-lg bg-white mr-1 ml-1 rounded mt-1"
                    key={task?._id}
                  >
                    {/* Title & date */}
                    <div className="flex transition-all duration-500 ease-in-out flex-col">
                      <div>
                        <button
                          className="pr-2"
                          onClick={() =>
                            HandelUpdateStatus(projectId, task?._id)
                          }
                        >
                          <CheckCircleIcon sx={{ color: "#009f14" }} />
                        </button>
                        <span className="font-bold">{task?.title}</span>
                      </div>

                      <span className="text-gray-600 text-sm ml-8">
                        {new Date(task?.createdAt).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    {/* task option button */}

                    <MoreHorizIcon
                      id="basic-button"
                      aria-controls={open ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      onClick={(event) => {
                        handleClick(event, task._id);
                      }}
                      className="optionBtn w-6 rounded-4xl h-fit flex justify-between items-center"
                    />

                    {/* ====task option button==== */}

                    {/* popover Delete & Edit menu*/}
                    <Menu
                      id="demo-positioned-menu"
                      aria-labelledby="demo-positioned-button"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "left",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "left",
                      }}
                      disableRestoreFocus
                    >
                      <MenuItem
                        onClick={() => handleEditTask(selectedId)}
                        sx={{
                          color: "primary.main",
                          fontWeight: "bold",
                        }}
                      >
                        Edit
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          HandelDeleteTask(selectedId);
                        }}
                        sx={{
                          color: "error.main",
                          fontWeight: "bold",
                        }}
                      >
                        Delete
                      </MenuItem>
                      <MenuItem
                        onClick={handleClose}
                        sx={{ fontWeight: "bold" }}
                      >
                        Cancel
                      </MenuItem>
                    </Menu>

                    {/* popover Delete & Edit menu*/}
                  </div>
                );
              })}
            </div>
          </div>

          {/* ===tasks Done=== */}
        </div>
        {/* =====todo & in progres & done Tasks grid conteainer=====  */}
      </div>
    </div>
  );
}
