"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { BlogPost } from "@/lib/blog-posts";

type BlogProps = {
  blogPosts: BlogPost[];
};

export default function Blog({ blogPosts }: BlogProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: -1 | 1) => {
    trackRef.current?.scrollBy({ left: direction * 560, behavior: "smooth" });
  };

  return (
    <section id="blog" className="bridge-blog" aria-labelledby="bridge-blog-title">
      <div className="bridge-blog-intro">
        <p className="bridge-blog-label">Le blog</p>
        <h2 id="bridge-blog-title">Nos dernières publications</h2>
        <Link href="#blog-articles" className="bridge-blog-button">
          <span>Voir les articles</span>
          <ArrowUpRight aria-hidden="true" />
        </Link>

        <div className="bridge-blog-controls">
          <button type="button" onClick={() => scroll(-1)} aria-label="Article précédent">
            <ArrowLeft aria-hidden="true" />
          </button>
          <button type="button" onClick={() => scroll(1)} aria-label="Article suivant">
            <ArrowRight aria-hidden="true" />
          </button>
        </div>
      </div>

      <div id="blog-articles" ref={trackRef} className="bridge-blog-track">
        {blogPosts.map((article) => (
          <article key={article.title} className="bridge-blog-card">
            <Link href={`/blog/${article.slug}`} className="bridge-blog-image" aria-label={`Lire l’article : ${article.title}`}>
              <Image src={article.image} alt={article.imageAlt} fill sizes="(max-width: 820px) 84vw, 42vw" />
            </Link>
            <p className="bridge-blog-time">{article.time}</p>
            <h3><Link href={`/blog/${article.slug}`}>{article.title}</Link></h3>
            <p className="bridge-blog-excerpt">{article.excerpt}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
