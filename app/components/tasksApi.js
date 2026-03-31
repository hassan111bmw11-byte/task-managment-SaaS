"use client";
import { createContext, useState, useEffect, useContext } from "react";
import { ProjectContext } from "./projectsApi";
export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const { currentProjects } = useContext(ProjectContext);
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState("");
  useEffect(() => {
    async function getTasks() {
      const userInfo = JSON.parse(localStorage.getItem("data"));
      setUser(userInfo);

      const token = user?.data?.token;

      console.log("current Projects :", currentProjects);
      const ownerId = userInfo?.data?._id;
      console.log(ownerId)

      try {
        const response = await fetch(
          `https://demo-rrxv.onrender.com/allTasks/${ownerId}`,
          {
            method: "GET", // أضفت GET كافتراض، غيرها لـ POST إذا كنت ترسل بيانات في الـ body
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = await response.json();
        console.log("tasks from tasks Api:",tasks)
        setTasks(data || []);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    }

    getTasks();
  }, []); // تأكد أن token و userLogin معرفين خارج الـ useEffect أو مضافين للمصفوفة هنا

  return (
    <TaskContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TaskContext.Provider>
  );
};
