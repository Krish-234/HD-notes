import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import crypto from "crypto";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  const existingOTP = await prisma.oTP.findFirst({
    where: { email },
  });

    if (existingOTP && existingOTP.expiresAt > new Date()) {
        return NextResponse.json({ error: "An OTP has already been sent to this email" }, { status: 402 });
    }

    if (existingOTP && existingOTP.expiresAt < new Date()) {
        await prisma.oTP.delete({ where: { id: existingOTP.id } });
    }

  // Generate a 6-digit OTP
  const otp = crypto.randomInt(100000, 999999).toString();

  // Save OTP in the database with a 5-minute expiration

  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
  await prisma.oTP.create({
    data: { email, otp, expiresAt },
  });

  // Send OTP via email
  const transporter = nodemailer.createTransport({
    service: "gmail", // Or use any other email service
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your OTP Code | Notes App",
    text: `Your OTP is ${otp}. It will expire in 5 minutes. 5 minutes is a lot please take it slowly :). - Manish`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to send OTP" }, { status: 500 });
  }
}
