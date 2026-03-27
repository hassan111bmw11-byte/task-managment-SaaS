"use client";
import Image from "next/image";
import { useState } from "react";

export default function RegisterPage() {
  const [user, setUser] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const addNewUser = async () => {
    try {
      const res = await fetch("https://demo-rrxv.onrender.com/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userName: user.userName,
          email: user.email,
          password: user.password,
        }),
      });

      const data = (await res.json()) ?? "";
      localStorage.setItem("data", JSON.stringify(data));

      if (res.ok && data.status) {
        // التحقق من وجود التوكين قبل التخزين
        const token = data?.data?.token;
        if (token) {
          localStorage.setItem("token", token);
          // التوجيه (يفضل استخدام useNavigate)
          window.location.href = "./MainContent/projects_temp";
        }
      } else {
        // إظهار رسالة الخطأ القادمة من السيرفر إن وجدت
        alert(data.message || "حدث خطأ أثناء التسجيل");
      }
    } catch (error) {
      console.error("Network Error:", error);
      alert("مشكلة في الاتصال بالسيرفر");
    }
  };
  return (
    <div className="bg-linear-to-r from-zinc-300  to-zinc-100 flex w-screen h-screen justify-center">
      <div className="bg-white mt-20 w-90 h-120 shadow-xl p-4 flex flex-col gap-1 rounded-tl-2xl rounded-bl-2xl">
        <h1 className="font-bold text-center mt-13 text-2xl">Wellcome Back</h1>
        <label className="font-bold ">Full Name</label>
        <input
          placeholder="John Cena"
          className="border-2 font-bold transition duration-300 ease-in-out focus:border-2 focus:border-blue-500 focus:outline-none focus:shadow-lg shadow-md border-blue-700 pl-2 h-12 rounded-lg w-80"
        />
        <label className="font-bold ">User Name</label>
        <input
          value={user.userName}
          onChange={(e) => {
            setUser({ ...user, userName: e.target.value });
          }}
          placeholder="John.20Cena"
          className="border-2 font-bold transition duration-300 ease-in-out focus:border-2 focus:border-blue-500 focus:outline-none focus:shadow-lg shadow-md border-blue-700 pl-2 h-12 rounded-lg w-80"
        />
        <label className="font-bold ">Email</label>
        <input
          value={user.email}
          onChange={(e) => {
            setUser({ ...user, email: e.target.value });
          }}
          type="email"
          placeholder="e,g. Your.Name@example.com"
          className="border-2 font-bold transition duration-300 ease-in-out focus:border-2 focus:border-blue-500 focus:outline-none focus:shadow-lg shadow-md border-blue-700 pl-2 h-12 rounded-lg w-80"
        />
        <label className="font-bold ">Password</label>
        <input
          value={user.password}
          onChange={(e) => {
            setUser({ ...user, password: e.target.value });
          }}
          type="password"
          placeholder="password"
          className="border-2 font-bold transition duration-300 ease-in-out focus:border-2 focus:border-blue-500 focus:outline-none focus:shadow-lg shadow-md border-blue-700 pl-2 h-12 rounded-lg w-80"
        />

        <button
          onClick={addNewUser}
          className="bg-blue-700 w-80 mt-4 text-white text-center h-12 shadow-2xl hover:bg-blue-800 rounded-2xl"
        >
          Register
        </button>
        <label className="font-bold text-sm text-center mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-700 mt-4 font-bold">
            Login
          </a>
        </label>
      </div>
      {/* illustration */}
      <div className="w-90 h-120 py-12 mt-20 flex flex-col rounded-tr-2xl rounded-br-2xl justify-between items-center bg-blue-600">
        <label className="font-bold text-center text-white text-2xl mt-4">
          Create Your Account
        </label>
        <Image
          src="/register3.jpg"
          alt="register"
          loading="eager"
          width={500}
          height={500}
          className=" object-cover w-80 mb-4 rounded-xl  "
        />
      </div>
    </div>
  );
}
