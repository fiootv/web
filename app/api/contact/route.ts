import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    let body: Record<string, unknown>;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }

    const { firstName, lastName, email, phone, message } = body;

    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json(
        { error: 'First name, last name, email, and message are required' },
        { status: 400 }
      );
    }

    let supabase;
    try {
      supabase = createServerSupabaseClient();
    } catch (clientError) {
      console.error('Failed to create Supabase client:', clientError);
      return NextResponse.json(
        {
          error: 'Database configuration error',
          message:
            clientError instanceof Error
              ? clientError.message
              : 'Failed to initialize database connection',
        },
        { status: 500 }
      );
    }

    const { error } = await supabase.from('contact_submissions').insert([
      {
        first_name: String(firstName).trim(),
        last_name: String(lastName).trim(),
        email: String(email).trim().toLowerCase(),
        phone: phone ? String(phone).trim() : null,
        message: String(message).trim(),
      },
    ]);

    if (error) {
      console.error('Contact submission database error:', error);
      return NextResponse.json(
        { error: 'Failed to save your message', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you for reaching out. We\'ll get back to you soon.',
      },
      { status: 201 }
    );
  } catch (err) {
    console.error('Contact submission error:', err);
    return NextResponse.json(
      {
        error: 'Internal server error',
        message:
          err instanceof Error ? err.message : 'An unexpected error occurred',
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
