// ContactMe.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

/**
 * Contact form (Tailwind)
 * - Expects backend at `${API_BASE}/contact`
 * - API_BASE default is http://localhost:5000 but prefer REACT_APP_API_URL
 */
export default function ContactMe({ endpoint = "/contact", banner = null }) {
  const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState(null); // { type: 'success'|'error'|'info', text }

  useEffect(() => {
    if (!status) return;
    const t = setTimeout(() => setStatus(null), 3500);
    return () => clearTimeout(t);
  }, [status]);

  const validate = () => {
    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus({ type: "error", text: "Please fill name, email and message." });
      return false;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.trim())) {
      setStatus({ type: "error", text: "Enter a valid email address." });
      return false;
    }
    return true;
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setMessage("");
  };

  const submitForm = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSending(true);
    setStatus({ type: "info", text: "Sending..." });

    try {
      const res = await axios.post(`${API_BASE}${endpoint}`, {
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
      });

      const msg = res?.data?.msg || "Message sent.";
      if (res?.status === 200) {
        setStatus({ type: "success", text: msg });
        resetForm();
      } else {
        setStatus({ type: "error", text: msg });
      }
    } catch (err) {
      const errMsg =
        err?.response?.data?.msg ||
        err?.message ||
        "Unable to send message. Please try again later.";
      setStatus({ type: "error", text: errMsg });
      // console.error("Contact form error:", err);
    } finally {
      setIsSending(false);
    }
  };

  const Spinner = () => (
    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" opacity="0.2" />
      <path d="M22 12a10 10 0 00-10-10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );

  const Plane = () => (
    <svg className="w-4 h-4 -rotate-45" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M2 21l21-9L2 11l6 4-6 6z" fill="currentColor" />
    </svg>
  );

  return (
    <div className="max-w-lg mx-auto p-6">
      {status && (
        <div
          role="status"
          className={`fixed right-6 top-6 z-50 rounded-xl px-4 py-2 shadow-md flex items-center gap-3
            ${status.type === "success" ? "bg-emerald-600 text-white"
              : status.type === "error" ? "bg-rose-600 text-white" : "bg-slate-800 text-white"}`}
        >
          {status.type === "info" ? (
            <Spinner />
          ) : status.type === "success" ? (
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" aria-hidden="true">
              <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" aria-hidden="true">
              <path d="M12 9v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M12 17h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          )}
          <div className="text-sm">{status.text}</div>
        </div>
      )}

      <div className="bg-white/95 backdrop-blur-sm border border-slate-100 rounded-2xl shadow-md p-6">
        {banner ? <div className="text-sm text-slate-500 mb-3 text-center">{banner}</div> : null}
        <h2 className="text-xl font-semibold text-slate-900 mb-4">Contact</h2>

        <form onSubmit={submitForm} className="space-y-4" noValidate>
          <label className="block">
            <span className="text-xs text-slate-500 mb-2 block">Name</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isSending}
              autoComplete="name"
              required
              placeholder="Your name"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-200"
            />
          </label>

          <label className="block">
            <span className="text-xs text-slate-500 mb-2 block">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSending}
              autoComplete="email"
              required
              placeholder="you@domain.com"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-200"
            />
          </label>

          <label className="block">
            <span className="text-xs text-slate-500 mb-2 block">Message</span>
            <textarea
              rows="5"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={isSending}
              required
              placeholder="Write your message..."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-200 resize-y"
            />
          </label>

          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={isSending}
              className={`inline-flex items-center gap-3 px-5 py-3 rounded-2xl text-sm font-semibold shadow-md
                ${isSending ? "bg-slate-200 text-slate-700 cursor-wait" : "bg-sky-600 text-white hover:bg-sky-700"}`}
              aria-busy={isSending}
            >
              {isSending ? (
                <>
                  <Spinner />
                  <span>Sending</span>
                </>
              ) : (
                <>
                  <span>Send</span>
                  <Plane />
                </>
              )}
            </button>

            <div className="text-sm text-slate-500">We reply within 1–2 business days</div>
          </div>
        </form>
      </div>
    </div>
  );
}
