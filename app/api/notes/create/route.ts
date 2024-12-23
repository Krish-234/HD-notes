import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

// POST /api/notes
export async function POST(req: Request) {
  const prisma = new PrismaClient();  
  const body = await req.json();

  const { title, content, token } = body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
      email: string;
    };

    const userId = decoded.id;
    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 }
      );
    }

    const note = await prisma.note.create({
      data: {
        title,
        content,
        userId,
        editedAt: new Date(),
      },
    });

    return NextResponse.json(note);
  } catch (error) {
    return NextResponse.json(
      { error: error },
      { status: 401 },
    );
  }
}
