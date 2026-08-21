"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { MenuIcon } from "@/components/icons";
import type { TNavLink } from "@/types/site";

type TSiteHeaderProps = {
  links: TNavLink[];
};

/**
 * Top navigation that scrolls with the page. Desktop shows inline links;
 * below `lg` a hamburger opens a stacked menu.
 */
export function SiteHeader({ links }: TSiteHeaderProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  /**
   * Returns whether a nav href matches the current route.
   */
  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="w-full bg-white py-4 sm:py-[30px]">
      <div className="jv-container flex items-center justify-between gap-3 sm:gap-4">
        <Link
          href="/"
          className="relative block h-[52px] w-[170px] shrink-0 sm:h-[62px] sm:w-[220px] md:h-[70px] md:w-[300px]"
          aria-label="Jansen & Vorster home"
        >
          <Image
            src="/images/logo.png"
            alt="Jansen & Vorster"
            fill
            className="object-contain object-left"
            sizes="(max-width: 640px) 170px, (max-width: 768px) 220px, 300px"
            priority
          />
        </Link>

        <nav className="hidden items-center lg:flex" aria-label="Primary">
          <ul className="flex items-center">
            {links.map((link) => (
              <li key={link.label} className="mr-10 last:mr-0">
                <Link
                  href={link.href}
                  className={cn(
                    "font-[family-name:var(--font-poppins)] text-[14px] font-normal leading-[15px] uppercase transition-colors duration-300 ease-linear hover:text-jv-accent",
                    isActive(link.href) ? "text-jv-accent" : "text-black"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className="inline-flex items-center justify-center p-2 text-black lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <MenuIcon open={open} />
        </button>
      </div>

      {open ? (
        <div className="border-t border-black/5 bg-white lg:hidden">
          <ul className="jv-container flex flex-col py-4">
            {links.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className={cn(
                    "block py-3 font-[family-name:var(--font-poppins)] text-[14px] font-normal uppercase transition-colors hover:text-jv-accent",
                    isActive(link.href) ? "text-jv-accent" : "text-black"
                  )}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </header>
  );
}
