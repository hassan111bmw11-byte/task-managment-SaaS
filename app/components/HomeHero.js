import Image from "next/image";
export default function HomeHero() {
  return (
    <div id="Home" style={{background:"0D1A63"}} className="flex w-screen justify-center items-center gap-20 h-130 mt-10">
      {/* text */}
      <div className=" h-100 w-130">
        <h1 className="text-5xl mt-20  font-bold text-amber-50 mb-4">
          Manage your tasks and Projects Efficiently
        </h1>
        <p className="text-lg w-80 font-bold text-amber-50 mb-6">
          {" "}
          powerful task and projects management to keep your work organized.
        </p>
        <div className="mt-12">
          {" "}
          <a
            href="/Register"
            className="bg-linear-to-r from-blue-900 via-blue-600 to-blue-900 text-white px-6 py-3 rounded-lg shadow-[0_0_10px_3px_rgba(0,0,0,0.20)] shadow-blue-500 hover:bg-linear-to-r hover:from-blue-600 hover:via-blue-900 hover:to-blue-600 transition duration-700 ease-in-out"
          >
            Get Started
          </a>
        </div>
      </div>

      {/* Photo */}
      <div>
        <Image
          src="/image.png"
          alt="Hero Image"
          width={500}
          height={500}
          className="object-cover mt-20 rounded-2xl h-90 shadow-2xl"
        />
      </div>
    </div>
  );
}
