import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type ProjectItem = {
  id: string;
  year: string;
  client: string;
  title: string;
  image: string;
  alt: string;
  className: string;
};

type WorkProps = {
  projects: ProjectItem[];
};

export default function Work({ projects }: WorkProps) {
  return (
    <section id="projets" className="bridge-work" aria-labelledby="bridge-work-title">
      <div className="bridge-work-heading">
        <p>Nos réalisations</p>
        <h2 id="bridge-work-title">Découvrez nos projets</h2>
      </div>

      {projects.map((project, index) => (
        <article key={project.client} className={`bridge-work-card ${project.className}`}>
          <Link href="/contact" className="bridge-work-image" aria-label={`Découvrir le projet ${project.client}`}>
            <Image src={project.image} alt={project.alt} fill sizes="(max-width: 820px) 100vw, 50vw" />
            {index === 0 ? <span className="bridge-work-monogram">F—B</span> : null}
          </Link>
          <p className="bridge-work-meta">
            <span>{project.year}</span>
            <span>{project.client}</span>
          </p>
          <h3>{project.title}</h3>
        </article>
      ))}

      <div className="bridge-work-cta">
        <p>Vous aimez ce que vous voyez&nbsp;?</p>
        <Link href="/contact">
          <span>Contactez-nous</span>
          <ArrowUpRight aria-hidden="true" />
        </Link>
      </div>

    </section>
  );
}
