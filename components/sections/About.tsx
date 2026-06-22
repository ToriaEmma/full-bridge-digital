"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef } from "react";

export default function About() {
  const badgeRef = useRef<HTMLDivElement>(null);
  const badgeRingRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    let frame = 0;
    let lastScrollY = window.scrollY;
    let badgeOffset = 0;

    const updateBadge = () => {
      const badge = badgeRef.current;
      const ring = badgeRingRef.current;

      if (!badge || !ring) return;

      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollY;
      badgeOffset = Math.min(10, Math.max(-140, badgeOffset + scrollDelta * 0.35));

      badge.style.transform = `translateY(${badgeOffset}px)`;
      ring.style.transform = `rotate(${currentScrollY * 0.12}deg)`;
      lastScrollY = currentScrollY;
    };

    const handleScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateBadge);
    };

    updateBadge();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <section id="a-propos" className="bridge-about" aria-labelledby="bridge-about-title">
      <p className="bridge-about-label">Qui sommes-nous&nbsp;?</p>

      <div className="bridge-about-content">
        <h2 id="bridge-about-title">
          Une entreprise fondée sur l’exécution, qui construit des solutions technologiques de classe mondiale
          pour les marchés émergents.
        </h2>

        <div className="bridge-about-actions">
          <Link href="/a-propos" className="bridge-about-primary">
            <span>À propos de Full Bridge</span>
            <ArrowUpRight aria-hidden="true" />
          </Link>
          <Link href="/contact" className="bridge-about-secondary">
            <span>Nous rencontrer</span>
            <ArrowUpRight aria-hidden="true" />
          </Link>
        </div>
      </div>

      <div ref={badgeRef} className="bridge-about-badge" aria-hidden="true">
        <svg ref={badgeRingRef} viewBox="0 0 120 120">
          <defs>
            <path id="bridge-badge-path" d="M 60,60 m -43,0 a 43,43 0 1,1 86,0 a 43,43 0 1,1 -86,0" />
          </defs>
          <text>
          <textPath href="#bridge-badge-path">Haïti • Bénin • Afrique francophone • </textPath>
          </text>
        </svg>
        <span>👀</span>
      </div>
    </section>
  );
}
