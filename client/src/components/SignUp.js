// src/components/SignUp.jsx
import React, { useState } from "react";
import {Link} from 'react-router-dom'

/**
 * SignUp component
 * Props:
 *  - onSignup: async ({ name, email, password }) => {}  // optional, perform API call
 */
export default function SignUp({ onSignup }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [agree, setAgree] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [success, setSuccess] = useState("");


  const validate = () => {
    const errors = {};
    if (!name.trim()) errors.name = "Full name is required";
    if (!email.trim()) errors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(email.trim())) errors.email = "Enter a valid email";
    if (!password) errors.password = "Password is required";
    else if (password.length < 6) errors.password = "Password must be at least 6 characters";
    if (password !== confirm) errors.confirm = "Passwords do not match";
    if (!agree) errors.agree = "You must agree to the terms";
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setSuccess("");

    if (!validate()) return;

    setSubmitting(true);
    try {
      const payload = { name: name.trim(), email: email.trim(), password };

      if (onSignup) {
        await onSignup(payload);
      } else {
        // fallback fake request: replace with real API call
        await fakeRequest(payload);
      }

      setSuccess("Account created successfully!");
      setName("");
      setEmail("");
      setPassword("");
      setConfirm("");
      setAgree(false);
      setFieldErrors({});
      setTimeout(() => setSuccess(""), 3500);
    } catch (err) {
      console.error(err);
      setFormError(err?.message || "Signup failed. Try again.");
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

        {formError && (
          <div role="alert" className="mb-4 text-sm text-red-700 bg-red-50 p-3 rounded">
            {formError}
          </div>
        )}

        {success && (
          <div role="status" className="mb-4 text-sm text-green-800 bg-green-50 p-3 rounded">
            {success}
          </div>
        )}

        <label className="block text-sm text-gray-700 mb-1">
          Full name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Your full name"
            aria-invalid={!!fieldErrors.name}
            aria-describedby={fieldErrors.name ? "err-name" : undefined}
          />
        </label>
        {fieldErrors.name && <div id="err-name" className="text-xs text-red-600 mb-2">{fieldErrors.name}</div>}

        <label className="block text-sm text-gray-700 mb-1">
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="you@example.com"
            aria-invalid={!!fieldErrors.email}
            aria-describedby={fieldErrors.email ? "err-email" : undefined}
          />
        </label>
        {fieldErrors.email && <div id="err-email" className="text-xs text-red-600 mb-2">{fieldErrors.email}</div>}

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <label className="block text-sm text-gray-700 mb-1">
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Create a password"
              aria-invalid={!!fieldErrors.password}
              aria-describedby={fieldErrors.password ? "err-pass" : undefined}
            />
          </label>
          <label className="block text-sm text-gray-700 mb-1">
            Confirm
            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="mt-1 w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Re-enter password"
              aria-invalid={!!fieldErrors.confirm}
              aria-describedby={fieldErrors.confirm ? "err-confirm" : undefined}
            />
          </label>
        </div>
        {fieldErrors.password && <div id="err-pass" className="text-xs text-red-600 mb-2">{fieldErrors.password}</div>}
        {fieldErrors.confirm && <div id="err-confirm" className="text-xs text-red-600 mb-2">{fieldErrors.confirm}</div>}

        <div className="flex items-start gap-3 mt-2">
          <label className="inline-flex items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 focus:ring-black"
            />
            <span className="text-sm">I agree to the <a href="#" className="text-black underline">Terms</a></span>
          </label>
        </div>
        {fieldErrors.agree && <div className="text-xs text-red-600 mb-2">{fieldErrors.agree}</div>}

        <button
          type="submit"
          disabled={submitting}
          className="mt-4 w-full py-3 bg-black text-white rounded-xl font-semibold hover:bg-gray-900 disabled:opacity-60"
        >
          {submitting ? "Creating..." : "Create account"}
        </button>

        <div className="mt-4 text-center text-sm text-gray-600">
          Already have an account? <Link to='/login'>Sign in</Link> 
        </div>
      </form>
    </div>
  );
}

/* Small fake request for demo fallback */
function fakeRequest() {
  return new Promise((res) => setTimeout(res, 700));
}
