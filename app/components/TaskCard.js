"use client";
import { useState, useContext, useEffect } from "react";
import { TaskContext } from "./tasksApi";
import { projectContext } from "./projectsApi";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import CircleIcon from "@mui/icons-material/Circle";

export default function TasksCard({ task, projectId }) {
  const { tasks, setTasks } = useContext(TaskContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event, _id) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
    setSelectedId(_id);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // update task status
  async function HandelUpdateStatus(projectId, taskId) {
    const res = await fetch(
      `https://demo-rrxv.onrender.com/projects/${projectId}/tasks/${taskId}/status`,
      { method: "PATCH" },
    );
    const data = (await res.json()) || [];
    if (!data) {
      return <p>loading...</p>;
    }
    setTasks((prevTasks) => {
      return prevTasks.map((task) => {
        if (task._id === taskId) {
          return { ...task, status: data?.status };
        }
        return task;
      });
    });
  }

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

  return (
    <div
      className="flex justify-between items-center shadow-lg hover:bg-gray-100 transition-all p-4 bg-white ml-1 mr-1 rounded mt-1"
      key={task._id}
    >
      {/* Title & date */}
      <div className="flex flex-col">
        <div>
          <button
            className="pr-2"
            onClick={() => HandelUpdateStatus(project._id, task._id)}
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
        <MenuItem onClick={handleClose}>Edit</MenuItem>
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
}
