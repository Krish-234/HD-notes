import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { email, otp } = await req.json();

  if (!email || !otp) {
    return NextResponse.json(
      { error: "Email & OTP are required" },
      { status: 400 }
    );
  }

  // Validate OTP
  const otpRecord = await prisma.oTP.findFirst({
    where: { email, otp },
  });

  if (!otpRecord) {
    return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
  }

  if (otpRecord.expiresAt < new Date()) {
    return NextResponse.json({ error: "OTP expired" }, { status: 400 });
  }

  // Clean up OTP record
  await prisma.oTP.delete({ where: { id: otpRecord.id } });

  await prisma.oTP.deleteMany({
    where: { email },
  });

  const user = await prisma.user.findFirst({
    where: { email },
  });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 400 });
  }

  const response = NextResponse.json({ message: "Signin successful", user });
  return response;
}
