import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "À propos | Full Bridge Digital",
  description: "Découvrez l’histoire, la mission et le modèle opérationnel Haïti–Bénin de Full Bridge Digital.",
};

const teams = [
  { title: "Stratégie & relations", place: "Pôle Haïti", image: "/team-haiti.png", position: "center 28%" },
  { title: "Ingénierie & delivery", place: "Pôle Bénin", image: "/team-benin.png", position: "center" },
  { title: "Produit & design", place: "Équipe distribuée", image: "/blog-team.png", position: "center" },
];

export default function AboutPage() {
  return (
    <>
      <main className="about-page">
        <header className="about-nav">
          <Link href="/" className="about-logo" aria-label="Accueil Full Bridge">Full Bridge.</Link>
          <nav aria-label="Navigation principale">
            <Link href="/#services">Services</Link>
            <Link href="/#produits">Produits</Link>
            <Link href="/#projets">Projets</Link>
            <Link href="/#blog">Blog</Link>
          </nav>
          <Link href="/contact" className="about-nav-cta">Prendre contact <ArrowUpRight aria-hidden="true" /></Link>
        </header>

        <section className="about-intro" aria-labelledby="about-title">
          <p className="about-eyebrow"><span /> À propos</p>
          <h1 id="about-title">Nous construisons<br />les ponts numériques<br />de demain.</h1>
          <p className="about-intro-copy">
            Full Bridge Digital relie expertise métier et technologie pour créer des solutions utiles,
            fiables et capables de grandir avec les organisations.
          </p>
        </section>

        <p className="about-display-word" aria-hidden="true">Impact</p>

        <section className="about-team" aria-labelledby="about-team-title">
          <p className="about-eyebrow"><span /> Notre équipe</p>
          <h2 id="about-team-title">Plusieurs expertises.<br />Une même ambition.</h2>

          <div className="about-team-track">
            {teams.map((team) => (
              <article key={team.title} className="about-team-card">
                <div className="about-team-image about-inverted-radius">
                  <Image
                    src={team.image}
                    alt={team.title}
                    width={1448}
                    height={1086}
                    sizes="(max-width: 700px) 86vw, 31vw"
                    style={{ objectPosition: team.position }}
                  />
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
