import React, { useState } from "react";
import {Link} from  'react-router-dom'

/**
 * SimpleLogin component
 * Props:
 *  - onLogin: async function({ email, password, remember }) => { ... }  // optional
 */
export default function SimpleLogin({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validate = () => {
    let ok = true;
    setEmailError("");
    setPasswordError("");

    if (!email.trim()) {
      setEmailError("Email is required");
      ok = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      setEmailError("Enter a valid email address");
      ok = false;
    }

    if (!password) {
      setPasswordError("Password is required");
      ok = false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      ok = false;
    }

    return ok;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!validate()) return;

    setSubmitting(true);
    try {
      if (onLogin) {
        // user-provided handler (recommended)
        await onLogin({ email: email.trim(), password, remember });
      } else {
        // fallback: example fake request (replace with real API call)
        await fakeRequest({ email: email.trim(), password, remember });
        // you can redirect or show success here
        console.log("Logged in (fake):", email, remember);
      }
    } catch (err) {
      console.error(err);
      setError(err?.message || "Login failed. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={styles.page}>
      <form onSubmit={handleSubmit} style={styles.card} aria-labelledby="login-title">
        <h1 id="login-title" style={styles.title}>Sign in</h1>

        {error && <div role="alert" style={styles.formError}>{error}</div>}

        <label style={styles.label}>
          Email
          <input
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            placeholder="you@example.com"
            aria-invalid={!!emailError}
            aria-describedby={emailError ? "email-error" : undefined}
            autoComplete="email"
          />
        </label>
        {emailError && <div id="email-error" style={styles.fieldError}>{emailError}</div>}

        <label style={styles.label}>
          Password
          <input
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            placeholder="••••••"
            aria-invalid={!!passwordError}
            aria-describedby={passwordError ? "password-error" : undefined}
            autoComplete="current-password"
          />
        </label>
        {passwordError && <div id="password-error" style={styles.fieldError}>{passwordError}</div>}

        <div style={styles.row}>
          <label style={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              style={styles.checkbox}
            />
            Remember me
          </label>

          <button
            type="button"
            onClick={() => alert("Forgot password flow (implement)")}
            style={styles.linkButton}
          >
            Forgot?
          </button>
        </div>

        <button
          type="submit"
          disabled={submitting}
          style={{ ...styles.primaryButton, opacity: submitting ? 0.7 : 1 }}
        >
          {submitting ? "Signing in..." : "Sign in"}
        </button>

        <div style={styles.dividerRow}>
          <div style={styles.line} /> <div style={styles.or}>or</div> <div style={styles.line} />
        </div>

        <div style={styles.socialRow}>
          <button type="button" style={styles.ghostButton} onClick={() => alert("Sign in with Google")}>
            Sign in with Google
          </button>
          <button type="button" style={styles.ghostButton} onClick={() => alert("Sign in with Facebook")}>
            Sign in with Facebook
          </button>
        </div>

        <p style={styles.bottomText}>
          Don't have an account?{' '}
          <Link to='/signup'> 
            Sign up
         
          </Link>
        </p>
      </form>
    </div>
  );
}

/* Simple fake request to simulate network delay */
function fakeRequest() {
  return new Promise((res) => setTimeout(res, 700));
}

/* Inline styles (keeps component self-contained & avoids external CSS) */
const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#f6f7fb',
    padding: 20,
    boxSizing: 'border-box',
  },
  card: {
    width: '100%',
    maxWidth: 440,
    background: '#ffffff',
    borderRadius: 12,
    padding: '28px 24px',
    boxShadow: '0 8px 30px rgba(13, 26, 38, 0.08)',
    boxSizing: 'border-box',
  },
  title: {
    margin: 0,
    marginBottom: 16,
    fontSize: 24,
    fontWeight: 600,
    color: '#0f1724',
  },
  label: {
    display: 'block',
    fontSize: 13,
    color: '#111827',
    marginBottom: 6,
    marginTop: 12,
  },
  input: {
    width: '100%',
    padding: '10px 12px',
    borderRadius: 8,
    border: '1px solid #e6e8ee',
    marginTop: 6,
    boxSizing: 'border-box',
    fontSize: 14,
    outline: 'none',
    background: '#fff',
  },
  fieldError: {
    color: '#b91c1c',
    fontSize: 13,
    marginTop: 6,
  },
  formError: {
    background: '#fee2e2',
    color: '#7f1d1d',
    padding: '8px 12px',
    borderRadius: 8,
    marginBottom: 8,
    fontSize: 14,
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  checkboxLabel: {
    display: 'flex',
    gap: 8,
    alignItems: 'center',
    fontSize: 14,
    color: '#374151',
  },
  checkbox: {
    width: 16,
    height: 16,
  },
  linkButton: {
    background: 'transparent',
    border: 'none',
    color: '#2563eb',
    cursor: 'pointer',
    fontSize: 14,
  },
  primaryButton: {
    width: '100%',
    marginTop: 18,
    padding: '12px 14px',
    borderRadius: 10,
    border: 'none',
    cursor: 'pointer',
    background: '#111827',
    color: '#fff',
    fontSize: 15,
    fontWeight: 600,
  },
  dividerRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    marginTop: 18,
  },
  line: {
    flex: 1,
    height: 1,
    background: '#e6e8ee',
  },
  or: {
    fontSize: 13,
    color: '#6b7280',
  },
  socialRow: {
    display: 'flex',
    gap: 10,
    marginTop: 12,
    flexWrap: 'wrap',
  },
  ghostButton: {
    flex: 1,
    padding: '10px 12px',
    background: '#fff',
    border: '1px solid #e6e8ee',
    borderRadius: 8,
    cursor: 'pointer',
    fontSize: 14,
  },
  bottomText: {
    marginTop: 14,
    fontSize: 13,
    color: '#6b7280',
    textAlign: 'center',
  },
  link: {
    color: '#111827',
    fontWeight: 600,
    textDecoration: 'none',
  },
};
