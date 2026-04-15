export default function HomeNavBar() {
  return (
    <div className="w-screen bg-white/30 backdrop-blur-md rounded-2xl h-16 flex items-center z-50 fixed justify-between px-8 shadow-xl">
      <div className=" flex gap-4 items-center">
        <h1 className="text-2xl flex gap-4 font-bold text-white">TaskPro</h1>

        <div className="flex gap-8 items-center mt-1 ml-4 text-amber-50">
          <a
            className=" hover:bg-blue-400 hover:text-black transition-all duration-500 ease-in-out px-4 py-1 rounded-2xl"
            href="#Home"
          >
            Home
          </a>
          <a
            className="hover:bg-blue-400 hover:text-black transition-all duration-500 ease-in-out px-4 py-1 rounded-2xl"
            href="#Features"
          >
            Features
          </a>
          <a
            className="hover:bg-blue-400 hover:text-black transition-all duration-500 ease-in-out px-4 py-1 rounded-2xl"
            href="#Guide"
          >
            Guides
          </a>
          {/* <a
            className="hover:bg-blue-400 hover:text-white transition-all duration-500 ease-in-out px-4 py-1 rounded-2xl"
            href="#contact"
          >
            contact
          </a> */}
        </div>
      </div>

      <div className="flex gap-4">
        <a
          href="/Register"
          className="hover:bg-blue-400 hover:text-black text-amber-50 transition-all duration-500 ease-in-out px-4 py-2 rounded-2xl"
        >
          Sign Up
        </a>
        <a
          href="/login"
          className="bg-blue-400  text-black px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 hover:text-white transition duration-300 ease-in-out"
        >
          Login
        </a>
      </div>
    </div>
  );
}
