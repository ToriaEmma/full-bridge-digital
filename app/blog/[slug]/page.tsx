import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Clock } from "lucide-react";
import Footer from "@/components/layout/Footer";
import { connectToDatabase } from "@/lib/mongodb";
import BlogPost, { IBlogPost } from "@/models/BlogPost";
import { blogPosts as fallbackBlogPosts, getBlogPost as getFallbackBlogPost } from "@/lib/blog-posts";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  try {
    await connectToDatabase();
    const posts = await BlogPost.find({}).lean();
    return posts.map((post: any) => ({ slug: post.slug }));
  } catch (err) {
    console.warn("DB connection failed in generateStaticParams, falling back to static blog posts.");
    return fallbackBlogPosts.map((post) => ({ slug: post.slug }));
  }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  let post: any = null;

  try {
    await connectToDatabase();
    post = await BlogPost.findOne({ slug }).lean() as IBlogPost | null;
  } catch (err) {
    console.warn("DB connection failed in generateMetadata, falling back to static metadata.");
    post = getFallbackBlogPost(slug);
  }

  if (!post) return {};

  return {
    title: `${post.title} | Full Bridge Digital`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
      type: "article",
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  let post: any = null;

  try {
    await connectToDatabase();
    post = await BlogPost.findOne({ slug }).lean() as IBlogPost | null;
  } catch (err) {
    console.warn("DB connection failed in BlogPostPage, falling back to static article data.");
    post = getFallbackBlogPost(slug);
  }

  if (!post) notFound();

  return (
    <>
      <main className="article-page">
        <header className="article-nav">
          <Link href="/" className="article-logo" aria-label="Accueil Full Bridge">Full Bridge.</Link>
          <nav aria-label="Navigation de l’article">
            <Link href="/#blog"><ArrowLeft aria-hidden="true" /> Retour au blog</Link>
            <Link href="/contact" className="article-nav-cta">Prendre contact <ArrowUpRight aria-hidden="true" /></Link>
          </nav>
        </header>

        <article>
          <header className="article-hero">
            <div className="article-hero-copy">
              <p className="article-reading"><span /> {post.time}</p>
              <h1>
                {post.heroLines[0]}<br />
                {post.heroLines[1]}<br />
                {post.heroLines[2]}
              </h1>
              <div className="article-author">
                <span className="article-author-mark">F—B</span>
                <p><small>Rédigé par</small><strong>Équipe Full Bridge</strong><span>Digital &amp; Technology</span></p>
              </div>
            </div>
            <div className="article-hero-image">
              <Image src={post.image} alt={post.imageAlt} fill priority sizes="(max-width: 800px) 100vw, 65vw" />
            </div>
          </header>

          <div className="article-layout">
            <aside className="article-sidebar">
              <div>
                <p>Sommaire</p>
                <nav aria-label="Sommaire de l’article">
                  {post.sections.map((section: any) => <a key={section.id} href={`#${section.id}`}>{section.title}</a>)}
                </nav>
              </div>
              <p className="article-sidebar-time"><Clock aria-hidden="true" /> {post.time}</p>
            </aside>

            <div className="article-content">
              <p className="article-updated">Mis à jour le {post.date}</p>
              <h2>{post.title}</h2>
              <p className="article-lead">{post.intro}</p>

              {post.sections.map((section: any) => (
                <section key={section.id} id={section.id}>
                  <h3>{section.title}</h3>
                  {section.paragraphs.map((paragraph: any) => <p key={paragraph}>{paragraph}</p>)}
                </section>
              ))}

              <div className="article-cta">
                <p>Vous souhaitez appliquer ces idées à votre organisation&nbsp;?</p>
                <Link href="/contact">Parlons de votre projet <ArrowUpRight aria-hidden="true" /></Link>
              </div>
            </div>

            <aside className="article-share" aria-label="Full Bridge Digital">
              <p>FBD</p>
              <span>in</span>
              <span>𝕏</span>
              <span>◎</span>
            </aside>
          </div>

          <footer className="article-author-footer">
            <span className="article-author-mark">F—B</span>
            <div><small>Rédigé par</small><strong>Équipe Full Bridge</strong><span>Digital &amp; Technology</span></div>
            <p>Nous partageons des méthodes concrètes pour aider les organisations à mieux utiliser la technologie.</p>
          </footer>
        </article>
      </main>
      <Footer />
    </>
  );
}
