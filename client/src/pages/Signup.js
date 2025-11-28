import React, { useState } from "react";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const update = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Signup failed");

      setSuccess("Signup successful! Please login.");
      setForm({ name: "", email: "", password: "" });

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-4">Create Account</h2>

      <form className="space-y-4" onSubmit={submit}>
        <input name="name" placeholder="Full Name" value={form.name} onChange={update}
          className="w-full border rounded-lg px-3 py-2" />

        <input name="email" placeholder="Email" value={form.email} onChange={update}
          className="w-full border rounded-lg px-3 py-2" />

        <input type="password" name="password" placeholder="Password"
          value={form.password} onChange={update}
          className="w-full border rounded-lg px-3 py-2" />

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-500 text-sm">{success}</p>}

        <button className="w-full bg-black text-white py-2 rounded-xl">
          Sign Up
        </button>
      </form>
    </div>
  );
}
