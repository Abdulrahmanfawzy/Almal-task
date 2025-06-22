"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Heart, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { clearUser, setUser } from "@/store/userSlice";

const centerLinks = [
  { label: "Home", href: "/" },
  { label: "Weather", href: "/weather" },
  { label: "Events", href: "#" },
  { label: "About us", href: "#" },
  { label: "Gallery", href: "#" },
  { label: "Contact us", href: "#" },
];

const authLinks = [
  { label: "Login", href: "/signin" },
  { label: "Sign Up", href: "/signup" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  console.log(user);
  
  const getLinkClass = (href: string) => {
    return pathname === href ? 'text-[#373737]' : 'text-[#9A9A9A]';
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/auth/me');
        const data = await res.json();
        if (data.user) {
          dispatch(setUser(data.user));
        }
      } catch (err) {
        console.log(err);
        console.error('Error fetching user');
      }
    };

    fetchUser();
  }, [dispatch]);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      dispatch(clearUser()); 
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  return (
    <nav className="px-10 relative z-10 py-6">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold ">Almal.</div>

        <div className="hidden md:flex gap-6 text-gray-700 font-medium">
          {centerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`hover:text-[#373737] duration-300 ${getLinkClass(link.href)}`}>
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop Right Auth Links */}
        <div className="hidden md:flex gap-4 items-center">
          <div className="hidden md:flex gap-4 items-center">
            {user ? (
              <div className="flex items-center gap-4">
                <span
                  key="user-name"
                  className="text-blue-600 font-semibold text-md bg-blue-100 px-3 py-1 rounded"
                >
                  👋 {user?.name?.split(" ")[0]}
                </span>
                <Link href='favorites'
                  className="font-semibold text-md"
                >
                  <Heart className="w-4 h-4 text-black" />
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-red-600 border border-red-600 px-3 py-1 rounded hover:bg-red-100 ml-2"
                >
                  Logout
                </button>
              </div>
            ) : (
              authLinks.map((link) => {
                const isActive = pathname === link.href;
                const isSignup = link.label === 'Sign Up';

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={
                      isSignup
                        ? 'bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 ml-2'
                        : `${isActive ? 'text-[#373737]' : 'text-[#9A9A9A]'} hover:text-[#373737]`
                    }
                  >
                    {link.label}
                  </Link>
                );
              })
            )}
          </div>
        </div>


        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-4 space-y-4 px-4">
          {centerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block text-gray-700 hover:text-blue-600"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <hr />
          {user ? (
              <div>
                <span
                  key="user-name"
                  className="text-blue-600 font-semibold bg-blue-100 px-4 py-1 rounded"
                >
                  👋 {user.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-red-600 border border-red-600 px-3 py-1 rounded hover:bg-red-100 ml-2"
                >
                  Logout
                </button>
              </div>
            ) : (
              authLinks.map((link) => {
                const isActive = pathname === link.href;
                const isSignup = link.label === 'Sign Up';

                return (
                  <>
                    <Link
                      key={link.href}
                      href={link.href}
                      className={
                        isSignup
                          ? 'bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 ml-2'
                          : `${isActive ? 'text-[#373737]' : 'text-[#9A9A9A]'} hover:text-[#373737]`
                      }
                    >
                      {link.label}
                    </Link>
                  </>
                );
              })
            )}
          {/* {authLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block ${
                link.label === "Sign Up"
                  ? "bg-blue-600 text-white px-4 py-2 rounded text-center"
                  : "text-blue-600"
              }`}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))} */}
        </div>
      )}
    </nav>
  );
}
