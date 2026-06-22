"use client";

import Link from "next/link";
import { ArrowDownRight, ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { FormEvent, useState } from "react";

const navigation = [
  { label: "Accueil", href: "/" },
  { label: "Services", href: "/#services" },
  { label: "Produits", href: "/#produits" },
  { label: "À propos", href: "/a-propos" },
  { label: "Blog", href: "/#blog" },
];

const faqs = [
  {
    question: "Combien de temps faut-il pour réaliser un site web ?",
    answer: "La plupart de nos projets prennent entre 6 et 12 semaines, selon leur ampleur, les contenus et les fonctionnalités attendues.",
  },
  {
    question: "Combien coûte un projet digital ?",
    answer: "Chaque projet est chiffré sur mesure. Après un premier échange, nous vous remettons une proposition claire avec périmètre, délais et budget.",
  },
  {
    question: "Travaillez-vous avec les petites entreprises ?",
    answer: "Oui. Nous adaptons notre approche aux objectifs et au niveau de maturité de chaque organisation, des jeunes entreprises aux structures établies.",
  },
  {
    question: "Quels services proposez-vous ?",
    answer: "Nous réunissons stratégie digitale, identité de marque, design UX/UI, sites web, applications mobiles, SEO et intégration de solutions IA.",
  },
  {
    question: "Pouvez-vous travailler entièrement à distance ?",
    answer: "Absolument. Notre méthode est pensée pour une collaboration fluide à distance, avec des points réguliers et un suivi transparent.",
  },
  {
    question: "Assurez-vous le suivi après la mise en ligne ?",
    answer: "Oui. Nous proposons des formules de maintenance, d’optimisation et d’accompagnement pour faire évoluer votre produit dans la durée.",
  },
];

export default function ContactPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setFieldErrors({});
    setSent(false);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone") || null,
      company: formData.get("company") || null,
      service: formData.get("service"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        if (result.error && typeof result.error === "object") {
          setFieldErrors(result.error);
        } else {
          setError(result.error || "Une erreur est survenue lors de l'envoi.");
        }
      } else {
        setSent(true);
        form.reset();
      }
    } catch (err) {
      setError("Impossible de contacter le serveur. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="contact-page">
      <header className="contact-nav">
        <Link href="/" className="contact-logo" aria-label="Accueil Full Bridge">Full Bridge.</Link>

        <nav className="contact-nav-links" aria-label="Navigation principale">
          {navigation.map((item) => (
            <Link key={item.label} href={item.href} aria-current={item.label === "Contact" ? "page" : undefined}>
              {item.label}
            </Link>
          ))}
        </nav>

        <Link href="#contact-form" className="contact-nav-cta">
          <span>Démarrer un projet</span>
          <ArrowUpRight aria-hidden="true" />
        </Link>

        <button
          className="contact-menu-button"
          type="button"
          aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((current) => !current)}
        >
          {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>

        {menuOpen ? (
          <nav className="contact-mobile-menu" aria-label="Navigation mobile">
            {navigation.map((item) => (
              <Link key={item.label} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}</Link>
            ))}
          </nav>
        ) : null}
      </header>

      <section className="contact-hero" aria-labelledby="contact-title">
        <p className="contact-kicker"><span /> Contact</p>
        <div className="contact-hero-heading">
          <h1 id="contact-title">
            <span>Ravi de faire</span>
            <span className="contact-title-last-line">
              votre connaissance
              <a href="#contact-form" className="contact-scroll-button" aria-label="Aller au formulaire">
                <ArrowDownRight aria-hidden="true" />
              </a>
            </span>
          </h1>
        </div>

      </section>

      <section className="contact-form-section" id="contact-form" aria-labelledby="contact-form-title">
        <div className="contact-form-intro">
          <p id="contact-form-title">
            PME, ONG, école, hôtel ou startup&nbsp;? Parlez-nous de votre projet. Notre équipe Haïti–Bénin vous répondra avec des pistes concrètes.
          </p>
          <a href="mailto:contact@fullbridgedigital.com">
            <span>Vous préférez l’e-mail&nbsp;?</span>
            <strong>contact@fullbridgedigital.com</strong>
          </a>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <label>
            <span>Nom complet</span>
            <input name="name" type="text" autoComplete="name" minLength={2} required />
            {fieldErrors.name && <span className="contact-field-error">{fieldErrors.name[0]}</span>}
          </label>
          <label>
            <span>Adresse e-mail</span>
            <input name="email" type="email" autoComplete="email" required />
            {fieldErrors.email && <span className="contact-field-error">{fieldErrors.email[0]}</span>}
          </label>
          <label>
            <span>Téléphone / WhatsApp <em>(facultatif)</em></span>
            <input name="phone" type="tel" autoComplete="tel" />
            {fieldErrors.phone && <span className="contact-field-error">{fieldErrors.phone[0]}</span>}
          </label>
          <label>
            <span>Entreprise / Organisation <em>(facultatif)</em></span>
            <input name="company" type="text" autoComplete="organization" />
            {fieldErrors.company && <span className="contact-field-error">{fieldErrors.company[0]}</span>}
          </label>
          <label>
            <span>Service souhaité</span>
            <select name="service" defaultValue="" required>
              <option value="" disabled hidden></option>
              <option>Développement Web</option>
              <option>Application Mobile</option>
              <option>Solution SaaS</option>
              <option>Système CRM</option>
              <option>Intégration IA &amp; Automatisation</option>
              <option>Infrastructure IT</option>
              <option>FBD Vitrine Pro</option>
              <option>FBD Commerce+</option>
              <option>FBD Manager</option>
              <option>Autre / Non défini</option>
            </select>
            <ChevronDown aria-hidden="true" />
            {fieldErrors.service && <span className="contact-field-error">{fieldErrors.service[0]}</span>}
          </label>
          <label className="contact-message-field">
            <span>Parlez-nous de votre projet</span>
            <textarea name="message" rows={6} minLength={20} required />
            {fieldErrors.message && <span className="contact-field-error">{fieldErrors.message[0]}</span>}
          </label>
          <label className="contact-consent">
            <input name="privacy" type="checkbox" required />
            <span>J’accepte que mes informations soient utilisées pour répondre à ma demande.</span>
          </label>
          <button type="submit" className="contact-submit" disabled={loading}>
            <span>{loading ? "Envoi en cours..." : "Envoyer le message"}</span>
            <ArrowUpRight aria-hidden="true" />
          </button>
          {sent ? <p className="contact-success" role="status">Merci ! Votre message a bien été pris en compte.</p> : null}
          {error ? <p className="contact-error" role="alert">{error}</p> : null}
        </form>
      </section>

      <section className="contact-faq" aria-labelledby="contact-faq-title">
        <div className="contact-faq-intro">
          <p className="contact-kicker"><span /> Une dernière question&nbsp;?</p>
          <h2 id="contact-faq-title">Les réponses à<br />vos questions.</h2>
          <a href="mailto:contact@fullbridgedigital.com">
            <span>Poser une question</span>
            <ArrowUpRight aria-hidden="true" />
          </a>
        </div>

        <div className="contact-faq-list">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <article key={faq.question} className={isOpen ? "is-open" : undefined}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                >
                  <span>{faq.question}</span>
                  <ChevronDown aria-hidden="true" />
                </button>
                <div className="contact-faq-answer-wrapper">
                  <div className="contact-faq-answer-inner">
                    <div className="contact-faq-answer-card">
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
