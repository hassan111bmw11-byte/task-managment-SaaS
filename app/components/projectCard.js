"use client";

// mui compnents
import Avatar from "@mui/material/Avatar";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
// React Hooks
import { useState, useEffect } from "react";
import Link from "next/link";
import { Token } from "@mui/icons-material";

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
  const [projects, setProjects] = useState([]);
  // update project state
  const [updatedProject, setUpdatedProject] = useState([]);
  useEffect(() => {
    // get data
    async function getProjects() {
      const response = await fetch(
        "https://demo-rrxv.onrender.com/allProjects",
      );

      const data = (await response.json()) || [];
      const user = JSON.parse(localStorage.getItem("data")) || [];
      if (!data) {
        return <p>loading...</p>;
      }
      console.log(user?.data?._id);
      const pro = data?.filter((p) => {
        return p.owner === user?.data?._id;
      });

      console.log(pro);

      console.log("Data has been returned");
      setProjects(pro || []);
    }

    getProjects();
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
          },
          body: JSON.stringify({
            title: projectInputValue,
          }),
        },
      );
      const data = (await res.json()) || [];
      if (!data){return <p>loading...</p>}
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
    })
      .then((res) => res.json())
      .then((data) => {
        if(!data){
          return <p>loading...</p>
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

  const MyProjectsList = projects?.map((project, index) => {
    return (
      <div
        key={index}
        className="mt-4 p-4 pro-card flex justify-between flex-row-reverse   w-md h-50 shadow-2xl text-black bg-white rounded"
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
            <h2 className="font-bold p-4 text-2xl ">{project?.title}</h2>
          </div>
          <h2 className="ml-4 text-gray-600">
            {project?.tasks.length} Tasks . Created at {/* project date */}
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
            <Avatar /> Demo user
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
  });

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
    <div className="h-140 p-8 m-8  rounded-lg w-2xlg bg-white">
      <div className="flex justify-between">
        <div>
          <h1 className="text-2xl font-bold">Projects & Tasks</h1>
          <h2 className="text-gray-600">{projects?.length} project </h2>
        </div>
        {/* add button & Input */}
        <div className={`${showAdd} items-center gap-4`}>
          <input
            value={projectInputValue}
            onChange={(e) => {
              setProjectInputValue(e.target.value);
            }}
            placeholder="Add New Project"
            className="border transition duration-300 ease-in-out focus:border-2 focus:border-blue-500 focus:outline-none focus:shadow-lg shadow-md border-blue-700 pl-2 h-10 rounded-lg w-140"
          />

          {/* add button */}
          <div>
            <button
              onClick={HandelAddProject}
              className="bg-blue-600 addBtn shadow-md w-32 text-center h-10 text-amber-50 flex justify-center items-center rounded-lg"
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
            value={updatedProject}
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
      <hr className=" border-zinc-300 mt-4" />

      <div className=" text-black grid grid-cols-2 pl-7 bg-zinc-300 h-100 rounded no-scrollbar overflow-auto mt-4">
        {MyProjectsList}
      </div>
    </div>
  );
}
