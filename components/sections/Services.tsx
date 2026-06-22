import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const services = [
  { name: "Développement Web", image: "/project-laptop.png" },
  { name: "Applications Mobiles", image: "/project-portrait.png" },
  { name: "Solutions SaaS", image: "/blog-workshop.png" },
  { name: "Systèmes CRM", image: "/project-furniture.png" },
  { name: "Intégration IA", image: "/project-architecture.png" },
  { name: "Infrastructure IT", image: "/blog-team.png" },
];

export default function Services() {
  return (
    <section id="services" className="bridge-services" aria-labelledby="bridge-services-title">
      <div className="bridge-services-intro">
        <p className="bridge-services-label">Nos services</p>

        <h2 id="bridge-services-title">Nous faisons passer votre entreprise au niveau supérieur</h2>

        <div className="bridge-services-summary">
          <p>
            Des solutions digitales modernes conçues pour faire croître les organisations grâce à la
            technologie et à l’innovation.
          </p>
          <Link href="#services-list">
            <span>Voir tous les services</span>
            <ArrowUpRight aria-hidden="true" />
          </Link>
        </div>
      </div>

      <div id="services-list" className="bridge-services-list">
        {services.map((service) => (
          <Link key={service.name} href="/contact">
            <span className="bridge-service-content">
              <span className="bridge-service-preview" aria-hidden="true">
                <Image src={service.image} alt="" width={460} height={320} />
              </span>
              <span className="bridge-service-title">{service.name}</span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
