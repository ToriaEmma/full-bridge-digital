import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Check, Info, Mail, TriangleAlert } from "lucide-react";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Design System | Full Bridge Digital",
  description: "Référence visuelle et composants UI de Full Bridge Digital.",
  robots: { index: false, follow: false },
};

const colors = [
  ["Primary Blue", "#4E73C7", "CTA, liens actifs, marque"],
  ["Dark Navy", "#0F172A", "Titres, textes, fonds sombres"],
  ["Light Background", "#F8FAFC", "Fond général"],
  ["Accent Blue", "#7DA2FF", "Survols, badges, highlights"],
  ["Neutral Gray", "#64748B", "Texte secondaire"],
  ["Success", "#22C55E", "Confirmations"],
  ["Warning", "#F59E0B", "Attention"],
  ["Error", "#EF4444", "Erreurs"],
];

const spacings = [4, 8, 16, 24, 32, 48, 64];

export default function DesignSystemPage() {
  return (
    <main className="ds-page">
      <header className="ds-header">
        <div>
          <Link href="/"><ArrowLeft aria-hidden="true" /> Retour au site</Link>
          <p>Full Bridge Digital</p>
          <h1>Design System</h1>
          <span>Version 1.0 · Juin 2026</span>
        </div>
        <strong>F—B</strong>
      </header>

      <nav className="ds-nav" aria-label="Sommaire">
        <a href="#couleurs">Couleurs</a>
        <a href="#typographie">Typographie</a>
        <a href="#espacement">Espacement</a>
        <a href="#boutons">Boutons</a>
        <a href="#formulaires">Formulaires</a>
        <a href="#cartes">Cartes</a>
      </nav>

      <section id="couleurs" className="ds-section">
        <div className="ds-section-heading"><span>01</span><div><p>Fondations</p><h2>Couleurs officielles</h2></div></div>
        <div className="ds-color-grid">
          {colors.map(([name, value, usage]) => (
            <article key={name} className="ds-color-card">
              <div style={{ backgroundColor: value }} />
              <h3>{name}</h3><code>{value}</code><p>{usage}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="typographie" className="ds-section">
        <div className="ds-section-heading"><span>02</span><div><p>Fondations</p><h2>Typographie Inter</h2></div></div>
        <div className="ds-type-list">
          <article><span>Hero · 64 / 700</span><h1>Bridging Business &amp; Technology</h1></article>
          <article><span>H1 · 48 / 700</span><h2>Des solutions digitales modernes</h2></article>
          <article><span>H2 · 36 / 600</span><h3>Une entreprise fondée sur l’exécution</h3></article>
          <article><span>H3 · 28 / 600</span><h4>Technologies modernes et fiables</h4></article>
          <article><span>Body Large · 18 / 400</span><p className="ds-body-large">Nous construisons des outils qui rapprochent les besoins métier et la technologie.</p></article>
          <article><span>Body · 16 / 400</span><p>Des interfaces claires, accessibles et pensées pour évoluer.</p></article>
          <article><span>Caption · 14 / 500</span><small>Texte secondaire, métadonnées et descriptions courtes.</small></article>
        </div>
      </section>

      <section id="espacement" className="ds-section">
        <div className="ds-section-heading"><span>03</span><div><p>Fondations</p><h2>Grille d’espacement</h2></div></div>
        <div className="ds-spacing-list">
          {spacings.map((space) => <div key={space}><code>{space}px</code><span style={{ width: space * 2 }} /></div>)}
        </div>
        <div className="ds-radius-grid">
          <div><span className="ds-radius-button" /><p>Bouton · 12px</p></div>
          <div><span className="ds-radius-input" /><p>Input · 14px</p></div>
          <div><span className="ds-radius-card" /><p>Carte · 20px</p></div>
          <div><span className="ds-radius-modal" /><p>Modale · 24px</p></div>
        </div>
      </section>

      <section id="boutons" className="ds-section">
        <div className="ds-section-heading"><span>04</span><div><p>Composants</p><h2>Boutons</h2></div></div>
        <div className="ds-component-panel">
          <div className="ds-button-row">
            <Button size="lg">Primary <ArrowUpRight aria-hidden="true" /></Button>
            <Button size="lg" variant="secondary">Secondary</Button>
            <Button size="lg" variant="ghost">Ghost</Button>
            <Button size="lg" variant="danger">Danger</Button>
          </div>
          <div className="ds-dark-row"><Button size="lg" variant="white">Bouton blanc</Button><Button size="lg" disabled>Désactivé</Button></div>
        </div>
      </section>

      <section id="formulaires" className="ds-section">
        <div className="ds-section-heading"><span>05</span><div><p>Composants</p><h2>Formulaires</h2></div></div>
        <div className="ds-form-grid">
          <label><span>Nom complet</span><input type="text" placeholder="Votre nom" /></label>
          <label><span>Adresse e-mail</span><div className="ds-input-icon"><Mail aria-hidden="true" /><input type="email" placeholder="vous@entreprise.com" /></div></label>
          <label><span>Service souhaité</span><select defaultValue=""><option value="" disabled>Sélectionner un service</option><option>Développement Web</option><option>Solution SaaS</option></select></label>
          <label className="ds-field-error"><span>Champ avec erreur</span><input defaultValue="Valeur incorrecte" /><small>Veuillez vérifier cette information.</small></label>
          <label className="ds-textarea"><span>Message</span><textarea rows={5} placeholder="Parlez-nous de votre projet" /></label>
        </div>
      </section>

      <section id="cartes" className="ds-section">
        <div className="ds-section-heading"><span>06</span><div><p>Composants</p><h2>Cartes et états</h2></div></div>
        <div className="ds-card-grid">
          <article className="ds-feature-card"><span><ArrowUpRight aria-hidden="true" /></span><h3>Développement Web</h3><p>Sites et applications web sur mesure, rapides et évolutifs.</p><a href="#boutons">En savoir plus</a></article>
          <article className="ds-feature-card"><span><Check aria-hidden="true" /></span><h3>Fiabilité</h3><p>Des livrables structurés, testés et conformes aux standards.</p><a href="#boutons">Notre approche</a></article>
          <div className="ds-status-stack">
            <p className="ds-alert ds-alert-success"><Check aria-hidden="true" />Votre message a bien été envoyé.</p>
            <p className="ds-alert ds-alert-info"><Info aria-hidden="true" />Une information utile pour continuer.</p>
            <p className="ds-alert ds-alert-warning"><TriangleAlert aria-hidden="true" />Une vérification est nécessaire.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
