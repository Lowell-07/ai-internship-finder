"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MaterialIcon } from "./MaterialIcon";

const navItems = [
  { href: "/discovery", icon: "home", label: "Home", filled: true },
  { href: "/saved", icon: "bookmark", label: "Saved", filled: false },
  { href: "/agents", icon: "smart_toy", label: "Agents", filled: false },
  { href: "/profile", icon: "person", label: "Profile", filled: false },
];

export function BottomNavBar() {
  const pathname = usePathname();

  if (pathname === "/") return null;

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-8 pb-6 pt-2 bg-surface shadow-bottombar rounded-t-xl border-t border-outline-variant">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center justify-center rounded-full px-6 py-1 transition-all duration-200 ${
              isActive
                ? "bg-secondary-container text-on-secondary-container scale-95"
                : "text-on-surface-variant hover:bg-surface-container-high"
            }`}
          >
            <MaterialIcon
              icon={item.icon}
              filled={isActive}
              className={isActive ? "text-on-secondary-container" : ""}
            />
            <span
              className={`text-label-sm font-label-sm ${
                isActive ? "font-bold" : ""
              }`}
            >
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
