import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { authenticateRequest } from '@/lib/auth';

interface RouteParams {
  params: Promise<{ id: string }>;
}

// PUT update partner (protected)
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const user = await authenticateRequest(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { name, logoUrl, website, order, isActive } = body;

    const existing = await prisma.partner.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: 'Partner not found' }, { status: 404 });
    }

    const partner = await prisma.partner.update({
      where: { id },
      data: {
        ...(name !== undefined && { name }),
        ...(logoUrl !== undefined && { logoUrl }),
        ...(website !== undefined && { website }),
        ...(order !== undefined && { order }),
        ...(isActive !== undefined && { isActive }),
      },
    });

    return NextResponse.json(partner);
  } catch (error) {
    console.error('Error updating partner:', error);
    return NextResponse.json({ error: 'Failed to update partner' }, { status: 500 });
  }
}

// DELETE partner (protected)
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const user = await authenticateRequest(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const existing = await prisma.partner.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: 'Partner not found' }, { status: 404 });
    }

    await prisma.partner.delete({ where: { id } });
    return NextResponse.json({ message: 'Partner deleted successfully' });
  } catch (error) {
    console.error('Error deleting partner:', error);
    return NextResponse.json({ error: 'Failed to delete partner' }, { status: 500 });
  }
}
