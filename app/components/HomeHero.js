import Image from "next/image";
export default function HomeHero() {
  return (
    <div id="Home" className="flex gap-20 h-122 mt-10">
      {/* text */}
      <div className=" h-100 w-130">
        <h1 className="text-5xl mt-20  font-bold text-gray-800 mb-4">
          Manage your tasks and Projects Efficiently
        </h1>
        <p className="text-lg w-80 text-gray-600 mb-6">
          {" "}
          powerful task and projects management to keep your work organized.
        </p>
        <div className="mt-12">
          {" "}
          <a
            href="/Register"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-500 ease-in-out"
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
          className="object-cover mt-20 rounded-2xl h-90 shadow-lg"
        />
      </div>
    </div>
  );
}
