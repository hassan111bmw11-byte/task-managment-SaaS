"use client";
import TaskItem from "./TaskItem";
import { useDroppable } from "@dnd-kit/core";

export default function TaskColumn({
  title,
  tasks,
  borderColor,
  iconColor,
  onStatusChange,
  onDelete,
  onEdit,
  loading,
}) {
  const { setNodeRef } = useDroppable({
    id: title
  });

  return (
<div ref={setNodeRef} className=" w-full overflow-y-scroll no-scrollbar h-[80vh]">
        <h1 className="font-bold text-2xl">
        {title}
        <span className="ml-2 px-2 bg-gray-200 text-sm rounded">
          {tasks?.length}
        </span>
      </h1>

      <hr className={`mt-4 w-full border ${borderColor}`} />

      <div className="w-full mt-4 h-[80vh] no-scrollbar">
        
  {loading ? (
    <>
      {[1, 2, 3].map(i => (
        <div
          key={i}
          className="h-20 bg-blue-700 mt-2 rounded-xl animate-pulse"
        />
      ))}
    </>
  ) : tasks?.length === 0 ? (
    <p className="text-gray-100 font-semibold text-center mt-8">
      No tasks yet 🚀
    </p>
  ) : (
        tasks?.filter(Boolean).map((task) => (
          <TaskItem
            key={task._id}
            task={task}
            isDone={task.status === "Done"}
            iconColor={iconColor}
            onStatusChange={onStatusChange}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        )))}
      </div>
    </div>
  );
}