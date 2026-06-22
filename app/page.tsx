import About from "@/components/sections/About";
import Blog from "@/components/sections/Blog";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Partnership from "@/components/sections/Partnership";
import Services from "@/components/sections/Services";
import Testimonial from "@/components/sections/Testimonial";
import Work from "@/components/sections/Work";
import { connectToDatabase } from "@/lib/mongodb";
import BlogPost from "@/models/BlogPost";
import Project from "@/models/Project";
import { blogPosts as fallbackBlogPosts } from "@/lib/blog-posts";

export const revalidate = 0;

const initialProjects = [
  {
    year: "2026",
    client: "Nexa Studio",
    title: "Une présence digitale pensée pour marquer les esprits",
    image: "/project-portrait.png",
    alt: "Entrepreneur célébrant le lancement de son nouveau site",
    className: "bridge-work-card-left",
  },
  {
    year: "2026",
    client: "Maison Noma",
    title: "Une identité sobre pour une architecture d’exception",
    image: "/project-architecture.png",
    alt: "Maison contemporaine en bois au cœur d’une forêt",
    className: "bridge-work-card-right",
  },
  {
    year: "2026",
    client: "Atelier Forma",
    title: "Des espaces de travail qui donnent envie de créer",
    image: "/project-furniture.png",
    alt: "Présentation du site d’un studio de mobilier contemporain",
    className: "bridge-work-card-third",
  },
  {
    year: "2026",
    client: "Horizon Collective",
    title: "Réinventer la présence digitale d’un collectif international",
    image: "/project-laptop.png",
    alt: "Site créatif présenté sur un ordinateur portable",
    className: "bridge-work-card-fourth",
  },
];

export default async function Home() {
  let projects: any[] = [];
  let blogPosts: any[] = [];

  try {
    await connectToDatabase();

    const projectsData = await Project.find({}).lean();
    const blogsData = await BlogPost.find({}).sort({ createdAt: -1 }).lean();

    projects = projectsData.map((p: any) => ({
      id: p._id.toString(),
      year: p.year,
      client: p.client,
      title: p.title,
      image: p.image,
      alt: p.alt,
      className: p.className,
    }));

    blogPosts = blogsData.map((post: any) => ({
      id: post._id.toString(),
      slug: post.slug,
      title: post.title,
      heroLines: post.heroLines,
      excerpt: post.excerpt,
      time: post.time,
      date: post.date,
      image: post.image,
      imageAlt: post.imageAlt,
      intro: post.intro,
      sections: post.sections.map((s: any) => ({
        id: s.id,
        title: s.title,
        paragraphs: s.paragraphs,
      })),
    }));
  } catch (err) {
    console.warn("DB connection failed on Home page, falling back to static data.");
    projects = initialProjects.map((p, idx) => ({ id: `fallback-${idx}`, ...p }));
    blogPosts = fallbackBlogPosts;
  }

  return (
    <>
      <Hero />
      <About />
      <Work projects={projects} />
      <Services />
      <Testimonial />
      <Partnership />
      <Blog blogPosts={blogPosts} />
      <Footer />
    </>
  );
}
