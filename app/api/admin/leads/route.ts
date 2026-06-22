import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { connectToDatabase } from "@/lib/mongodb";
import Lead from "@/models/Lead";

async function isAuthenticated() {
  const cookieStore = await cookies();
  return cookieStore.get("admin_session")?.value === "2345_authenticated";
}

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  try {
    await connectToDatabase();
    const leads = await Lead.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ leads });
  } catch (error) {
    return NextResponse.json(
      { error: "Une erreur est survenue lors de la récupération." },
      { status: 500 }
    );
  }
}
