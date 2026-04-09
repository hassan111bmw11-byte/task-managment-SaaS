
export default function ProgressLine({
  title,
  value = 0,
  max = 0,
  color = "bg-blue-700",
}) {

  const percentage = Math.min((value / max) * 100, 100) || 0;
  return (
    <>
      <div className="w-160 flex flex-col justify-cente hover:bg-zinc-400 transition-all duration-500 ease pl-4 mt-4 pr-4 pt-2 h-16 ml-8 bg-zinc-300 rounded-2xl shadow-lg ">
        {/* Header */}
        <div className="flex mb-2  justify-between  items-center">
          <h3 className="text-lg font-semibold text-gray-700">{title || "add new project"}</h3> {" "}
          <span className="text-sm font-medium text-gray-500">
            <p>
              {value}/{max} Tasks
            </p>
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-150 h-3  bg-gray-300 rounded-full overflow-hidden">
          <div
            className={`h-full  ${color}  transition-all  duration-700 ease-in-out`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </>
  );
}
