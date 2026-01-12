import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const contactFormSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(5),
  message: z.string().min(10),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate request data
    const validatedData = contactFormSchema.parse(body);

    if (!process.env.RESEND_API_KEY || !resend) {
      console.error('RESEND_API_KEY is not set');
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact Form <onboarding@resend.dev>',
      to: [process.env.CONTACT_EMAIL || 'your-email@example.com'],
      subject: `New Contact Form Submission: ${validatedData.subject}`,
      replyTo: validatedData.email,
      text: `
        Name: ${validatedData.name}
        Email: ${validatedData.email}
        Subject: ${validatedData.subject}
        Message: ${validatedData.message}
      `,
    });

    // Optional: Send Telegram notification if BOT_TOKEN and CHAT_ID are set
    if (process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID) {
      try {
        const telegramMsg = `
📸 *New Portfolio Inquiry*
👤 *Name:* ${validatedData.name}
📧 *Email:* ${validatedData.email}
📝 *Subject:* ${validatedData.subject}
💬 *Message:* ${validatedData.message}
        `;
        await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: process.env.TELEGRAM_CHAT_ID,
            text: telegramMsg,
            parse_mode: 'Markdown',
          }),
        });
      } catch (tgErr) {
        console.error('Telegram notification error:', tgErr);
      }
    }

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: err.issues },
        { status: 400 }
      );
    }
    console.error('Contact form error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
