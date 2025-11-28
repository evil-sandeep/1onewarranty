// src/components/SignUp.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [agree, setAgree] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [success, setSuccess] = useState("");

  // ---------------- VALIDATION ----------------
  const validate = () => {
    const errors = {};

    if (!name.trim()) errors.name = "Full name is required";

    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      errors.email = "Enter a valid email";
    }

    if (!password) errors.password = "Password is required";
    else if (password.length < 6)
      errors.password = "Password must be at least 6 characters";

    if (password !== confirm) errors.confirm = "Passwords do not match";

    if (!agree) errors.agree = "You must agree to the terms & conditions";

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // ---------------- SUBMIT HANDLER ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setSuccess("");

    if (!validate()) return;
    setSubmitting(true);

    try {
      const payload = { name, email, password };

      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Signup failed");

      // SUCCESS
      setSuccess("Account created successfully! Please login.");
      setName("");
      setEmail("");
      setPassword("");
      setConfirm("");
      setAgree(false);
      setFieldErrors({});

    } catch (err) {
      setFormError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white border border-gray-200 rounded-2xl p-6 shadow-lg"
        aria-labelledby="signup-title"
      >
        <h2 id="signup-title" className="text-2xl font-semibold text-gray-900 mb-4">
          Create account
        </h2>

        {/* FORM ERROR */}
        {formError && (
          <div className="mb-4 text-sm text-red-700 bg-red-50 p-3 rounded">
            {formError}
          </div>
        )}

        {/* SUCCESS */}
        {success && (
          <div className="mb-4 text-sm text-green-800 bg-green-50 p-3 rounded">
            {success}
          </div>
        )}

        {/* FULL NAME */}
        <label className="block text-sm text-gray-700 mb-1">
          Full name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Your full name"
          />
        </label>
        {fieldErrors.name && (
          <p className="text-xs text-red-600 -mt-1 mb-2">{fieldErrors.name}</p>
        )}

        {/* EMAIL */}
        <label className="block text-sm text-gray-700 mb-1">
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="you@example.com"
          />
        </label>
        {fieldErrors.email && (
          <p className="text-xs text-red-600 -mt-1 mb-2">{fieldErrors.email}</p>
        )}

        {/* PASSWORD + CONFIRM PASSWORD */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <label className="block text-sm text-gray-700 mb-1">
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Create password"
            />
          </label>

          <label className="block text-sm text-gray-700 mb-1">
            Confirm
            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="mt-1 w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Re-enter"
            />
          </label>
        </div>

        {fieldErrors.password && (
          <p className="text-xs text-red-600 -mt-1 mb-2">{fieldErrors.password}</p>
        )}
        {fieldErrors.confirm && (
          <p className="text-xs text-red-600 -mt-1 mb-2">{fieldErrors.confirm}</p>
        )}

        {/* TERMS & CONDITIONS */}
        <div className="flex items-start gap-3 mt-3">
          <label className="inline-flex items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300"
            />
            <span>I agree to the <a href="#" className="text-black underline">Terms</a></span>
          </label>
        </div>
        {fieldErrors.agree && (
          <p className="text-xs text-red-600 mt-1">{fieldErrors.agree}</p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="mt-5 w-full py-3 bg-black text-white rounded-xl font-semibold hover:bg-gray-900 disabled:opacity-60"
        >
          {submitting ? "Creating..." : "Create account"}
        </button>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-black font-semibold">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
}
