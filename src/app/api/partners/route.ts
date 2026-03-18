import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { authenticateRequest } from '@/lib/auth';

// GET all active partners (public)
export async function GET() {
  try {
    const partners = await prisma.partner.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    });
    return NextResponse.json(partners);
  } catch (error) {
    console.error('Error fetching partners:', error);
    return NextResponse.json({ error: 'Failed to fetch partners' }, { status: 500 });
  }
}

// POST create partner (protected)
export async function POST(request: NextRequest) {
  try {
    const user = await authenticateRequest(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { name, logoUrl, website, order } = body;

    if (!name || !logoUrl) {
      return NextResponse.json({ error: 'name and logoUrl are required' }, { status: 400 });
    }

    const partner = await prisma.partner.create({
      data: {
        name,
        logoUrl,
        website: website || null,
        order: order ?? 0,
      },
    });

    return NextResponse.json(partner, { status: 201 });
  } catch (error) {
    console.error('Error creating partner:', error);
    return NextResponse.json({ error: 'Failed to create partner' }, { status: 500 });
  }
}
