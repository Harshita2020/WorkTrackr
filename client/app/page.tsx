"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { API } from "@/app/lib/api";

export default function Home() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      setMessage("Missing fields");
      return;
    }

    try {
      // const res = await fetch("http://localhost:5000/auth/login", {
      const res = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.status === "success") {
        setMessage(data.message);

        setTimeout(() => {
          localStorage.setItem("token", data.data.accessToken);
          router.push("/dashboard");
        }, 1000);
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage("Something went wrong");
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleLogin();
      }}
      className="flex flex-col gap-4"
    >
      <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
        <div className="w-full max-w-sm border border-gray-700 p-6 rounded-lg flex flex-col gap-4">
          <h1 className="text-2xl font-bold text-center">Login</h1>

          <input
            className="border border-gray-600 bg-black p-2 rounded focus:outline-none focus:border-white"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setMessage("");
            }}
          />

          <input
            className="border border-gray-600 bg-black p-2 rounded focus:outline-none focus:border-white"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setMessage("");
            }}
          />

          <button
            type="submit"
            className="border border-white px-4 py-2 hover:bg-white hover:text-black transition cursor-pointer"
            // onClick={handleLogin}
          >
            Login
          </button>

          {/* ✅ Reserved message space (NO LAYOUT SHIFT) */}
          <div className="h-12 flex items-center justify-center">
            {message && (
              <div
                className={`w-full p-2 border text-center ${
                  message.toLowerCase().includes("success")
                    ? "bg-green-100 text-green-700 border-green-300"
                    : "bg-red-100 text-red-700 border-red-300"
                }`}
              >
                {message}
              </div>
            )}
          </div>

          <p
            className="text-blue-500 cursor-pointer hover:underline text-center"
            onClick={() => router.push("/register")}
          >
            Don't have an account? Register
          </p>
        </div>
      </div>
    </form>
  );
}
