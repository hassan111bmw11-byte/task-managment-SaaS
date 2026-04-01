export default function ContactwithMe() {
  return (
    <div id="contact" className="flex items-center bg-zinc-100 w-screen  justify-center h-140">
      <div className="bg-white/30 backdrop-blur-md  border-white/30 shadow-2xl flex flex-col w-100 p-8 rounded-2xl gap-4 h-100">
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
