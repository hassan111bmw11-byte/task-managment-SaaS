export default function DashboardtodosCards({ title, todos }) {
  return (
    <div className="p-4 rounded-2xl bg-amber-50 w-85">
      <h1 className="font-bold text-2xl ml-4">{title}</h1>
      <hr className="border-gray-400 mt-2" />
      {/* todos */}
      <div className="border border-gray-400 mt-4 rounded p-4 w-75 h-20">
        <h2 className="font-bold">Design homepage</h2>
        <div className="flex justify-between">
          <div className="">
            <h3 className="text-gray-900 ">{todos}</h3>
          </div>
          <div className="flex gap-4">
            <nav className=" text-blue-600 font-bold">Edit</nav>
            <p className="text-gray-800">|</p>
            <nav className=" text-red-600 font-bold">Delete</nav>
          </div>
        </div>
      </div>
    </div>
  );
}
