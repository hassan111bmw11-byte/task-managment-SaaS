export default function HomeNavBar() {
  return (
    <div className="w-screen h-16 flex items-center fixed justify-between px-8 bg-white shadow-md">
      <div className=" flex gap-4 items-center">
        <h1 className="text-2xl flex gap-4 font-bold text-blue-600">TaskPro</h1>

        <div className="flex gap-8 items-center mt-1 ml-4 text-black">
          <a className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-2xl" href="#Home">Home</a>
          <a className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-2xl" href="#Features">Features</a>
          <a className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-2xl" href="#Guide">Guides</a>
        </div>
      </div>

      <div className="flex gap-4">
        <a
          href="/Register"
          className=" text-black px-4 py-2 transition duration-300"
        >
          Sign Up
        </a>
        <a
          href="/login"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
        >
          Login
        </a>
      </div>
    </div>
  );
}
