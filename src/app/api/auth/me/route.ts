// app/api/auth/me/route.ts
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import clientPromise from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export async function GET() {
  const token = cookies().get('token')?.value;

  if (!token) {
    return NextResponse.json({ user: null }, { status: 200 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
    const client = await clientPromise;
    const db = client.db();
    const user = await db.collection('users').findOne(
      { _id: new (require('mongodb').ObjectId)(decoded.userId) },
      { projection: { password: 0 } }
    );

    return NextResponse.json({ user });
  } catch (err) {
    return NextResponse.json({ user: null }, { status: 200 });
  }
}
