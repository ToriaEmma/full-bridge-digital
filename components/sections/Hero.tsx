"use client";

import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const heroVideos = [
  "/salihavisuals_pindown.io_1782157331.mp4",
  "/xyzmaterials_pindown.io_1782157378.mp4",
];
const desktopHeroVideos = ["/xyzmaterials_pindown.io_1782157378.mp4"];

function HeroVideo({
  className,
  videos = heroVideos,
}: {
  className: string;
  videos?: string[];
}) {
  const [currentVideo, setCurrentVideo] = useState(0);

  return (
    <video
      key={videos[currentVideo]}
      className={className}
      src={videos[currentVideo]}
      autoPlay
      muted
      loop={videos.length === 1}
      playsInline
      preload="auto"
      aria-hidden="true"
      onEnded={() => {
        if (videos.length > 1) {
          setCurrentVideo((current) => (current + 1) % videos.length);
        }
      }}
    />
  );
}

const navigation = [
  { label: "Accueil", href: "/" },
  { label: "Services", href: "#services", badge: "6" },
  { label: "Produits", href: "#produits" },
  { label: "À propos", href: "/a-propos" },
  { label: "Blog", href: "#blog" },
];

export default function Hero() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [shouldUsePc, setShouldUsePc] = useState(false);

  useEffect(() => {
    setMounted(true);
    const preview = new URLSearchParams(window.location.search).get("preview");
    const shouldUsePcLayout =
      preview === "pc" ||
      (preview !== "mac" && !/Mac|iPhone|iPad|iPod/i.test(navigator.platform));

    setShouldUsePc(shouldUsePcLayout);
  }, []);

  return (
    <main className={`bridge-hero ${mounted && shouldUsePc ? "is-non-mac" : ""}`}>
      <header className="bridge-nav">
        <Link href="/" className="bridge-logo" aria-label="Accueil Full Bridge">
          Full Bridge.
        </Link>

        <nav className="bridge-nav-links" aria-label="Navigation principale">
          {navigation.map((item) => (
            <Link key={item.label} href={item.href} className="bridge-nav-link">
              {item.label}
              {item.badge ? <span className="bridge-nav-badge">{item.badge}</span> : null}
            </Link>
          ))}
        </nav>

        <div className="bridge-nav-actions">
          <Link href="/contact" className="bridge-project-button">
            <span>Démarrer un projet</span>
            <ArrowUpRight aria-hidden="true" />
          </Link>
        </div>

        <div className="bridge-mobile-actions">
          <button
            type="button"
            className="bridge-icon-button"
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((current) => !current)}
          >
            {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>

        {menuOpen ? (
          <div className="bridge-mobile-menu">
            <nav aria-label="Navigation mobile">
              {navigation.map((item) => (
                <Link key={item.label} href={item.href} onClick={() => setMenuOpen(false)}>
                  <span>{item.label}</span>
                  {item.badge ? <span className="bridge-nav-badge">{item.badge}</span> : null}
                </Link>
              ))}
            </nav>
            <Link href="/contact" className="bridge-project-button" onClick={() => setMenuOpen(false)}>
              <span>Démarrer un projet</span>
              <ArrowUpRight aria-hidden="true" />
            </Link>
          </div>
        ) : null}
      </header>

      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
        <defs>
          <clipPath id="hero-mobile-clip" clipPathUnits="objectBoundingBox">
            <path d="M0.85,0 H0.95 A0.05,0.03,0,0,1,1,0.03 V0.97 A0.05,0.03,0,0,1,0.95,1 H0.05 A0.05,0.03,0,0,1,0,0.97 V0.35 A0.05,0.03,0,0,1,0.05,0.32 H0.39 A0.05,0.03,0,0,0,0.44,0.29 V0.27 A0.05,0.03,0,0,1,0.49,0.24 H0.51 A0.05,0.03,0,0,0,0.56,0.21 V0.19 A0.05,0.03,0,0,1,0.61,0.16 H0.63 A0.05,0.03,0,0,0,0.68,0.13 V0.11 A0.05,0.03,0,0,1,0.73,0.08 H0.75 A0.05,0.03,0,0,0,0.8,0.05 V0.03 A0.05,0.03,0,0,1,0.85,0 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* Desktop Hero Stage */}
      <section className="bridge-stage desktop-only" aria-labelledby="bridge-hero-title">
        <HeroVideo className="bridge-hero-video" videos={desktopHeroVideos} />

        <div className="bridge-cutout" aria-hidden="true">
          <span className="bridge-step bridge-step-one" />
          <span className="bridge-step bridge-step-two" />
          <span className="bridge-step bridge-step-three" />
          <span className="bridge-step bridge-step-four" />
        </div>

        <div className="bridge-copy">
          <h1 id="bridge-hero-title">
            <span>Une agence web et</span>
            <span>branding qui relie</span>
            <span>idées et impact</span>
          </h1>

          <div className="bridge-hero-actions">
            <Link href="#projets" className="bridge-work-button">
              <span>Voir nos projets</span>
              <ArrowUpRight aria-hidden="true" />
            </Link>
            <Link href="/a-propos" className="bridge-team-link">
              Découvrir l’équipe
              <ArrowUpRight aria-hidden="true" />
            </Link>
          </div>
        </div>

        <Link href="#projets" className="bridge-mobile-work-button">
          <span>Voir nos projets</span>
          <ArrowUpRight aria-hidden="true" />
        </Link>
      </section>

      {/* Mobile Hero Stage */}
      <section className="bridge-mobile-hero" aria-labelledby="bridge-hero-title-mobile">
        <div className="bridge-mobile-hero-top">
          <p className="bridge-eyebrow">👋 Notre expertise</p>
          <h1 id="bridge-hero-title-mobile">
            Une agence web et<br />
            branding qui relie<br />
            idées et impact
          </h1>
          <Link href="#projets" className="bridge-mobile-work-button-new">
            <span>Voir nos projets</span>
            <ArrowUpRight aria-hidden="true" />
          </Link>
        </div>

        <div className="bridge-mobile-hero-card">
          <HeroVideo className="bridge-mobile-hero-video" />

          <Link href="/contact" className="bridge-mobile-play-button">
            <div className="bridge-mobile-play-icon">
              <ArrowUpRight aria-hidden="true" />
            </div>
            <div className="bridge-mobile-play-text">
              <strong>Parlons de votre projet</strong>
              <span>Démarrer maintenant</span>
            </div>
          </Link>
        </div>
      </section>
    </main>
  );
}
