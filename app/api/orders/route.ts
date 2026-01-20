import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  console.log('POST /api/orders - Request received');
  
  try {
    let body;
    try {
      body = await request.json();
      console.log('POST /api/orders - Body parsed successfully');
    } catch (parseError) {
      console.error('POST /api/orders - JSON parse error:', parseError);
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }

    // Validate required fields
    const {
      planId,
      planDuration,
      planPrice,
      planDisplayDuration,
      name,
      email,
      phone,
      address,
      city,
      state,
      country,
      zipCode,
    } = body;

    if (!planId || !planDuration || !planPrice || !planDisplayDuration) {
      return NextResponse.json(
        { error: 'Plan information is required' },
        { status: 400 }
      );
    }

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    // Create Supabase client
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

    // Insert order into database
    const { data, error } = await supabase.from('orders').insert([
      {
        plan_id: planId,
        plan_duration: planDuration,
        plan_price: planPrice,
        plan_display_duration: planDisplayDuration,
        customer_name: name.trim(),
        customer_email: email.trim().toLowerCase(),
        customer_phone: phone?.trim() || null,
        customer_address: address?.trim() || null,
        customer_city: city?.trim() || null,
        customer_state: state?.trim() || null,
        customer_country: country?.trim() || null,
        customer_zip_code: zipCode?.trim() || null,
        notes: null,
        status: 'pending',
      },
    ]).select();

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Failed to save order', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Order submitted successfully',
        orderId: data?.[0]?.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        message:
          error instanceof Error ? error.message : 'An unexpected error occurred',
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}
