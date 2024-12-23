import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function POST(req: Request) {
  const prisma = new PrismaClient();
  const body = await req.json();

  const { noteId, title, content } = body;

  try {
    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 }
      );
    }

    const note = await prisma.note.update({
      where: {
        id: noteId,
      },
      data: {
        title,
        content,
        editedAt: new Date(),
      },
    });

    return NextResponse.json(note);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 401 });
  }
}
