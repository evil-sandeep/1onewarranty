// pages/AuthSuccess.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (!token) {
      // Try fragment (if you chose fragment)
      const frag = new URLSearchParams(window.location.hash.replace("#", ""));
      if (frag.get("token")) {
        const t = frag.get("token");
        localStorage.setItem("token", t);
        navigate("/");
        return;
      }
      // No token: show error
      navigate("/login?error=1");
      return;
    }

    // store token securely (localStorage or set cookie by backend)
    localStorage.setItem("token", token);

    // Optionally call backend to fetch profile or set in app state
    navigate("/"); // or wherever
  }, [navigate]);

  return <div className="p-8">Signing you in…</div>;
}
