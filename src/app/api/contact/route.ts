import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { authenticateRequest } from '@/lib/auth';

// Public — submit a new contact form entry
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, company, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Please fill in all required fields (Name, Email, Message)' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // Persist locally first — single source of truth for the admin inbox
    await prisma.contactSubmission.create({
      data: {
        name,
        email,
        phone: phone || null,
        company: company || null,
        message,
      },
    });

    // Best-effort email forward via WordPress. Failure here does NOT fail the
    // request — the submission is already saved and visible in the admin.
    try {
      const wpRes = await fetch(
        'https://frendlymarqeter.com/wp-json/frendly/v1/contact',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name,
            email,
            phone: phone || '',
            company: company || '',
            message,
          }),
        }
      );
      if (!wpRes.ok) {
        console.warn('WordPress email forward failed:', wpRes.status);
      }
    } catch (err) {
      console.warn('WordPress email forward errored:', err);
    }

    return NextResponse.json({
      success: true,
      message: 'Thanks — your message was received. We\'ll get back to you shortly.',
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again or email us directly at info@frendlymarqeter.com' },
      { status: 500 }
    );
  }
}

// Protected — list submissions for the admin inbox
export async function GET(request: NextRequest) {
  const user = await authenticateRequest(request);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const submissions = await prisma.contactSubmission.findMany({
      orderBy: { createdAt: 'desc' },
    });
    const unreadCount = submissions.filter((s) => !s.isRead).length;
    return NextResponse.json({ submissions, unreadCount });
  } catch (error) {
    console.error('Failed to list submissions:', error);
    return NextResponse.json({ error: 'Failed to load submissions' }, { status: 500 });
  }
}
