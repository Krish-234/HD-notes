"use server";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { cookies, } from "next/headers";

const URLORIGIN = "https://hdfsa.vercel.app";

export const sendOTP = async (email: string) => {
  const res = await fetch(`${URLORIGIN}/api/send-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  const data = await res.json();
  if (res.ok) {
    return { success: true };
  } else {
    return { success: false, error: data.error };
  }
};

export const verifyOTP = async (
  formData: { email: string; otp: string; name: string },
  dob: Date
) => {
 const res = await fetch(`${URLORIGIN}/api/verify-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...formData, dob: dob.toString() }),
  });

  const data = await res.json();
  if (res.ok) {
    const token = await generateJWT(data.user.id, data.user.email);
    const cookieStore = await cookies();
    cookieStore.set("token", token, {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
      httpOnly: true,
      sameSite: "strict",
    });
    return { success: true, user: data.user };
  } else {
    return { success: false, error: data.error };
  }
};

export const generateJWT = async (userId: string, email: string) => {
  const payload = {
    id: userId, // User ID
    email: email, // User Email
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "1h" });
  return token;
};

export const verifySignIn = async (email: string, otp: string) => {
  const res = await fetch(`${URLORIGIN}/api/verify-signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, otp }),
  });

  const data = await res.json();
  if (res.ok) {
    const token = await generateJWT(data.user.id, data.user.email);
    const cookieStore = await cookies();
    cookieStore.set("token", token, {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
      httpOnly: true,
      sameSite: "strict",
    });
    return { success: true, user: data.user };
  } else {
    return { success: false, error: data.error };
  }
};

export const signOut = async () => {
  const cookieStore = await cookies();
  cookieStore.set("token", "", {
    expires: new Date(0),
    httpOnly: true,
    sameSite: "strict",
  });
};

export const getServerSession = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) {
    return { user: null, session: false };
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
      email: string;
    };
    const prisma = new PrismaClient();
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });
    if (!user) {
      return { user: null, session: false };
    }
    return { user: user, session: true };
  } catch (error) {
    return { user: null, session: false, error };
  }
};

export const createNote = async (title: string, content: string) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) {
    return { success: false, error: "Unauthorized" };
  }
  const res = await fetch(`${URLORIGIN}/api/notes/create`, {
    method: "POST",
    body: JSON.stringify({ title, content, token }),
  });

  const data = await res.json();
  if (res.ok) {
    return { success: true, note: data.note };
  } else {
    return { success: false, error: data.error };
  }
};

export const getAllUserNotes = async (userId: string) => {
  const prisma = new PrismaClient();
  const notes = await prisma.note.findMany({
    where: {
      userId,
    },
  });

  return notes;
};

export const editNote = async (noteId: string, title: string, content: string) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) {
    return { success: false, error: "Unauthorized" };
  }
  const res = await fetch(`${URLORIGIN}/api/notes/edit`, {
    method: "POST",
    body: JSON.stringify({ noteId, title, content, token }),
  });

  const data = await res.json();
  if (res.ok) {
    return { success: true, note: data.note };
  } else {
    return { success: false, error: data.error };
  }
};

export const deleteNote = async (noteId: string) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) {
    return { success: false, error: "Unauthorized" };
  }
  const res = await fetch(`${URLORIGIN}/api/notes/delete`, {
    method: "POST",
    body: JSON.stringify({ id: noteId, token }),
  });

  const data = await res.json();
  if (res.ok) {
    return { success: true };
  } else {
    return { success: false, error: data.error };
  }
}
