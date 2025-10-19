import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

/**
 * ENV required (set in Vercel Project Settings -> Environment Variables):
 *  - SMTP_HOST (e.g., smtp.gmail.com)
 *  - SMTP_PORT (e.g., 465)
 *  - SMTP_USER (full email address)
 *  - SMTP_PASS (app password)
 *  - TO_EMAIL (destination, e.g., kael.laurent.official@gmail.com)
 * Optional (for strict rotating signatures storage later):
 *  - (future) KV integration
 */

const SIGNATURES = [
  "— Kael Laurent · Firma 1",
  "— Kael Laurent · Firma 2",
  "— Kael Laurent · Firma 3",
  "— Kael Laurent · Firma 4",
  "— Kael Laurent · Firma 5",
];

function pickSignature() {
  // Deterministic daily rotation (cycles every 5 days).
  const now = new Date();
  const dayOfYear = Math.floor((Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) - Date.UTC(now.getFullYear(),0,0)) / 86400000);
  return SIGNATURES[dayOfYear % SIGNATURES.length];
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Faltan campos.' }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 465),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const sig = pickSignature();

    const info = await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.TO_EMAIL,
      subject: `Kael te escucha — Nuevo mensaje de ${name}`,
      replyTo: email,
      text: `De: ${name} <${email}>

${message}

${sig}`,
      html: `<p><strong>De:</strong> ${name} &lt;${email}&gt;</p><p>${message.replace(/\n/g,'<br/>')}</p><p>${sig}</p>`,
    });

    return NextResponse.json({ ok: true, id: info.messageId });
  } catch (e:any) {
    console.error(e);
    return NextResponse.json({ error: e?.message || 'Error al enviar' }, { status: 500 });
  }
}
