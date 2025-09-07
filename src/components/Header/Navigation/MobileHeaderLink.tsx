"use client";
import { useState, MouseEvent } from "react";
import Link from "next/link";
import { MenuItem } from "@/types/menu";

type MobileHeaderLinkProps = React.HTMLAttributes<HTMLDivElement> & {
  item: MenuItem;
};

const MobileHeaderLink: React.FC<MobileHeaderLinkProps> = ({
  item,
  className,
  ...rest
}) => {
  const [submenuOpen, setSubmenuOpen] = useState(false);

  const handleToggle = (e: MouseEvent<HTMLAnchorElement>) => {
    if (item.submenu?.length) {
      e.preventDefault();
      setSubmenuOpen((s) => !s);
    }
  };

  return (
    <div className={`relative w-full ${className ?? ""}`} {...rest}>
      <Link
        href={item.href || "#"}
        onClick={handleToggle}
        className="flex items-center justify-between w-full py-2 text-muted focus:outline-none"
      >
        {item.label}
        {item.submenu && (
          <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m7 10l5 5l5-5" />
          </svg>
        )}
      </Link>

      {submenuOpen && item.submenu && (
        <div className="bg-white p-2 w-full">
          {item.submenu.map((subItem, index) => (
            <Link
              key={index}
              href={subItem.href || "#"}
              className="block py-2 text-gray-500 hover:bg-gray-200"
            >
              {subItem.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default MobileHeaderLink;
