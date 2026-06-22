"use client";

import Link from "next/link";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import { useEffect, useState } from "react";

const serviceLinks = ["Développement Web", "Applications Mobiles", "Solutions SaaS", "Systèmes CRM", "Intégration IA", "Infrastructure IT"];
const exploreLinks = ["Accueil", "Services", "Produits", "À propos", "Blog", "Contact"];

export default function Footer() {
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
    <footer id="contact" className={`bridge-footer ${mounted && shouldUsePc ? "is-non-mac" : ""}`}>
      <svg className="bridge-footer-clip" width="0" height="0" aria-hidden="true">
        <defs>
          <clipPath id="clip" clipPathUnits="objectBoundingBox">
            <path d="M0.0235,0H0.6235A0.0235,0.04,0,0,1,0.6471,0.04V0.06A0.0235,0.04,0,0,0,0.6706,0.1H0.9765A0.0235,0.04,0,0,1,1,0.14V0.96A0.0235,0.04,0,0,1,0.9765,1H0.0235A0.0235,0.04,0,0,1,0,0.96V0.44A0.0235,0.04,0,0,1,0.0235,0.4H0.0353A0.0235,0.04,0,0,0,0.0588,0.36V0.04A0.0235,0.04,0,0,1,0.0824,0" />
          </clipPath>
          <clipPath id="clip-mobile" clipPathUnits="objectBoundingBox">
            <path d="M0.0571,0H0.9429A0.0571,0.0286,0,0,1,1,0.0286V0.9A0.0571,0.0286,0,0,1,0.9429,0.9286H0.4857A0.0571,0.0286,0,0,0,0.4286,0.9571V0.9714A0.0571,0.0286,0,0,1,0.3714,1H0.0571A0.0571,0.0286,0,0,1,0,0.9714V0.3143A0.0571,0.0286,0,0,1,0.0571,0.2857H0.0571A0.0571,0.0286,0,0,0,0.1143,0.2571V0.0286A0.0571,0.0286,0,0,1,0.1714,0" />
          </clipPath>
        </defs>
      </svg>

      <div className="bridge-footer-socials" aria-label="Réseaux sociaux">
        <a href="#" aria-label="LinkedIn"><span>in</span></a>
        <a href="#" aria-label="X"><span>𝕏</span></a>
        <a href="#" aria-label="GitHub"><span>GH</span></a>
        <a href="#" aria-label="Instagram"><span>◎</span></a>
      </div>

      <Link href="#" className="bridge-footer-back">Oups, je suis allé trop loin retour en haut ☝️</Link>

      <div className="bridge-footer-panel inverted">

        <div className="bridge-footer-grid">
          <div className="bridge-footer-cta">
            <h2>Vous aimez ce que vous voyez&nbsp;?</h2>
            <Link href="/contact">
              <span>Démarrer un projet</span>
              <ArrowUpRight aria-hidden="true" />
            </Link>
          </div>

          <nav className="bridge-footer-links" aria-label="Services Full Bridge">
            <p>Services</p>
            {serviceLinks.map((label) => <Link key={label} href="/#services">{label}</Link>)}
          </nav>

          <nav className="bridge-footer-links" aria-label="Explorer le site">
            <p>Explorer</p>
            {exploreLinks.map((label) => (
              <Link
                key={label}
                href={label === "Accueil" ? "/" : label === "Contact" ? "/contact" : label === "À propos" ? "/a-propos" : label === "Blog" ? "/#blog" : label === "Produits" ? "/#produits" : "/#services"}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="bridge-footer-contact">
            <p>Nous contacter</p>
            <a href="mailto:contact@fullbridgedigital.com"><Mail aria-hidden="true" /><span>contact@fullbridgedigital.com</span></a>
            <address><MapPin aria-hidden="true" /><span>Haïti · Bénin<br />Marchés francophones</span></address>
          </div>
        </div>

        <p className="bridge-footer-statement">Full Bridge.</p>

        <div className="bridge-footer-bottom">
          <strong>Full Bridge.</strong>
          <span>© 2026 Full Bridge Digital. Tous droits réservés.</span>
          <Link href="#">Confidentialité</Link>
        </div>
      </div>

      <div className="bridge-footer-mobile">
        <div className="bridge-footer-mobile-content">
          <h2>Vous aimez ce que vous voyez&nbsp;?</h2>
          <Link href="/contact" className="bridge-footer-mobile-cta">
            <span>Démarrer un projet</span>
            <ArrowUpRight aria-hidden="true" />
          </Link>

          <nav aria-label="Navigation du footer mobile">
            <Link href="/">Accueil</Link>
            <Link href="/#projets">Projets</Link>
            <Link href="/#services">Services</Link>
            <Link href="/#produits">Produits</Link>
            <Link href="/a-propos">À propos</Link>
            <Link href="/#blog">Blog</Link>
          </nav>

          <div className="bridge-footer-mobile-contact">
            <a href="mailto:contact@fullbridgedigital.com"><Mail aria-hidden="true" /><span>contact@fullbridgedigital.com</span></a>
          </div>

          <p>Full Bridge.</p>
        </div>
      </div>
    </footer>
  );
}
