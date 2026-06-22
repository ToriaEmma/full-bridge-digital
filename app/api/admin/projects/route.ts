import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { connectToDatabase } from "@/lib/mongodb";
import Project from "@/models/Project";
import { z } from "zod";

async function isAuthenticated() {
  const cookieStore = await cookies();
  return cookieStore.get("admin_session")?.value === "2345_authenticated";
}

const projectSchema = z.object({
  year: z.string().min(1, "L'année est requise."),
  client: z.string().min(1, "Le client est requis."),
  title: z.string().min(1, "Le titre est requis."),
  image: z.string().min(1, "L'image est requise."),
  alt: z.string().min(1, "Le texte alternatif est requis."),
  className: z.string().min(1, "La disposition (classe CSS) est requise."),
});

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  try {
    await connectToDatabase();
    const projects = await Project.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ projects });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des projets." },
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
    const result = projectSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const project = await Project.create(result.data);
    return NextResponse.json({ success: true, project }, { status: 201 });
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création du projet." },
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
    const { id, ...projectData } = body;

    if (!id) {
      return NextResponse.json(
        { error: "L'identifiant du projet est requis." },
        { status: 400 }
      );
    }

    const result = projectSchema.safeParse(projectData);
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const project = await Project.findByIdAndUpdate(id, result.data, {
      new: true,
    });
    if (!project) {
      return NextResponse.json(
        { error: "Projet introuvable." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, project });
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json(
      { error: "Erreur lors de la modification du projet." },
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
    const project = await Project.findByIdAndDelete(id);
    if (!project) {
      return NextResponse.json(
        { error: "Projet introuvable." },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json(
      { error: "Erreur lors de la suppression du projet." },
      { status: 500 }
    );
  }
}
