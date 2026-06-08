import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { authenticateRequest } from '@/lib/auth';

interface RouteParams {
  params: Promise<{ id: string }>;
}

// PATCH — toggle read state
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  const user = await authenticateRequest(request);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { id } = await params;
    const body = await request.json();
    const { isRead } = body;

    const updated = await prisma.contactSubmission.update({
      where: { id },
      data: { isRead: Boolean(isRead) },
    });
    return NextResponse.json(updated);
  } catch (error) {
    console.error('Failed to update submission:', error);
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
  }
}

// DELETE — remove a submission
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const user = await authenticateRequest(request);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { id } = await params;
    await prisma.contactSubmission.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete submission:', error);
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}
