"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export default function GlobalScrollBadge() {
  const pathname = usePathname();
  const badgeRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (pathname === "/") return;

    let frame = 0;
    let lastScrollY = window.scrollY;
    let offset = 0;

    const update = () => {
      const badge = badgeRef.current;
      const ring = ringRef.current;
      if (!badge || !ring) return;

      const scrollY = window.scrollY;
      offset = Math.min(10, Math.max(-140, offset + (scrollY - lastScrollY) * 0.35));
      badge.style.transform = `translateY(${offset}px)`;
      ring.style.transform = `rotate(${scrollY * 0.12}deg)`;
      lastScrollY = scrollY;
    };

    const handleScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [pathname]);

  if (pathname === "/") return null;

  return (
    <div ref={badgeRef} className="bridge-about-badge" aria-hidden="true">
      <svg ref={ringRef} viewBox="0 0 120 120">
        <defs>
          <path id="global-badge-path" d="M 60,60 m -43,0 a 43,43 0 1,1 86,0 a 43,43 0 1,1 -86,0" />
        </defs>
        <text>
          <textPath href="#global-badge-path">Haïti • Bénin • Afrique francophone • </textPath>
        </text>
      </svg>
      <span>👀</span>
    </div>
  );
}
