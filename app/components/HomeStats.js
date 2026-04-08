export default function HomeStats() {
  return (
    <div className="h-80 w-screen">
      {/* cards */}
      <h1 className="font-bold text-center text-amber-50 text-2xl mt-10">
        Join Thousands of Productive Teams
      </h1>
      <p className="text-center text-amber-50 text-sm mt-2">
        See how TaskPro helps teams stay organized and efficient.
      </p>

      <div className="mt-8 flex justify-center gap-4">
        <div className="w-60  transition-all duration-500 ease hover:bg-zinc-400 h-30 flex flex-col justify-center items-center
        bg-white/30 backdrop-blur-md border border-white/50 rounded-xl p-6 shadow-lg">
          <h1 className="font-bold text-red-700 text-4xl">10K+</h1>
          <p className="mt-2  text-amber-50">Happy users</p>
        </div>
        <div className="w-60 h-30 transition-all duration-500 ease hover:bg-zinc-400 flex flex-col justify-center items-center 
        bg-white/30 backdrop-blur-md border border-white/50 rounded-xl p-6 shadow-lg">
          <h1 className="font-bold text-pink-500   text-4xl">500+</h1>
          <p className="mt-2  text-amber-50">Project managed</p>
        </div>
        <div className="w-60 h-30 transition-all duration-500 ease hover:bg-zinc-400 flex flex-col justify-center items-center
        bg-white/30 backdrop-blur-md border border-white/50 rounded-xl p-6 shadow-lg">
          <h1 className="font-bold text-orange-500 text-4xl">50%</h1>
          <p className="mt-2  text-amber-50">Increase in producticity</p>
        </div>
        <div className="w-60 h-30 transition-all duration-500 ease hover:bg-zinc-400 flex flex-col justify-center items-center
        bg-white/30 backdrop-blur-md border border-white/50 rounded-xl p-6 shadow-lg">
          <h1 className="font-bold text-green-500 text-4xl">98%</h1>
          <p className="mt-2  text-amber-50">User Satisfaction</p>
        </div>
      </div>
      {/* ===cards=== */}
    </div>
  );
}
