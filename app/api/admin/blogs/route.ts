import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { connectToDatabase } from "@/lib/mongodb";
import BlogPost from "@/models/BlogPost";
import { z } from "zod";

async function isAuthenticated() {
  const cookieStore = await cookies();
  return cookieStore.get("admin_session")?.value === "2345_authenticated";
}

const blogPostSchema = z.object({
  slug: z.string().min(1, "Le slug est requis."),
  title: z.string().min(1, "Le titre est requis."),
  heroLines: z
    .array(z.string())
    .length(
      3,
      "Il faut exactement 3 lignes pour l'affichage principal."
    ),
  excerpt: z.string().min(1, "L'extrait est requis."),
  time: z.string().min(1, "Le temps de lecture est requis."),
  date: z.string().min(1, "La date est requise."),
  image: z.string().min(1, "L'image est requise."),
  imageAlt: z.string().min(1, "Le texte alternatif de l'image est requis."),
  intro: z.string().min(1, "L'introduction est requise."),
  sections: z.array(
    z.object({
      id: z.string().min(1),
      title: z.string().min(1),
      paragraphs: z.array(z.string()),
    })
  ),
});

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  try {
    await connectToDatabase();
    const posts = await BlogPost.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ posts });
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des articles." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  try {
    await connectToDatabase();
    const body = await request.json();
    const result = blogPostSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const existing = await BlogPost.findOne({ slug: result.data.slug });
    if (existing) {
      return NextResponse.json(
        {
          error: {
            slug: ["Ce slug est déjà utilisé par un autre article."],
          },
        },
        { status: 400 }
      );
    }

    const post = await BlogPost.create(result.data);
    return NextResponse.json({ success: true, post }, { status: 201 });
  } catch (error) {
    console.error("Error creating blog post:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création de l'article." },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  try {
    await connectToDatabase();
    const body = await request.json();
    const { id, ...postData } = body;

    if (!id) {
      return NextResponse.json(
        { error: "L'identifiant de l'article est requis." },
        { status: 400 }
      );
    }

    const result = blogPostSchema.safeParse(postData);
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const existing = await BlogPost.findOne({
      slug: result.data.slug,
      _id: { $ne: id },
    });
    if (existing) {
      return NextResponse.json(
        {
          error: {
            slug: ["Ce slug est déjà utilisé par un autre article."],
          },
        },
        { status: 400 }
      );
    }

    const post = await BlogPost.findByIdAndUpdate(id, result.data, {
      new: true,
    });
    if (!post) {
      return NextResponse.json(
        { error: "Article introuvable." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, post });
  } catch (error) {
    console.error("Error updating blog post:", error);
    return NextResponse.json(
      { error: "Erreur lors de la modification de l'article." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { error: "L'identifiant est requis." },
      { status: 400 }
    );
  }

  try {
    await connectToDatabase();
    const post = await BlogPost.findByIdAndDelete(id);
    if (!post) {
      return NextResponse.json(
        { error: "Article introuvable." },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting blog post:", error);
    return NextResponse.json(
      { error: "Erreur lors de la suppression de l'article." },
      { status: 500 }
    );
  }
}
