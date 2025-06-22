import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { email: string };
    const client = await clientPromise;
    const db = client.db();
    const user = await db.collection("users").findOne({ email: decoded.email });

    if (!user || !user.favorites) {
      return NextResponse.json({ favorites: [] });
    }

    return NextResponse.json({ favorites: user.favorites });
  } catch (err) {
    console.error("Error fetching favorites:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
