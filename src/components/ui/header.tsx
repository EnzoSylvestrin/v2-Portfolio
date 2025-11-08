"use client";

import { motion, useMotionValueEvent, useScroll } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatedThemeToggler } from "./animated-theme-toggler";

const NAV_ITEMS = [
  { href: "#sobre", label: "Sobre" },
  { href: "#projetos", label: "Projetos" },
  { href: "#contato", label: "Contato" },
];

export function SiteHeader() {
  const { scrollY } = useScroll();
  const pathname = usePathname();
  const lastYRef = useRef(0);
  
  const [hidden, setHidden] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    lastYRef.current = typeof window !== "undefined" ? window.scrollY : 0;
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const last = lastYRef.current;
    const delta = latest - last;
    const threshold = 80;
    const minorDelta = 6;

    if (latest < threshold) {
      setHidden(false);
    } else if (delta > minorDelta) {
      setHidden(true);
    } else if (delta < -minorDelta) {
      setHidden(false);
    }

    lastYRef.current = latest;
  });

  const activeKey = NAV_ITEMS.find((n) => pathname === n.href)?.href ?? NAV_ITEMS[0]?.href ?? null;
  const currentTab = hovered ?? selected ?? activeKey;

  return (
    <motion.header
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: hidden ? -64 : 0, opacity: hidden ? 0.5 : 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 32 }}
      className="fixed top-3 left-1/2 z-50 -translate-x-1/2 px-3 pointer-events-none"
    >
      <div className="pointer-events-auto flex h-12 items-center gap-3 rounded-full border border-black/10 bg-white/70 px-3 shadow-sm backdrop-blur supports-backdrop-filter:bg-white/60 dark:border-white/10 dark:bg-black/50 dark:supports-backdrop-filter:bg-black/40">
        <Link href="/" className="rounded-full px-2.5 text-sm font-semibold">
          ES
        </Link>

        <nav className="relative flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive = activeKey === item.href;
            const isCurrent = currentTab === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="relative rounded-full px-3 py-1.5 text-sm font-medium text-black/80 outline-none transition-colors hover:text-black dark:text-white/80 dark:hover:text-white"
                onMouseEnter={() => setHovered(item.href)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => setSelected(item.href)}
                aria-current={isActive ? 'page' : undefined}
              >
                {isCurrent && (
                  <motion.div
                    layoutId="tab-hover"
                    className="absolute inset-0 z-0 rounded-full bg-black/6 dark:bg-white/12"
                    transition={{
                      type: "spring",
                      stiffness: 600,
                      damping: 35,
                      mass: 0.3,
                    }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="ml-2 h-5 w-px bg-black/10 dark:bg-white/10" />
        <AnimatedThemeToggler />
      </div>
    </motion.header>
  );
}

export default SiteHeader;
