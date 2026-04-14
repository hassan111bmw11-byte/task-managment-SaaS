"use client";
import Image from "next/image";
import { useState } from "react";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [userLogin, setUserLogin] = useState("");
  const Login = async () => {
    setLoading(true);
    // const userInfo = JSON.parse(localStorage.getItem("data")) || [];
    // const token = userInfo?.data?.token;
    try {
      const res = await fetch("https://demo-rrxv.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
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
    }finally{
      setLoading(false);
    }
  };
  return (
    <div className="bg-linear-to-r from-blue-900 via-blue-500 to-blue-900 flex h-screen w-screen items-center justify-center">
      <div className="bg-white/30 border-white border-b border-l border-t border-lw-90 h-90 flex rounded-tl-2xl rounded-bl-2xl flex-col justify-around shadow-2xl p-4  ">
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
            className="border-2 border-white mb-2 font-bold transition duration-300 ease-in-out focus:border-2 focus:border-blue-800 focus:outline-none focus:shadow-lg shadow-2xl pl-2 h-10 rounded-lg w-80"
          />
          <label className=" font-bold mb-2">Password</label>
          <input
            value={userLogin.password || ""}
            onChange={(e) => {
              setUserLogin({ ...userLogin, password: e.target.value });
            }}
            type="password"
            placeholder="password"
            className="border-2 border-white font-bold transition duration-300 ease-in-out focus:border-2 focus:border-blue-800 focus:outline-none focus:shadow-lg shadow-md  pl-2 h-10 rounded-lg w-80"
          />
        </div>
        <button
          onClick={Login}
     
          className="bg-linear-to-r from-blue-900 via-45% to-blue-700 w-80 mt-4 text-white flex justify-center items-center h-10 rounded-2xl hover:bg-linear-to-r hover:from-blue-600 hover:via-45% hover:to-blue-900 transition ease-linear duration-500 shadow-2xl"
        >{loading ? (<div className="animate-spin rounded-full h-6 w-6 border-4 flex border-white border-t-transparent"></div>) : (
          'login')}
        </button>
        <label className="text-sm font-bold text-center">
          Don't have an account?{" "}
          <a href="/Register" className="text-blue-700 font-bold">
            Register
          </a>
        </label>
      </div>
      {/* illlustration */}
      <div className="border-white border-b border-t border-r bg-white/30 w-90 h-90 rounded-tr-2xl rounded-br-2xl flex flex-col justify-evenly shadow-2xl p-4  ">
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
