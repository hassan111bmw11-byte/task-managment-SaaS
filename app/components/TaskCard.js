"use client";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import CircleIcon from "@mui/icons-material/Circle";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useState } from "react";

export default function TaskColumn({
  title,
  tasks,
  borderColor,
  iconColor,
  isDone,
  onStatusChange,
  onDelete,
  onEdit,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event, id) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
    setSelectedId(id);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="mt-4 h-[90vh] overflow-hidden">
      <h1 className="font-bold text-2xl">
        {title}
        <span className="rounded ml-2 px-2 bg-gray-200 text-sm">
          {tasks?.length}
        </span>
      </h1>

      <hr className={`mt-4 w-[90%] border ${borderColor}`} />

      <div className="w-[90%]  mt-4 h-1/3 no-scrollbar overflow-auto shadow">
        {tasks?.map((task) => (
          <div
            key={task._id}
            className="flex justify-between items-center p-4 shadow-lg bg-white rounded mt-1 hover:bg-gray-300 transition"
          >
            {/* title + date */}
            <div className="flex flex-col">
              <div>
                <button
                  className="pr-2"
                  onClick={() => onStatusChange(task._id)}
                >
                  {isDone ? (
                    <CheckCircleIcon sx={{ color: iconColor }} />
                  ) : (
                    <CircleIcon sx={{ color: iconColor }} />
                  )}
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

            {/* menu */}
            <MoreHorizIcon
              onClick={(e) => handleClick(e, task._id)}
              className="cursor-pointer"
            />

            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              <MenuItem
                onClick={() => {
                  onEdit(selectedId);
                  handleClose();
                }}
              >
                Edit
              </MenuItem>

              <MenuItem
                onClick={() => {
                  onDelete(selectedId);
                  handleClose();
                }}
              >
                Delete
              </MenuItem>

              <MenuItem onClick={handleClose}>Cancel</MenuItem>
            </Menu>
          </div>
        ))}
      </div>
    </div>
  );
}