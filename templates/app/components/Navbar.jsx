"use client";

import { useState } from "react";
import Link from "next/link";

/**
 * Giga Bot — Navbar Component
 * Gignaati Black & White Brand Theme
 */
export default function Navbar({ user }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 no-underline" aria-label="Giga Bot Home">
        <div
          className="flex items-center justify-center rounded-full bg-black text-white font-bold"
          style={{ width: 36, height: 36, fontSize: 14, letterSpacing: "-0.05em" }}
          aria-hidden="true"
        >
          GB
        </div>
        <div className="flex flex-col leading-tight">
          <span className="font-bold text-black text-sm leading-none">Giga Bot</span>
          <span className="text-gray-400 text-xs leading-none">by Gignaati</span>
        </div>
      </Link>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-6">
        <Link href="/" className="text-sm font-medium text-gray-600 hover:text-black no-underline transition-colors">
          Home
        </Link>
        <Link href="/chat" className="text-sm font-medium text-gray-600 hover:text-black no-underline transition-colors">
          Chat
        </Link>
        <Link href="/jobs" className="text-sm font-medium text-gray-600 hover:text-black no-underline transition-colors">
          Jobs
        </Link>
        <Link href="/settings" className="text-sm font-medium text-gray-600 hover:text-black no-underline transition-colors">
          Settings
        </Link>
        <a
          href="https://www.gignaati.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-gray-600 hover:text-black no-underline transition-colors"
        >
          Gignaati ↗
        </a>
      </div>

      {/* Right: User / CTA */}
      <div className="hidden md:flex items-center gap-3">
        {user ? (
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">{user.name || user.email}</span>
            <Link href="/api/auth/signout" className="btn-secondary text-sm py-2 px-4">
              Sign Out
            </Link>
          </div>
        ) : (
          <Link href="/api/auth/signin" className="btn-primary text-sm py-2 px-4">
            Sign In
          </Link>
        )}
      </div>

      {/* Mobile Hamburger */}
      <button
        className="md:hidden flex flex-col gap-1.5 p-2 rounded"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
      >
        <span className={`block w-5 h-0.5 bg-black transition-transform ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
        <span className={`block w-5 h-0.5 bg-black transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
        <span className={`block w-5 h-0.5 bg-black transition-transform ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white border-b border-gray-200 shadow-lg md:hidden z-50">
          <div className="flex flex-col p-4 gap-4">
            <Link href="/" className="text-sm font-medium text-gray-700 hover:text-black no-underline" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link href="/chat" className="text-sm font-medium text-gray-700 hover:text-black no-underline" onClick={() => setMenuOpen(false)}>Chat</Link>
            <Link href="/jobs" className="text-sm font-medium text-gray-700 hover:text-black no-underline" onClick={() => setMenuOpen(false)}>Jobs</Link>
            <Link href="/settings" className="text-sm font-medium text-gray-700 hover:text-black no-underline" onClick={() => setMenuOpen(false)}>Settings</Link>
            <a href="https://www.gignaati.com" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-gray-700 hover:text-black no-underline">Gignaati ↗</a>
            <hr className="border-gray-200" />
            {user ? (
              <Link href="/api/auth/signout" className="btn-secondary text-sm text-center" onClick={() => setMenuOpen(false)}>Sign Out</Link>
            ) : (
              <Link href="/api/auth/signin" className="btn-primary text-sm text-center" onClick={() => setMenuOpen(false)}>Sign In</Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
