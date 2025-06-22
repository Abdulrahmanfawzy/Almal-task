import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import clientPromise from "@/lib/mongodb";

export async function POST(req: NextRequest) {
  const client = await clientPromise;
  const db = client.db();
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { city } = await req.json();
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { email: string };

    return NextResponse.json({ message: "City removed from favorites" });
  } catch (err) {
    return NextResponse.json({ error: "Error removing city", err }, { status: 500 });
  }
}
