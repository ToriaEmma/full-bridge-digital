import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Testimonial() {
  return (
    <section className="bridge-testimonial" aria-label="Produit FBD Manager">
      <div className="bridge-testimonial-media">
        <Image
          src="/project-laptop.png"
          alt="Présentation de la plateforme de gestion FBD Manager"
          fill
          sizes="(max-width: 820px) 94vw, 88vw"
        />

        <blockquote className="bridge-testimonial-quote inverted-radius">
          <p>« Centralisez vos clients, vos opérations et vos indicateurs dans une seule plateforme. »</p>
          <footer>
            <Image src="/project-laptop.png" alt="" width={54} height={54} />
            <span>
              <strong>FBD Manager</strong>
              <small>ERP SaaS de gestion d’entreprise</small>
            </span>
          </footer>
        </blockquote>

        <Link href="/contact" className="bridge-testimonial-play" aria-label="Demander une démo de FBD Manager">
          <ArrowUpRight aria-hidden="true" />
        </Link>

        <div className="bridge-testimonial-actions">
          <Link href="#produits" className="bridge-testimonial-product-link">
            <span>Découvrir FBD Manager</span>
            <ArrowUpRight aria-hidden="true" />
          </Link>
          <Link href="/contact">
            <span>Demander une démo</span>
            <ArrowUpRight aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
