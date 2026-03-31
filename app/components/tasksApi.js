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
      setUser(userInfo); // تحديث الحالة للمكونات الأخرى

      // استخرج التوكن والـ ID مباشرة من userInfo وليس من user State
      const token = userInfo?.data?.token;
      const ownerId = userInfo?.data?._id;

      console.log("Token used:", token);
      console.log("Owner ID:", ownerId);

      try {
        const response = await fetch(
          `https://demo-rrxv.onrender.com/allTasks/${ownerId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // الآن التوكن لن يكون undefined
            },
          },
        );

        const data = await response.json();
        console.log("tasks from tasks Api:", tasks);
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
