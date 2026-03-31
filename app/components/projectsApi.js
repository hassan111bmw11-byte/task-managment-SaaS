"use client";

import { createContext, useState, useEffect } from "react";

export const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // 1. جلب البيانات من localStorage فوراً
    const userInfo = JSON.parse(localStorage.getItem("data"));

    if (userInfo) {
      setUser(userInfo);

      // 2. جلب المشاريع باستخدام التوكن المستخرج مباشرة من الـ localStorage
      // لا ننتظر تحديث حالة الـ user لأنها ستتأخر
      const token = userInfo?.token || userInfo?.data?.token;

      const getProjects = async () => {
        try {
          const response = await fetch(
            `https://demo-rrxv.onrender.com/userProjects`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            },
          );
          const data = await response.json();

          // تأكد من أن البيانات مصفوفة قبل التحديث
          if (Array.isArray(data)) {
            setProjects(data);
          } else {
            setProjects([]);
          }
        } catch (error) {
          console.error("Error fetching projects:", error);
        }
      };

      if (token) {
        getProjects();
      }
    }
  }, []); // تعمل مرة واحدة عند الريفريش

  // استخراج البيانات بشكل آمن للعرض
  const userId = user?.data?._id || user?._id;
  const userEmail = user?.data?.email || user?.email;
  const userName = user?.data?.userName || user?.userName;

  return (
    <ProjectContext.Provider
      value={{ projects, setProjects, userId, userEmail, userName ,token}}
    >
      {children}
    </ProjectContext.Provider>
  );
};
