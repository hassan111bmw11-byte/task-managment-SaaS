"use client";
import { useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import CircleIcon from "@mui/icons-material/Circle";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function TaskItem({
  task,
  isDone,
  iconColor,
  onStatusChange,
  onDelete,
  onEdit,
}) {
  if (!task || !task._id) return null; // 🔥 حماية

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const { attributes, listeners, setNodeRef, transform } =
    useDraggable({
      id: task._id,
    });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
  };

  const handleClick = (e) => {
    e.preventDefault();
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="flex justify-between items-center p-4 shadow bg-white rounded mt-2 cursor-grab"
    >
      <div className="flex flex-col">
        <div>
          <button onClick={() => onStatusChange(task._id)} className="pr-2">
            {isDone ? (
              <CheckCircleIcon sx={{ color: iconColor }} />
            ) : (
              <CircleIcon sx={{ color: iconColor }} />
            )}
          </button>

          <span className="font-bold">{task.title}</span>
        </div>

        <span className="text-gray-600 text-sm ml-8">
          {new Date(task.createdAt).toLocaleDateString("en-US")}
        </span>
      </div>

      <MoreHorizIcon onClick={handleClick} className="cursor-pointer" />

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem
          onClick={() => {
            onEdit(task._id);
            handleClose();
          }}
        >
          Edit
        </MenuItem>

        <MenuItem
          onClick={() => {
            onDelete(task._id);
            handleClose();
          }}
        >
          Delete
        </MenuItem>

        <MenuItem onClick={handleClose}>Cancel</MenuItem>
      </Menu>
    </div>
  );
}