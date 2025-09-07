"use client";
import { useState } from "react";
import Link from "next/link";
import { MenuItem } from "@/types/menu"; // <-- Menggunakan tipe kita
import { usePathname } from "next/navigation";

const HeaderLink: React.FC<{ item: MenuItem }> = ({ item }) => {
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const path = usePathname();
  const handleMouseEnter = () => {
    if (item.submenu) {
      setSubmenuOpen(true);
    }
  };
  const handleMouseLeave = () => {
    setSubmenuOpen(false);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        href={item.href || "#"} // <-- Perbaikan: beri fallback '#' jika href tidak ada
        className={`text-17 flex font-medium hover:text-primary capitalized ${
          path === item.href ? "text-primary " : " text-black dark:text-white "
        }`}
      >
        {item.label}
        {item.submenu && (
          <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m7 10l5 5l5-5" /></svg>
        )}
      </Link>
      {submenuOpen && (
        <div className={`absolute py-2 left-0 mt-0.5 w-60 bg-[#D7AA80] white dark:bg-darklight dark:text-white shadow-lg rounded-lg`}>
          {item.submenu?.map((subItem, index) => (
            <Link
              key={index}
              href={subItem.href || "#"}
              className={`block px-4 py-2 ${
                path === subItem.href
                  ? "bg-primary text-black"
                  : "text-white black dark:text-white hover:bg-primary"
              }`}
            >
              {subItem.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default HeaderLink;