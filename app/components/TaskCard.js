"use client";
import TaskItem from "./TaskItem";
import { useDroppable } from "@dnd-kit/core";

export default function TaskColumn({
  title,
  tasks,
  borderColor,
  iconColor,
  isDone,
  onStatusChange,
  onDelete,
  onEdit,
  id,
}) {
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
<div ref={setNodeRef} className=" min-h-[80vh]">
        <h1 className="font-bold text-2xl">
        {title}
        <span className="ml-2 px-2 bg-gray-200 text-sm rounded">
          {tasks?.length}
        </span>
      </h1>

      <hr className={`mt-4 w-[90%] border ${borderColor}`} />

      <div className="w-[90%] mt-4 space-y-2">
        {tasks?.filter(Boolean).map((task) => (
          <TaskItem
            key={task._id}
            task={task}
            isDone={isDone}
            iconColor={iconColor}
            onStatusChange={onStatusChange}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </div>
    </div>
  );
}