import Image from "next/image";
export default function homeGuide() {
  return (
    <div id="Guide" className="w-full h-screen bg-white  flex flex-col items-center ">
      <div className="flex gap-80 mt-20">
        <div className=" w-58">
          {/* texts how it works */}
          <h1 className="font-bold text-2xl font-bold text-zinc-900">
            Eveything you Need in One Place
          </h1>
          <p className="w-100">
            All the essentail tools for task and project management in one place
          </p>
          <div className="mt-10 w-100">
            <h2 className="font-bold font-bold text-zinc-900 text-2xl mt-8">
              {" "}
              <span className="p-2 rounded-4xl text-blue-600 font-bold text-2xl">
                1
              </span>{" "}
              Create a Project
            </h2>

            <p className="ml-10">
              Click the 'Add New Project' button, enter your project details,and
              get started
            </p>
            <br />
            <h2 className="font-bold font-bold text-zinc-900 text-2xl mt-8">
              {" "}
              <span className="p-2 rounded-4xl text-blue-600 font-bold text-2xl">
                2
              </span>{" "}
              Add your Tasks
            </h2>
            <p className="ml-10">
              Easily add tasks to your project, assign due dates, and organize
              them in deferent stages like 'To Do', 'In Progress', and 'Done'.
            </p>
            <br />
            <h2 className="font-bold text-zinc-900 text-2xl mt-8">
              <span className="p-2 rounded-4xl text-blue-600 font-bold text-2xl">
                3
              </span>{" "}
              Track Your Progress
            </h2>
            <p className="ml-10">
              Monitor your project's progress with the Kanban and Kepp every
              thing on track.
            </p>
          </div>

          {/* ===texts how it works===*/}
        </div>
        {/* img */}
        <div className="flex flex-col">
          <Image
            src="/image3.jpg"
            alt="Hero Image"
            width={500}
            height={250}
            className="object-cover rounded-2xl  shadow-lg"
          />
          <Image
            src="/image4.jpg"
            alt="Hero Image"
            width={500}
            height={250}
            className="object-cover rounded-2xl   shadow-lg"
          />
        </div>
        {/* ===img== */}
      </div>
    </div>
  );
}
