import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(req: Request) {
  const { name, email, password } = await req.json();
  
  if (!email || !password) {
    return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
  }

  const client = await clientPromise;
  const db = client.db();
  const existingUser = await db.collection('users').findOne({ email });

  if (existingUser) {
    return NextResponse.json({ error: 'User already exists' }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await db.collection('users').insertOne({ name, email, password: hashedPassword, favorites: [] });
  const user = await db.collection('users').findOne({ _id: newUser.insertedId });

  
  const token = jwt.sign(
    { userId: newUser.insertedId, email },
    process.env.JWT_SECRET!,
    { expiresIn: '7d' }
  );

  // 🔐 Set Cookie
  const response = NextResponse.json({ message: 'User created successfully', user:user });

  response.cookies.set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  });

  return response;
}
