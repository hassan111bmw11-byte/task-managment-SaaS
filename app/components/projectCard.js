"use client";

// mui compnents
import Avatar from "@mui/material/Avatar";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
// React Hooks
import { useState, useEffect, useContex, useContext } from "react";
import { ProjectContext } from "./projectsApi";
import { TaskContext } from "./tasksApi";
import Link from "next/link";

export default function ProjectCard() {
  // option menu
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event, _id) => {
    setAnchorEl(event.currentTarget);
    setSelectedId(_id);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // ==option menu==

  // react states
  const [selectedId, setSelectedId] = useState(null);
  const [projectInputValue, setProjectInputValue] = useState("");
  // show update and  add button & input
  const [showUpdate, setShowUpdate] = useState("hidden");
  const [showAdd, setShowAdd] = useState("flex");

  // ===projects=====
  const { projects, setProjects, token, loading } = useContext(ProjectContext) ?? {};
  const { tasks } = useContext(TaskContext);
    const [user, setUser] = useState("");

  // update project state
  const [updatedProject, setUpdatedProject] = useState([]);
  useEffect(() => {
    // get data
    async function getProjects() {
      setProjects(projects || []);
       const storedUser = localStorage.getItem("data") || [];
    const parsedUser = storedUser ? JSON.parse(storedUser) : null;
    setUser(parsedUser.data?.userName);
    }

    getProjects();
    console.log(projects);
  }, []);

  // add project
  async function HandelAddProject() {
    try {
      // localStorage.getItem("user");
      const user = JSON.parse(localStorage.getItem("data")) || [];
      const ownerId = user?.data?._id;
      const res = await fetch(
        `https://demo-rrxv.onrender.com/create/${ownerId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: projectInputValue,
          }),
        },
      );
      const data = (await res.json()) || [];
      if (!data) {
        return <p>loading...</p>;
      }
      // console.log(data);
      setProjects([...projects, data]);
      setProjectInputValue("");
    } catch (error) {
      console.log(error);
    }
  }

  // delete projects
  function HandelDeleteProject(id) {
    fetch(`https://demo-rrxv.onrender.com/deleteProject/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data) {
          return <p>loading...</p>;
        }
        // console.log("Project deleted", data);
        setProjects(projects.filter((project) => project._id !== id));
      })
      .catch((err) => {
        console.log(err);
      });
    handleClose();
  }
  // apdate project

  function HandelUpdateProject(id) {
    fetch(`https://demo-rrxv.onrender.com/Projects/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: updatedProject,
      }),
    });
    setUpdatedProject("");
    setProjects(
      projects.map((project) =>
        project._id === id ? { ...project, title: updatedProject } : project,
      ),
    );
    setShowAdd("flex");
    setShowUpdate("hidden");
  }

  const MyProjectsList =
  
    projects && Array.isArray(projects) ? (
      projects?.map((project, index) => {
        return (
          <div
            key={index}
            className="mt-4 mx-4 p-4 pro-card flex justify-between flex-row-reverse w-md h-fit shadow-2xl text-black bg-white/30 rounded-2xl border border-white"
          >
            {/* option project button*/}

            <MoreHorizIcon
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={(event) => {
                handleClick(event, project?._id);
              }}
              className="optionBtn w-6 rounded-4xl h-fit mt-5 flex justify-between items-center"
            />
            {/* ===option project button=== */}
            <Link
              className="z-0"
              href={`/MainContent/projects_temp/${project?._id}`}
            >
              <div className="flex justify-between items-center w-fit">
                <h2 className="font-bold pl-4 text-2xl ">{project?.title}</h2>
              </div>
              <h2 className="ml-4 text-gray-600">
                {tasks?.filter((task) => task.project === project._id).length}{" "}
                Tasks Tasks . Created at {/* project date */}
                <span className="text-gray-600">
                  {new Date(project?.createdAt).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
                {/* ===project date=== */}
              </h2>
              {/* Users Info */}
              <div className="mt-4 ml-4 flex items-center gap-4 text-gray-600">
                <Avatar />  {user} {" "} Project's
              </div>
            </Link>

            {/* project popover Delete & Edit menu*/}
            <Menu
              id="demo-positioned-menu"
              aria-labelledby="demo-positioned-button"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              <MenuItem
                onClick={() => {
                  HandelUpdateclick(selectedId);
                }}
                sx={{
                  color: "primary.main",
                  fontWeight: "bold",
                }}
              >
                Edit
              </MenuItem>
              <MenuItem
                onClick={() => {
                  HandelDeleteProject(selectedId);
                }}
                sx={{
                  color: "error.main",
                  fontWeight: "bold",
                }}
              >
                Delete
              </MenuItem>
              <MenuItem sx={{ fontWeight: "bold" }} onClick={handleClose}>
                Cancel
              </MenuItem>
            </Menu>

            {/* ===project popover Delete & Edit menu===*/}
          </div>
        );
      })
    ) : (
      // هذه الرسالة ستظهر للمستخدم الجديد بدلاً من الشاشة البيضاء
      <div className="text-center p-10 text-gray-500">
        <p className="text-xl">
          You have no projects yet. Add a new project to get started.
        </p>
      </div>
    );

  // event handeler

  // update click
  function HandelUpdateclick(id) {
    setShowAdd("hidden");
    setShowUpdate("flex");
    setSelectedId(id);
    const project = projects?.find((project) => project?._id === id);
    setUpdatedProject(project?.title);
  }

  return (
    <div className="h-screen p-8 m-8 rounded-lg w-2xlg overflow-hidden bg-white/30">
      <div className="flex justify-between gap-16">
        <div>
          <h1 className="text-2xl font-bold">Projects & Tasks</h1>
          <h2 className="text-gray-800 font-bold">{projects?.length} project </h2>
        </div>
        {/* add button & Input */}
        <div className={`${showAdd} items-center gap-4`}>
          <input
            value={projectInputValue || ""}
            onChange={(e) => {
              setProjectInputValue(e.target.value);
            }}
            placeholder="Add New Project"
            className="border-2 transition duration-300 ease-in-out focus:border-2 focus:border-blue-500 focus:outline-none focus:shadow-lg shadow-md border-blue-800 pl-2 h-10 rounded-lg w-120"
          />

          {/* add button */}
          <div>
            <button
              onClick={HandelAddProject}
              className="bg-blue-800 addBtn shadow-md w-32 text-center h-10 text-amber-50 flex justify-center items-center rounded-lg"
            >
              + Add
            </button>
          </div>
          {/* ===add button== */}

          {/* ====add Input & button=== */}
        </div>
        {/* update input */}

        <div className={`${showUpdate} items-center gap-4`}>
          <input
            value={updatedProject || ""}
            onChange={(e) => {
              setUpdatedProject(e.target.value);
            }}
            placeholder="Update Project"
            className="border transition duration-300 ease-in-out focus:border-2 focus:border-blue-500 focus:outline-none focus:shadow-lg shadow-md border-blue-700 pl-2 h-10 rounded-lg w-140"
          />
          {/* ====update input=== */}

          {/* update button */}
          <div>
            <button
              onClick={() => HandelUpdateProject(selectedId)}
              className="bg-blue-600 addBtn shadow-md w-32 text-center h-10 text-amber-50 flex justify-center items-center rounded-lg"
            >
              update
            </button>
          </div>
          {/*====update button====*/}
        </div>
      </div>
      <hr className=" border-zinc-400 shadow-2xl mt-4" />

      <div className=" text-black grid grid-cols-2 justify-center items-center w-full rounded h-9/12 no-scrollbar overflow-y-scroll">

  {loading ? (
    // ✅ Loading هنا
    <>
      {[1, 2, 3,4,5,6].map(i => (
        <div
          key={i}
          className="h-38 w-md bg-blue-500 m-4 rounded-2xl p-4 animate-pulse"
        />
      ))}
    </>
  ) : projects?.length === 0 ? (
    // ✅ Empty state
    <p className="text-black w-full col-span-2 text-center mt-8">
      No projects yet 🚀
    </p>
  ) : (
    // ✅ البيانات
    MyProjectsList
  )}

</div>
    </div>
  );
}
