"use client";

import { useEffect, useState } from "react";

export default function Dashboard() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  const fetchTasks = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/";
      return;
    }

    const res = await fetch("http://localhost:5000/tasks?limit=100", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/";
      return;
    }

    const data = await res.json();

    if (data.status === "success") {
      setTasks(data.data);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async () => {
    if (!title.trim()) {
      setMessage("Task cannot be empty");
      setTimeout(() => {
        setMessage("");
      }, 2000);
      return;
    }

    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title: title.trim() }),
    });

    const data = await res.json();
    if (res.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/";
      return;
    }
    if (data.status === "success") {
      setTitle("");
      setMessage("");
      fetchTasks();
    } else {
      setMessage(data.message);
    }
  };

  //   const toggleTask = async (id: string) => {
  //     const token = localStorage.getItem("token");

  //     await fetch(`http://localhost:5000/tasks/${id}/toggle`, {
  //       method: "PATCH",
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     fetchTasks();
  //   };
  const toggleTask = async (id: string) => {
    const prevTasks = tasks;

    // ✅ optimistic update
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );

    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`http://localhost:5000/tasks/${id}/toggle`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // handle invalid token
      if (res.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/";
        return;
      }

      // if request failed → rollback
      if (!res.ok) {
        setTasks(prevTasks);
      }
    } catch (err) {
      // network error → rollback
      setTasks(prevTasks);
    }
  };
  const handleEdit = (task: any) => {
    setEditingId(task.id);
    setEditText(task.title);
    setMessage("");
  };
  const saveEdit = async () => {
    const token = localStorage.getItem("token");

    if (!editText.trim()) {
      setEditingId(null);
      return;
    }
    await fetch(`http://localhost:5000/tasks/${editingId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title: editText }),
    });

    setEditingId(null);
    setEditText("");
    fetchTasks();
  };

  const deleteTask = async (id: string) => {
    setMessage("");
    setTasks((prev) => prev.filter((t) => t.id !== id));
    const token = localStorage.getItem("token");

    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // fetchTasks();
  };

  return (
    <div className="min-h-screen bg-black text-white flex justify-center px-4 py-6">
      <div className="w-full max-w-2xl flex flex-col">
        {/* HEADER */}
        <div className="relative flex items-center mb-6">
          <h1 className="text-3xl font-bold mx-auto">WorkTrackr</h1>

          <button
            className="absolute right-0 text-red-400 border px-3 py-1 hover:bg-red-500 hover:text-white transition cursor-pointer"
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/";
            }}
          >
            Logout
          </button>
        </div>

        {/* REST OF YOUR UI BELOW */}

        {/* 🔥 Message (no layout shift) */}
        <div className="h-10 flex items-center justify-center mb-4">
          {message && <div className="text-red-400 text-center">{message}</div>}
        </div>

        {/* 🔥 Add Task */}
        <div className="flex gap-2 mb-6">
          <input
            className="border border-gray-600 bg-black p-2 rounded focus:outline-none focus:border-white w-full"
            placeholder="New task"
            value={title}
            onChange={(e) => {
              setMessage("");
              setTitle(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAddTask();
              }
            }}
          />
          <button
            className="border border-white px-4 hover:bg-white hover:text-black transition cursor-pointer"
            onClick={handleAddTask}
          >
            Add
          </button>
        </div>

        {/* 🔥 Task List */}
        <div className="task-scroll flex flex-col gap-2 max-h-[60vh] overflow-y-auto pr-1">
          {tasks.length === 0 && (
            <p className="text-gray-500 text-center">No tasks yet</p>
          )}
          {tasks.map((task) => (
            <div
              key={task.id}
              className={`flex items-center justify-between border p-2 transition cursor-pointer ${
                task.completed
                  ? "border-amber-600"
                  : "border-gray-300 hover:border-amber-600"
              }`}
              onClick={() => {
                if (editingId !== task.id) toggleTask(task.id);
              }}
            >
              {/* LEFT SIDE */}
              <div className="flex items-center gap-2 w-full">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  onClick={(e) => e.stopPropagation()}
                />

                {/* 🔥 EDIT MODE */}
                {editingId === task.id ? (
                  <input
                    className="bg-black outline-none w-full"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                    onBlur={saveEdit}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        saveEdit();
                      }
                      if (e.key === "Escape") {
                        setEditingId(null);
                        setEditText("");
                      }
                    }}
                    autoFocus
                  />
                ) : (
                  <span
                    className={`w-full ${task.completed ? "line-through" : ""}`}
                  >
                    {task.title}
                  </span>
                )}
              </div>

              {/* RIGHT SIDE */}
              <div className="flex gap-3">
                <button
                  className="text-yellow-400 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEdit(task);
                  }}
                >
                  ✏️
                </button>

                <button
                  className="text-red-400 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteTask(task.id);
                  }}
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
