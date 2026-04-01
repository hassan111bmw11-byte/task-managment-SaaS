export default function ContactwithMe() {
  return (
    <div id="contact" className="flex bg-zinc-400 w-300  justify-center h-140">
      <div className="bg-white/30 backdrop-blur-md  border-white/80 shadow-2xl flex flex-col w-100 p-8 rounded-2xl mt-20 gap-4 h-100">
        <label className="text-center font-bold">contact with me</label>
        <input
          placeholder="Name"
          className="border-2 px-4  h-12 border-zinc-500 shadow rounded-2xl "
        />
        <input
          placeholder="Email"
          className="border-2 h-12 px-4  border-zinc-500 shadow rounded-2xl "
        />
        <textarea
          placeholder="Message"
          className="border-2 px-4 py-2 h-50 border-zinc-600 shadow-2xl rounded-2xl "
        />
      </div>
    </div>
  );
}
