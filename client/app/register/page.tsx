"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { API } from "@/app/lib/api";

export default function Register() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const handleRegister = async () => {
    if (!email.trim() || !password.trim()) {
      setMessage("All fields are required");
      return;
    }

    if (!email.includes("@")) {
      setMessage("Invalid email");
      return;
    }

    if (password.length < 6) {
      setMessage("Password must be at least 6 characters");
      return;
    }
    const res = await fetch(`${API}/auth/register`, {
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
        router.push("/");
      }, 1000);
    } else {
      setMessage(data.message);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleRegister();
      }}
      className="flex flex-col gap-4"
    >
      <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
        <div className="w-full max-w-sm border border-gray-700 p-10 rounded-lg flex flex-col gap-4 ">
          <h1 className="text-2xl font-bold text-center">Register</h1>

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

          <button type="submit"
            className="border border-white px-4 py-2 hover:bg-white hover:text-black transition cursor-pointer"
          >
            Register
          </button>

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
            onClick={() => router.push("/")}
          >
            Already have an account? Login
          </p>
        </div>
      </div>
    </form>
  );
}
