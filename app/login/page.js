"use client";
import Image from "next/image";
import { useState } from "react";

export default function Login() {
  const [userLogin, setUserLogin] = useState("");
  const Login = async () => {
    const userInfo = JSON.parse(localStorage.getItem("data")) || [];
    const token = userInfo?.data?.token;
    try {
      const res = await fetch("https://demo-rrxv.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          email: userLogin.email,
          password: userLogin.password,
        }),
      });

      const data = (await res.json()) || [];
      // localStorage.setItem("data", JSON.stringify(data))  || [];
      if (res.ok && data?.status) {
        console.log("login successfully");
        window.location.href = "./MainContent/dashboard";
      } else {
        alert(data?.message || "Error with email or password");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      alert("حدث خطأ في الاتصال بالسيرفر");
    }
  };
  return (
    <div className="bg-linear-to-r from-blue-400 to-zinc-100 flex h-screen w-screen items-center justify-center">
      <div className="bg-linear-to-b from-zinc-200 to-zinc-100 border-white border-b border-t border-lw-90 h-90 flex rounded-tl-2xl rounded-bl-2xl flex-col justify-around shadow-xl p-4  ">
        <label className="font-bold text-center text-2xl text-black">
          Welcome Back!
        </label>
        <div className="bg-re-900 flex flex-col h-40 ">
          <label className="font-bold mb-2">Email</label>
          <input
            value={userLogin.email || ""}
            placeholder="e,g. Your.Name@example.com"
            onChange={(e) => {
              setUserLogin({ ...userLogin, email: e.target.value });
            }}
            type="email"
            className="border-2 mb-2 font-bold transition duration-300 ease-in-out focus:border-2 focus:border-blue-400 focus:outline-none focus:shadow-lg shadow-md border-blue-500 pl-2 h-10 rounded-lg w-80"
          />
          <label className=" font-bold mb-2">Password</label>
          <input
            value={userLogin.password || ""}
            onChange={(e) => {
              setUserLogin({ ...userLogin, password: e.target.value });
            }}
            type="password"
            placeholder="password"
            className="border-2 font-bold transition duration-300 ease-in-out focus:border-2 focus:border-blue-400 focus:outline-none focus:shadow-lg shadow-md border-blue-500 pl-2 h-10 rounded-lg w-80"
          />
        </div>
        <button
          onClick={Login}
          className="bg-linear-to-b from-blue-600 to-blue-400 w-80 mt-4 text-white text-center h-10 rounded-2xl hover:bg-linear-to-t hover:from-blue-600 hover:to-blue-400 transition ease-in-out duration-500 shadow-2xl shadow-blue-600"
        >
          login
        </button>
        <label className="text-sm font-bold text-center">
          Don't have an account?{" "}
          <a href="/Register" className="text-blue-700 font-bold">
            Register
          </a>
        </label>
      </div>
      {/* illlustration */}
      <div className="border-white border-b border-t border-r bg-linear-to-b from-blue-600 to-blue-500 w-90 h-90 rounded-tr-2xl rounded-br-2xl flex flex-col justify-evenly shadow-2xl p-4  ">
        <h1 className="font-bold text-center text-white text-2xl">
          Login To Your Account
        </h1>
        <div className="\">
          <Image
            src="/login2.jpg"
            alt="login"
            loading="eager"
            width={500}
            height={800}
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>
      </div>
    </div>
  );
}
