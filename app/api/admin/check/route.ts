import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const isAuthenticated =
    cookieStore.get("admin_session")?.value === "2345_authenticated";

  return NextResponse.json({ authenticated: isAuthenticated });
}
