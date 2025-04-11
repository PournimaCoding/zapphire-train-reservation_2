"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Navbar = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-purple-600 hover:text-purple-800 transition duration-300">
          🚄 Zapphire
        </Link>

        <div className="space-x-4">
          {isLoggedIn ? (
            <>
              <Link href="/seats" className="text-gray-700 hover:text-purple-600 font-medium transition duration-300">
                Seats
              </Link>
              <Link href="/dashboard" className="text-gray-700 hover:text-purple-600 font-medium transition duration-300">
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-1 rounded transition duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-gray-700 hover:text-purple-600 font-medium transition duration-300">
                Login
              </Link>
              <Link href="/signup" className="text-gray-700 hover:text-purple-600 font-medium transition duration-300">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
