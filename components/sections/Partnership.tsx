import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Partnership() {
  return (
    <section id="produits" className="bridge-partnership" aria-labelledby="bridge-partnership-title">
      <p className="bridge-partnership-label">Nos produits</p>

      <h2 id="bridge-partnership-title">
        Un écosystème conçu pour accélérer votre entreprise.
      </h2>

      <div className="bridge-partnership-copy">
        <p>
          <strong>FBD Vitrine Pro</strong> offre aux entreprises un site vitrine professionnel, rapide et crédible,
          pensé pour présenter leur activité et générer de nouvelles opportunités.
        </p>
        <p>
          <strong>FBD Commerce+</strong> réunit les outils essentiels pour vendre en ligne, gérer les commandes
          et développer une activité e-commerce complète.
        </p>
        <p>
          <strong>FBD Manager</strong> centralise clients, opérations et indicateurs dans un ERP SaaS évolutif.
          <Link href="/contact"> Demandez une démonstration</Link> adaptée à votre organisation.
        </p>

        <Link href="/contact" className="bridge-partnership-button">
          <span>Découvrir nos produits</span>
          <ArrowUpRight aria-hidden="true" />
        </Link>
      </div>

      <p className="bridge-partnership-marquee" aria-hidden="true">
        <span>Des produits pensés pour grandir.</span>
        <span>Des produits pensés pour grandir.</span>
      </p>
    </section>
  );
}
