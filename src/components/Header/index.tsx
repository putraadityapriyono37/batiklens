"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { headerData } from "./Navigation/menuData";
import Logo from "./Logo";
import HeaderLink from "./Navigation/HeaderLink";
import MobileHeaderLink from "./Navigation/MobileHeaderLink";
import { supabase } from "@/lib/supabaseClient";
import { User } from "@supabase/supabase-js";

const Header: React.FC = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [sticky, setSticky] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Ambil session awal
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };
    getSession();

    // Listener perubahan auth
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth event:", event);

        if (event === "PASSWORD_RECOVERY") {
          // 🚀 Saat klik link reset password → arahkan ke halaman update
          setUser(session?.user ?? null);
          router.push("/update-password");
          return;
        }

        if (event === "SIGNED_IN") {
          // ✅ Cegah redirect ke home jika sedang di update-password
          if (window.location.pathname !== "/update-password") {
            router.push("/");
          }
        }

        if (event === "SIGNED_OUT") {
          router.push("/login");
        }

        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, [router]);

  useEffect(() => {
    const handleScroll = () => setSticky(window.scrollY >= 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  const displayName =
    user?.user_metadata?.full_name ??
    user?.email?.split("@")[0] ??
    "User";

  return (
    <header
      className={`fixed top-0 z-40 w-full transition-all duration-300 ${
        sticky
          ? "shadow-lg bg-[#D7AA83] text-black pt-5"
          : "shadow-none md:pt-14 pt-5"
      }`}
    >
      <div className="lg:py-0 py-2">
        <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md flex items-center justify-between px-4">
          <Logo isSticky={sticky} />

          {/* Desktop Menu */}
          <nav className="hidden lg:flex flex-grow items-center gap-8 justify-center">
            {headerData.map((item, index) => (
              <HeaderLink key={index} item={item} />
            ))}
          </nav>

          {/* Desktop User/Login */}
          <div className="flex items-center gap-4">
            {user ? (
              <div className="hidden lg:flex items-center gap-4">
                <span className="font-semibold text-sm">
                  Halo, {displayName}
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors text-sm"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="hidden lg:block bg-transparent text-primary border hover:bg-primary border-primary hover:text-darkmode px-4 py-2 rounded-lg transition-colors"
              >
                Sign In
              </Link>
            )}

            {/* Mobile Toggle Button */}
            <button
              onClick={() => setNavbarOpen(!navbarOpen)}
              className="block lg:hidden p-2 rounded-lg"
              aria-label="Toggle mobile menu"
            >
              <span className="block w-6 h-0.5 bg-black"></span>
              <span className="block w-6 h-0.5 bg-black mt-1.5"></span>
              <span className="block w-6 h-0.5 bg-black mt-1.5"></span>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        <div
          className={`lg:hidden fixed top-0 right-0 h-full w-full bg-gray-900 text-white shadow-lg transform transition-transform duration-300 ease-in-out max-w-xs ${
            navbarOpen ? "translate-x-0" : "translate-x-full"
          } z-50`}
        >
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <Logo isSticky={true} />
            <button
              onClick={() => setNavbarOpen(false)}
              className="p-2"
              aria-label="Close menu Modal"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>

          <nav className="flex flex-col p-4 space-y-2">
            {headerData.map((item, index) => (
              <MobileHeaderLink
                key={index}
                item={item}
                className="w-full px-3 py-2 rounded-md hover:bg-gray-700 transition-colors"
              />
            ))}

            {/* Mobile User/Login */}
            <div className="mt-6 border-t border-gray-700 pt-4">
              {user ? (
                <div className="text-center">
                  <p className="px-4 py-2 text-gray-400">
                    Halo, {displayName}
                  </p>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-center bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors mt-2"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="block w-full text-center border border-primary text-primary px-4 py-2 rounded-lg hover:bg-primary hover:text-darkmode transition-colors"
                  onClick={() => setNavbarOpen(false)}
                >
                  Sign In
                </Link>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;