import mongoose from "mongoose";
import BlogPost from "@/models/BlogPost";
import Project from "@/models/Project";
import { blogPosts as initialBlogPosts } from "./blog-posts";

const MONGODB_URI = process.env.MONGODB_URI;

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

let cached = global.mongooseCache;

if (!cached) {
  cached = global.mongooseCache = { conn: null, promise: null };
}

async function seedDatabase() {
  try {
    const blogsCount = await BlogPost.countDocuments();
    if (blogsCount === 0) {
      // Seed initial blog posts
      await BlogPost.insertMany(initialBlogPosts);
      console.log("Seeded default blog posts to database.");
    }

    const projectsCount = await Project.countDocuments();
    if (projectsCount === 0) {
      // Seed initial projects
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
      await Project.insertMany(initialProjects);
      console.log("Seeded default projects to database.");
    }
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}

export async function connectToDatabase() {
  if (!MONGODB_URI) {
    throw new Error(
      "Please define the MONGODB_URI environment variable in the deployment settings."
    );
  }

  if (cached!.conn) {
    return cached!.conn;
  }

  if (!cached!.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached!.promise = mongoose.connect(MONGODB_URI, opts).then(async (m) => {
      await seedDatabase();
      return m;
    });
  }

  try {
    cached!.conn = await cached!.promise;
  } catch (e) {
    cached!.promise = null;
    throw e;
  }

  return cached!.conn;
}
