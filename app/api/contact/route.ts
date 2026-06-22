import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Lead from "@/models/Lead";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères."),
  email: z.string().email("Format d'adresse e-mail invalide."),
  phone: z.string().optional().nullable(),
  company: z.string().optional().nullable(),
  service: z.string().min(1, "Veuillez sélectionner un service."),
  message: z.string().min(20, "Le message doit contenir au moins 20 caractères."),
});

export async function POST(request: Request) {
  try {
    await connectToDatabase();

    const body = await request.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const lead = await Lead.create(result.data);

    // Attempt to send email via Resend API if configured
    const resendApiKey = process.env.RESEND_API_KEY;
    const contactEmail =
      process.env.CONTACT_EMAIL || "contact@fullbridgedigital.com";

    if (resendApiKey) {
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: "Full Bridge Digital <noreply@fullbridgedigital.com>",
            to: contactEmail,
            subject: `Nouveau lead : ${result.data.name} - ${result.data.service}`,
            html: `
              <h2>Nouveau contact reçu</h2>
              <p><strong>Nom :</strong> ${result.data.name}</p>
              <p><strong>Email :</strong> ${result.data.email}</p>
              <p><strong>Téléphone :</strong> ${result.data.phone || "Non spécifié"}</p>
              <p><strong>Entreprise :</strong> ${result.data.company || "Non spécifié"}</p>
              <p><strong>Service demandé :</strong> ${result.data.service}</p>
              <p><strong>Message :</strong></p>
              <p>${result.data.message.replace(/\n/g, "<br>")}</p>
            `,
          }),
        });
      } catch (emailError) {
        console.error("Failed to send notification email:", emailError);
      }
    }

    return NextResponse.json({ success: true, lead }, { status: 201 });
  } catch (error) {
    console.error("API contact error:", error);
    return NextResponse.json(
      { error: "Une erreur interne est survenue sur le serveur." },
      { status: 500 }
    );
  }
}
