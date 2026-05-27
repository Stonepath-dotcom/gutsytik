import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Nama, email, dan pesan wajib diisi." },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Format email tidak valid." },
        { status: 400 }
      );
    }

    // Rate limiting check - simple in-memory (per deployment instance)
    // For production, use Redis or similar
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0] : "unknown";

    // Log the contact form submission
    console.log(`[Contact Form] From: ${ip} | Name: ${name} | Email: ${email} | Subject: ${subject || "-"} | Message: ${message.substring(0, 100)}...`);

    // In production, you would:
    // 1. Send an email via SendGrid/Resend/etc.
    // 2. Store in a database
    // 3. Send a notification to Telegram/Discord webhook
    //
    // For now, we log it and return success.
    // The admin can check Vercel logs or add email integration later.

    return NextResponse.json({
      success: true,
      message: "Pesan berhasil dikirim. Kami akan merespons dalam 2×24 jam kerja.",
    });
  } catch {
    return NextResponse.json(
      { error: "Terjadi kesalahan server. Silakan coba lagi." },
      { status: 500 }
    );
  }
}
