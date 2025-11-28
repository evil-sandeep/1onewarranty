import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const { login } = useContext(AuthContext);

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  const update = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Login failed");

      login(data.token); // save token in context

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>

      <form className="space-y-4" onSubmit={submit}>
        <input name="email" placeholder="Email" value={form.email}
          onChange={update} className="w-full border rounded-lg px-3 py-2" />

        <input type="password" name="password" placeholder="Password"
          value={form.password} onChange={update}
          className="w-full border rounded-lg px-3 py-2" />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button className="w-full bg-black text-white py-2 rounded-xl">
          Sign In
        </button>
      </form>
    </div>
  );
}
