export default function HomeNavBar() {
  return (
    <div className="w-screen rounded-2xl h-16 flex items-center z-50 fixed justify-between px-8 bg-white shadow-xl">
      <div className=" flex gap-4 items-center">
        <h1 className="text-2xl flex gap-4 font-bold text-blue-600">TaskPro</h1>

        <div className="flex gap-8 items-center mt-1 ml-4 text-black">
          <a
            className=" hover:bg-blue-400 hover:text-white transition-all duration-500 ease-in-out px-4 py-1 rounded-2xl"
            href="#Home"
          >
            Home
          </a>
          <a
            className="hover:bg-blue-400 hover:text-white transition-all duration-500 ease-in-out px-4 py-1 rounded-2xl"
            href="#Features"
          >
            Features
          </a>
          <a
            className="hover:bg-blue-400 hover:text-white transition-all duration-500 ease-in-out px-4 py-1 rounded-2xl"
            href="#Guide"
          >
            Guides
          </a>
          <a
            className="hover:bg-blue-400 hover:text-white transition-all duration-500 ease-in-out px-4 py-1 rounded-2xl"
            href="#contact"
          >
            contact
          </a>
        </div>
      </div>

      <div className="flex gap-4">
        <a
          href="/Register"
          className="hover:bg-blue-400 hover:text-white transition-all duration-500 ease-in-out px-4 py-2 rounded-2xl"
        >
          Sign Up
        </a>
        <a
          href="/login"
          className="bg-blue-500  text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out"
        >
          Login
        </a>
      </div>
    </div>
  );
}
