// components/GoogleSignInButton.jsx
import React from "react";

export default function GoogleSignInButton({ label = "Sign in with Google", className = "" }) {
  const goto = () => {
    // This will open the backend route that starts OAuth
    window.location.href = "/auth/google"; // if backend mounted at root
    // If backend mounted at /api use: window.location.href = "/api/auth/google";
  };

  return (
    <button
      onClick={goto}
      className={`inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white border shadow-sm text-sm ${className}`}
    >
      <img src="/google-g-ico.svg" alt="Google" className="w-5 h-5" />
      <span>{label}</span>
    </button>
  );
}
