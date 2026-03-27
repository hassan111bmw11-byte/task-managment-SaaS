"use client";
import { useEffect, useState, use } from "react";

// mui Icons
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CircleIcon from "@mui/icons-material/Circle";

export default function Page({ params }) {
  // option menu
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event, _id) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
    setSelectedId(_id);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // ==option menu==

  const { projectId } = use(params);
  // states

  const [inputValue, setInputValue] = useState("");
  const [updateInputValue, setUpdateInputValue] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [project, setProject] = useState([]);

  // show btn
  const [showupdateBtn, setShowupdateBtn] = useState("hidden");
  const [showAddBtn, setShowAddBtn] = useState("");

  useEffect(() => {
    const getprojects = async () => {
      const response = await fetch(
        `https://demo-rrxv.onrender.com/projects/${projectId}/tasks`,
      );
      const result = await response.json();
      console.log("00000--------", result);
      setTasks(result);
    };
    getprojects();
  }, [projectId]);

  // add a new task
  const addTask = async () => {
    const res = await fetch(
      `https://demo-rrxv.onrender.com/createTasks/${projectId}/tasks`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: inputValue }),
      },
    );

    const data = await res.json();
    console.log("task added", data.newTask);
    // setTasks(Array.isArray(data.tasks) ? data.tasks : []);
    setTasks([...tasks, { ...data.newTask }]);
    setInputValue("");
  };
  // update task status
  async function HandelUpdateStatus(projectId, taskId) {
    const res = await fetch(
      `https://demo-rrxv.onrender.com/projects/${projectId}/tasks/${taskId}/status`,
      { method: "PATCH" },
    );
    const data = await res.json();
    setTasks((prevTasks) => {
      return prevTasks.map((task) => {
        if (task._id === taskId) {
          return { ...task, status: data.status };
        }
        return task;
      });
    });
  }
  // filter tasks
  // todo tasks
  const TodosTasks = tasks.filter((task) => task.status === "Todo");

  // ===todo tasks

  // doing tasks
  const DoingTasks = tasks.filter((task) => task.status === "Doing");

  // ===doing tasks===
  // done tasks
  const DoneTasks = tasks.filter((task) => task.status === "Done");

  // ===done tasks===

  // ====filter tasks====

  // delete tasks
  function HandelDeleteTask(id) {
    fetch(`https://demo-rrxv.onrender.com/projects/${projectId}/tasks/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        setTasks((prev) => prev.filter((task) => task._id !== id));
      });

    handleClose();
  }
  // update tasks title
  function handleEditTask(id) {
    setSelectedId(id);

    const task = tasks.find((task) => task._id === id);
    setUpdateInputValue(task.title);
    setShowAddBtn("hidden");
    setShowupdateBtn("");
  }

  async function HandelUpdateTask(id) {
    setSelectedId(id);
    const response = await fetch(
      `https://demo-rrxv.onrender.com/projects/${projectId}/tasks/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: updateInputValue }),
      },
    );
    const data = await response.json();
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
  return (
    <div className="bg-zinc-200 p-10  w-screen h-screen flex justify-center">
      <div className="bg-white p-4 rounded-lg h-145  w-5xl shadow-2xl ">
        {/* project title and date and add button container */}
        <div className="flex justify-between items-center ">
          {/* project title and date  */}
          <div>
            <h1 className="font-bold text-4xl text-shadow-mauve-800 ">
              {project?.title}
            </h1>
            <h4 className="text-gray-600 mt-4 ">
              {tasks.length} tasks . Created at {/* project date */}
              <span className="text-gray-600">
                {new Date(project.createdAt).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
              {/* ===project date=== */}
            </h4>
          </div>
          {/* ===project title and date=== */}
          {/* add task button & input*/}
          <div className={`${showAddBtn} flex gap-4`}>
            {/* add task input */}
            <input
              value={inputValue}
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
              value={updateInputValue}
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
        {/* ===project title and date and add button container=== */}
        <hr className=" border-zinc-300 mt-4" />
        {/*  todo & in progres & done Tasks grid conteainer  */}
        <div className="grid grid-cols-3 justify-center items-center ">
          {/* tasks todo */}

          <div className=" mt-4">
            <h1 className="font-bold text-2xl ">
              Todo
              <span className="rounded ml-2 pl-2 pr-2 text-center bg-gray-200 text-sm">
                {TodosTasks.length}
              </span>
            </h1>
            <hr className=" mt-4 w-80 border border-yellow-500"></hr>
            <div className="w-80 no-scrollbar rounded bg-zinc-200 h-90 mt-4 overflow-auto shadow">
              {TodosTasks.map((task) => {
                return (
                  <div
                    className="flex justify-between items-center p-4 shadow-lg hover:bg-gray-100 transition-all bg-white ml-1 mr-1 rounded mt-1"
                    key={task._id}
                  >
                    {/* Title & date */}
                    <div className="flex flex-col">
                      <div>
                        <button
                          className="pr-2"
                          onClick={() =>
                            HandelUpdateStatus(project._id, task._id)
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

          <div className=" mt-4">
            <h1 className="font-bold text-2xl ">
              Doing
              <span className="rounded ml-2 pl-2 pr-2 text-center bg-gray-200 text-sm">
                {DoingTasks.length}
              </span>
            </h1>
            <hr className=" mt-4 w-80 border border-blue-800"></hr>
            <div className="w-80 no-scrollbar rounded bg-zinc-200 h-90 mt-4 overflow-auto shadow">
              {DoingTasks.map((task) => {
                return (
                  <div
                    className="flex justify-between items-center p-4 shadow-lg hover:bg-gray-100 transition-all bg-white ml-1 mr-1 rounded mt-1"
                    key={task._id}
                  >
                    {/* Title & date */}
                    <div className="flex flex-col">
                      <div>
                        <button
                          className="pr-2"
                          onClick={() =>
                            HandelUpdateStatus(project._id, task._id)
                          }
                        >
                          <CircleIcon sx={{ color: "#0024c8" }} />
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

          {/* ===tasks Doing===

          {/* tasks Done */}

          <div className=" mt-4">
            <h1 className="font-bold text-2xl ">
              Done
              <span className="rounded ml-2 pl-2 pr-2 text-center bg-gray-200 text-sm">
                {DoneTasks.length}
              </span>
            </h1>
            <hr className="mt-4 w-80 border border-green-700"></hr>
            <div className="w-80 no-scrollbar rounded bg-zinc-200  h-90 mt-4 overflow-auto shadow">
              {DoneTasks.map((task) => {
                return (
                  <div
                    className="flex justify-between items-center p-4 hover:bg-gray-100 transition-all shadow-lg bg-white mr-1 ml-1 rounded mt-1"
                    key={task._id}
                  >
                    {/* Title & date */}
                    <div className="flex flex-col">
                      <div>
                        <button
                          className="pr-2"
                          onClick={() =>
                            HandelUpdateStatus(project._id, task._id)
                          }
                        >
                          <CheckCircleIcon sx={{ color: "#009f14" }} />
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
