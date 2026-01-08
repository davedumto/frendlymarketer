import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, company, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Please fill in all required fields (Name, Email, Message)' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    console.log('📧 Submitting to WordPress custom endpoint...');

    // Submit to WordPress custom endpoint
    const wordpressResponse = await fetch(
      'https://frendlymarqeter.com/wp-json/frendly/v1/contact',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          phone: phone || '',
          company: company || '',
          message,
        }),
      }
    );

    const result = await wordpressResponse.json();

    if (wordpressResponse.ok && result.success) {
      console.log('✅ Email sent successfully via WordPress');
      return NextResponse.json({ 
        success: true, 
        message: result.message 
      });
    } else {
      console.error('❌ WordPress error:', result);
      return NextResponse.json(
        { error: result.message || 'Failed to submit form' },
        { status: wordpressResponse.status || 400 }
      );
    }

  } catch (error) {
    console.error('❌ Contact form error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again or email us directly at info@frendlymarqeter.com' },
      { status: 500 }
    );
  }
}
