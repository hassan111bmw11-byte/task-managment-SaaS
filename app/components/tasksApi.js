"use client";
import { createContext, useState, useEffect } from "react";
export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState("");
  const [loading,setLoading]= useState(false);
  useEffect(() => {
    async function getTasks() {
      setLoading(true);
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
      }finally {
        setLoading(false);
      }
    }
      console.log("tasks from dashboard Card", tasks);

    getTasks();
  }, []); // تأكد أن token و userLogin معرفين خارج الـ useEffect أو مضافين للمصفوفة هنا

  return (
    <TaskContext.Provider value={{ tasks, setTasks,loading }}>
      {children}
    </TaskContext.Provider>
  );
};
