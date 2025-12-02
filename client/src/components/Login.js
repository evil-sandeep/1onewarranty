// import React, { useState } from "react";
// import { Link } from "react-router-dom";

// export default function SimpleLogin({ onLogin }) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [remember, setRemember] = useState(false);

//   const [submitting, setSubmitting] = useState(false);
//   const [error, setError] = useState("");
//   const [emailError, setEmailError] = useState("");
//   const [passwordError, setPasswordError] = useState("");

//   // ---------------- VALIDATION ----------------
//   const validate = () => {
//     let ok = true;
//     setEmailError("");
//     setPasswordError("");

//     if (!email.trim()) {
//       setEmailError("Email is required");
//       ok = false;
//     } else if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
//       setEmailError("Enter a valid email address");
//       ok = false;
//     }

//     if (!password) {
//       setPasswordError("Password is required");
//       ok = false;
//     } else if (password.length < 6) {
//       setPasswordError("Password must be at least 6 characters");
//       ok = false;
//     }

//     return ok;
//   };

//   // ---------------- HANDLE SUBMIT (REAL BACKEND) ----------------
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     if (!validate()) return;

//     setSubmitting(true);

//     try {
//       const res = await fetch("http://localhost:5000/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password })
//       });

//       const data = await res.json();

//       if (!res.ok) throw new Error(data.message || "Login failed");

//       // Save token
//       if (onLogin) {
//         onLogin(data.token, data.user);
//       } else {
//         localStorage.setItem("token", data.token);
//       }

//       console.log("Login success:", data);

//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div style={styles.page}>
//       <form onSubmit={handleSubmit} style={styles.card} aria-labelledby="login-title">
//         <h1 id="login-title" style={styles.title}>Sign in</h1>

//         {error && <div role="alert" style={styles.formError}>{error}</div>}

//         <label style={styles.label}>
//           Email
//           <input
//             name="email"
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             style={styles.input}
//             placeholder="you@example.com"
//             autoComplete="email"
//           />
//         </label>
//         {emailError && <div style={styles.fieldError}>{emailError}</div>}

//         <label style={styles.label}>
//           Password
//           <input
//             name="password"
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             style={styles.input}
//             placeholder="••••••"
//             autoComplete="current-password"
//           />
//         </label>
//         {passwordError && <div style={styles.fieldError}>{passwordError}</div>}

//         <div style={styles.row}>
//           <label style={styles.checkboxLabel}>
//             <input
//               type="checkbox"
//               checked={remember}
//               onChange={(e) => setRemember(e.target.checked)}
//               style={styles.checkbox}
//             />
//             Remember me
//           </label>

//           <button
//             type="button"
//             onClick={() => alert("Forgot password flow (implement)")}
//             style={styles.linkButton}
//           >
//             Forgot?
//           </button>
//         </div>

//         <button
//           type="submit"
//           disabled={submitting}
//           style={{ ...styles.primaryButton, opacity: submitting ? 0.7 : 1 }}
//         >
//           {submitting ? "Signing in..." : "Sign in"}
//         </button>

//         <p style={styles.bottomText}>
//           Don’t have an account?{" "}
//           <Link to="/signup" style={{ color: "#111827", fontWeight: 600 }}>
//             Sign up
//           </Link>
//         </p>
//       </form>
//     </div>
//   );
// }

// // ---------------- STYLES ----------------
// const styles = {
//   page: {
//     minHeight: "100vh",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     background: "#f6f7fb",
//     padding: 20,
//   },
//   card: {
//     width: "100%",
//     maxWidth: 440,
//     background: "#fff",
//     borderRadius: 12,
//     padding: "28px 24px",
//     boxShadow: "0 8px 30px rgba(13, 26, 38, 0.08)",
//   },
//   title: { margin: 0, marginBottom: 16, fontSize: 24, fontWeight: 600 },
//   label: { display: "block", fontSize: 13, marginBottom: 6, marginTop: 12 },
//   input: {
//     width: "100%",
//     padding: "10px 12px",
//     borderRadius: 8,
//     border: "1px solid #e6e8ee",
//     marginTop: 6,
//     fontSize: 14,
//   },
//   fieldError: { color: "#b91c1c", fontSize: 13, marginTop: 6 },
//   formError: {
//     background: "#fee2e2",
//     color: "#7f1d1d",
//     padding: "8px 12px",
//     borderRadius: 8,
//     marginBottom: 8,
//   },
//   row: { display: "flex", justifyContent: "space-between", marginTop: 12 },
//   checkboxLabel: { display: "flex", gap: 8, alignItems: "center", fontSize: 14 },
//   checkbox: { width: 16, height: 16 },
//   linkButton: {
//     background: "transparent",
//     border: "none",
//     color: "#2563eb",
//     cursor: "pointer",
//     fontSize: 14,
//   },
//   primaryButton: {
//     width: "100%",
//     marginTop: 18,
//     padding: "12px 14px",
//     borderRadius: 10,
//     background: "#111827",
//     color: "#fff",
//     fontWeight: 600,
//   },
//   bottomText: { marginTop: 14, fontSize: 13, textAlign: "center" },
// };


import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Login failed");

      // save token and user in context (and localStorage via context)
      login(data.token, data.user || { email: form.email });

      // redirect to where the user wanted to go
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <form onSubmit={submit} className="w-full max-w-md bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4 text-center">Sign in</h2>

        {error && <div className="mb-3 text-sm text-red-600">{error}</div>}

        <input
          name="email"
          value={form.email}
          onChange={update}
          placeholder="Email"
          className="w-full px-3 py-2 mb-3 border rounded"
        />
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={update}
          placeholder="Password"
          className="w-full px-3 py-2 mb-3 border rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-black text-white rounded"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>

        <p className="mt-4 text-center text-sm">
          Don't have an account? <Link to="/signup" className="text-black font-medium">Sign up</Link>
        </p>
      </form>
    </div>
  );
}
