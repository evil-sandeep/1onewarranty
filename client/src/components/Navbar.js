// src/components/Navbar.jsx
import React, { useContext, useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/feviconn.png";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  const handleLogout = () => {
    logout();
    setProfileOpen(false);
    navigate("/login", { replace: true });
  };

  return (
    <header className="w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* FLEX ROW */}
        <div className="flex items-center justify-between h-16">

          {/* LEFT — LOGO */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-3">
              <img
                src={logo}
                alt="OneWarranty"
                className="h-10 w-10 rounded-md object-cover"
              />
              <div className="hidden sm:block leading-tight">
                <div className="text-lg font-semibold tracking-tight text-gray-900">
                  OneWarranty
                </div>
                <div className="text-xs text-gray-500">Genuine product support</div>
              </div>
            </Link>
          </div>

          {/* CENTER — NAV LINKS (Desktop only) */}
          <nav className="hidden md:flex items-center gap-6 mx-auto">
            <Link to="/" className="text-sm text-gray-800 hover:text-black transition">Home</Link>
            <Link to="/warrantyCheck" className="text-sm text-gray-800 hover:text-black transition">Warranty Check</Link>
            <Link to="/warrantyForm" className="text-sm text-gray-800 hover:text-black transition">Add Warranty</Link>
          </nav>

          {/* RIGHT — Mobile Button + Profile/Login */}
          <div className="flex items-center gap-4">

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileOpen((s) => !s)}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none"
              aria-expanded={mobileOpen}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>

            {/* LOGIN / PROFILE */}
            {!user ? (
              <Link
                to="/login"
                className="hidden md:inline-flex items-center px-4 py-2 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-900"
              >
                Login
              </Link>
            ) : (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setProfileOpen((s) => !s)}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gray-100 hover:shadow-md transition"
                >
                  <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-sm font-medium text-gray-800">
                    {user.name?.charAt(0).toUpperCase() ||
                      user.email?.charAt(0).toUpperCase()}
                  </div>
                  <div className="hidden sm:flex flex-col text-left">
                    <span className="text-sm text-gray-900">{user.name || user.email}</span>
                    <span className="text-xs text-gray-500">Account</span>
                  </div>
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-3 w-48 bg-white border border-gray-100 rounded-xl shadow-lg py-2 z-50">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-50"
                      onClick={() => setProfileOpen(false)}
                    >
                      Profile
                    </Link>

                    <Link
                      to="/my-warranties"
                      className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-50"
                      onClick={() => setProfileOpen(false)}
                    >
                      My Warranties
                    </Link>

                    <div className="border-t border-gray-100 my-1" />

                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}

          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <div className="px-4 pt-3 pb-4 space-y-2">
            <Link to="/" className="block px-2 py-2 rounded text-gray-800 hover:bg-gray-50">Home</Link>
            <Link to="/warrantyCheck" className="block px-2 py-2 rounded text-gray-800 hover:bg-gray-50">Warranty Check</Link>
            <Link to="/warrantyForm" className="block px-2 py-2 rounded text-gray-800 hover:bg-gray-50">Add Warranty</Link>

            <div className="pt-2">
              {!user ? (
                <Link to="/login" className="block w-full text-center px-3 py-2 bg-black text-white rounded-full">Login</Link>
              ) : (
                <>
                  <div className="flex items-center gap-3 px-2 py-2">
                    <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-sm">
                      {user.name?.charAt(0).toUpperCase() ||
                        user.email?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{user.name || user.email}</div>
                      <div className="text-xs text-gray-500">Account</div>
                    </div>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-2 py-2 mt-2 text-red-600"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
