import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const { passcode } = await request.json();

    if (passcode === "2345") {
      const cookieStore = await cookies();
      const host = request.headers.get("host") || "";
      const isLocalhost = host.includes("localhost") || host.includes("127.0.0.1") || host.includes("172.20.10.3");

      cookieStore.set("admin_session", "2345_authenticated", {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production" && !isLocalhost,
        sameSite: "lax",
        maxAge: 60 * 60 * 24, // 1 day
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { error: "Code d'accès incorrect." },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Une erreur est survenue." },
      { status: 500 }
    );
  }
}
