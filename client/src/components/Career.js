// Career.jsx — macOS-style UI + resume upload
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function Career({ endpoint = "/career", banner = null }) {
  const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [resume, setResume] = useState(null); // file
  const [isSending, setIsSending] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState(null); // { type, text }
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!status) return;
    const t = setTimeout(() => setStatus(null), 3500);
    return () => clearTimeout(t);
  }, [status]);

  const humanSize = (n) => {
    if (!n) return "";
    if (n < 1024) return `${n} B`;
    if (n < 1024 ** 2) return `${(n / 1024).toFixed(1)} KB`;
    return `${(n / 1024 ** 2).toFixed(2)} MB`;
  };

  const validate = () => {
    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus({ type: "error", text: "Please fill name, email and message." });
      return false;
    }
    if (!resume) {
      setStatus({ type: "error", text: "Please attach your resume." });
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
    setResume(null);
    setProgress(0);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const submitForm = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSending(true);
    setStatus({ type: "info", text: "Sending..." });
    setProgress(0);

    try {
      const formData = new FormData();
      formData.append("name", name.trim());
      formData.append("email", email.trim());
      formData.append("message", message.trim());
      formData.append("resume", resume);

      const res = await axios.post(`${API_BASE}${endpoint}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (ev) => {
          if (ev.total) {
            const pct = Math.round((ev.loaded * 100) / ev.total);
            setProgress(pct);
          }
        },
        timeout: 120000,
      });

      const msg = res?.data?.msg || "Application sent.";
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
        "Unable to send application. Please try again later.";
      setStatus({ type: "error", text: errMsg });
      console.error("Career submit error:", err);
    } finally {
      setIsSending(false);
      setProgress(0);
    }
  };

  const onFileChange = (e) => {
    const f = e.target.files && e.target.files[0];
    if (!f) {
      setResume(null);
      return;
    }
    setResume(f);
  };

  const removeFile = () => {
    setResume(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const TrafficLights = () => (
    <div className="flex items-center gap-2">
      <span className="w-3.5 h-3.5 rounded-full bg-blue-900 shadow-inner" />
      
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-6">
      {/* Status toast */}
      {status && (
        <div
          role="status"
          className={`fixed right-6 top-6 z-50 rounded-xl px-4 py-2 shadow-lg flex items-center gap-3 transform-gpu
            ${status.type === "success" ? "bg-emerald-600 text-white"
              : status.type === "error" ? "bg-rose-600 text-white" : "bg-slate-800 text-white"}`}
        >
          {status.type === "info" ? (
            <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" opacity="0.2" />
              <path d="M22 12a10 10 0 00-10-10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            </svg>
          ) : null}
          <div className="text-sm">{status.text}</div>
        </div>
      )}

      {/* Mac-like card */}
      <div className="w-full max-w-2xl">
        <div className="rounded-2xl bg-white/60 backdrop-blur-md border border-gray-200 shadow-2xl overflow-hidden">
          {/* Top bar (mac window) */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <TrafficLights />
              <div className="ml-2 text-sm font-medium text-gray-700">Career Application</div>
            </div>
            <div className="text-xs text-gray-500">Resume upload</div>
          </div>

          {/* Content */}
          <div className="p-8">
            {banner && <div className="text-sm text-gray-500 mb-4 text-center">{banner}</div>}

            <form onSubmit={submitForm} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="block">
                  <div className="text-xs text-gray-500 mb-2">Full name</div>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={isSending}
                    placeholder="Your full name"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
                    required
                  />
                </label>

                <label className="block">
                  <div className="text-xs text-gray-500 mb-2">Email</div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isSending}
                    placeholder="you@domain.com"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
                    required
                  />
                </label>
              </div>

              <label className="block">
                <div className="text-xs text-gray-500 mb-2">Message</div>
                <textarea
                  rows="5"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  disabled={isSending}
                  placeholder="A short note to the hiring team..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-200 resize-y"
                  required
                />
              </label>

              {/* File upload area (mac-like minimal) */}
              <div>
                <div className="text-xs text-gray-500 mb-2">Resume (PDF / DOC / DOCX — max 5MB)</div>

                <div className="flex items-center gap-4">
                  <label
                    htmlFor="resume"
                    className="inline-flex items-center gap-3 cursor-pointer px-4 py-2 rounded-xl border border-dashed border-gray-200 bg-white shadow-sm hover:bg-gray-50"
                  >
                    <svg className="w-5 h-5 text-gray-500" viewBox="0 0 24 24" fill="none">
                      <path d="M12 3v12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M7 10l5-5 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-sm text-gray-700">Choose file</span>
                    <input
                      id="resume"
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={onFileChange}
                      disabled={isSending}
                      className="hidden"
                    />
                  </label>

                  {/* Selected file chip */}
                  {resume ? (
                    <div className="flex items-center gap-3 px-3 py-2 rounded-full bg-gray-50 border border-gray-100">
                      <div className="text-sm text-gray-800">{resume.name}</div>
                      <div className="text-xs text-gray-400">({humanSize(resume.size)})</div>
                      <button
                        type="button"
                        onClick={removeFile}
                        disabled={isSending}
                        className="ml-2 text-xs text-gray-500 hover:text-gray-700"
                        title="Remove file"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <div className="text-sm text-gray-400">No file chosen</div>
                  )}
                </div>

                {/* file validation / info */}
                <div className="mt-2 text-xs text-gray-400">Only PDF, DOC, DOCX — keep it concise.</div>
              </div>

              {/* Upload progress */}
              {isSending && (
                <div className="mt-2">
                  <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                    <div className="h-2 rounded-full bg-gray-800 transition-all" style={{ width: `${progress}%` }} />
                  </div>
                  <div className="text-xs text-gray-500 mt-2">{progress}%</div>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-between">
                <div className="text-xs text-gray-500">We will only use your data for recruitment.</div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={resetForm}
                    disabled={isSending}
                    className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-sm text-gray-700"
                  >
                    Reset
                  </button>

                  <button
                    type="submit"
                    disabled={isSending}
                    className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-gray-900 text-white text-sm font-semibold shadow"
                  >
                    {isSending ? (
                      <>
                        <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" opacity="0.2" />
                          <path d="M22 12a10 10 0 00-10-10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                        </svg>
                        <span>Sending</span>
                      </>
                    ) : (
                      <>
                        <span>Send Application</span>
                        <svg className="w-4 h-4 -rotate-45" viewBox="0 0 24 24" fill="none">
                          <path d="M2 21l21-9L2 11l6 4-6 6z" fill="currentColor" />
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Subtle footer */}
          <div className="px-6 py-3 border-t border-gray-100 text-xs text-gray-400 text-center">
            By submitting you agree to our privacy policy.
          </div>
        </div>
      </div>
    </div>
  );
}
