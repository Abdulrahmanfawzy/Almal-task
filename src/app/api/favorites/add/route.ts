// /app/api/favorites/add/route.ts
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import clientPromise from "@/lib/mongodb";

export async function POST(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db();

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    console.log("Token:", token);

    if (!token)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { city } = await req.json();
    console.log("City to save:", city);

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      email: string;
    };
    console.log("Decoded:", decoded);

    const usersCollection = db.collection("users"); // MongoDB Native
    const user = await usersCollection.findOne({ email: decoded.email });
    console.log("User found:", user);

    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    if (!user.favorites.includes(city)) {
      await usersCollection.updateOne(
        { email: decoded.email },
        { $push: { favorites: city } }
      );
    }

    return NextResponse.json({ message: "City added to favorites" });
  } catch (err) {
    console.error("❌ Error in favorites API:", err);
    return NextResponse.json({ error: "Error adding city" }, { status: 500 });
  }
}

