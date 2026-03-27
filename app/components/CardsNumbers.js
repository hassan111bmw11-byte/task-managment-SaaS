export default function NumberCards({ status, numbers = 0, icon }) {
  return (
    <div className="ml-8 w-60 h-24 py-4 rounded-2xl flex justify-between items-center bg-white mt-8">
      <div>
        <h1 className="px-4">{status}</h1>
        <h2 className=" px-4 font-bold text-4xl">{numbers}</h2>
      </div>
      <div className="rounded-2xl h-10 w-10 mr-4 flex justify-center items-center bg-gray-200">{icon}</div>
    </div>
  );
}
