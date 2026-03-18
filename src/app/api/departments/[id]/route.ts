import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { authenticateRequest } from '@/lib/auth';

interface RouteParams {
  params: Promise<{ id: string }>;
}

// PUT update department (protected)
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const user = await authenticateRequest(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { name, order } = body;

    const existing = await prisma.department.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: 'Department not found' }, { status: 404 });
    }

    const department = await prisma.department.update({
      where: { id },
      data: {
        ...(name !== undefined && { name }),
        ...(order !== undefined && { order }),
      },
    });

    return NextResponse.json(department);
  } catch (error: unknown) {
    const isUnique = (error as { code?: string })?.code === 'P2002';
    if (isUnique) {
      return NextResponse.json({ error: 'A section with that name already exists' }, { status: 409 });
    }
    console.error('Error updating department:', error);
    return NextResponse.json({ error: 'Failed to update department' }, { status: 500 });
  }
}

// DELETE department (protected) — only if no team members assigned
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const user = await authenticateRequest(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const existing = await prisma.department.findUnique({
      where: { id },
      include: { _count: { select: { teamMembers: true } } },
    });

    if (!existing) {
      return NextResponse.json({ error: 'Department not found' }, { status: 404 });
    }

    if (existing._count.teamMembers > 0) {
      return NextResponse.json(
        { error: `Cannot delete — ${existing._count.teamMembers} team member(s) are assigned to this section. Reassign them first.` },
        { status: 409 }
      );
    }

    await prisma.department.delete({ where: { id } });
    return NextResponse.json({ message: 'Section deleted successfully' });
  } catch (error) {
    console.error('Error deleting department:', error);
    return NextResponse.json({ error: 'Failed to delete department' }, { status: 500 });
  }
}
