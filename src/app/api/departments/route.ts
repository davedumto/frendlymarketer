import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { authenticateRequest } from '@/lib/auth';

// GET all departments (public)
export async function GET() {
  try {
    const departments = await prisma.department.findMany({
      orderBy: { order: 'asc' },
    });
    return NextResponse.json(departments);
  } catch (error) {
    console.error('Error fetching departments:', error);
    return NextResponse.json({ error: 'Failed to fetch departments' }, { status: 500 });
  }
}

// POST create department (protected)
export async function POST(request: NextRequest) {
  try {
    const user = await authenticateRequest(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { name, order } = body;

    if (!name) {
      return NextResponse.json({ error: 'name is required' }, { status: 400 });
    }

    const department = await prisma.department.create({
      data: { name, order: order ?? 0 },
    });

    return NextResponse.json(department, { status: 201 });
  } catch (error: unknown) {
    const isUnique = (error as { code?: string })?.code === 'P2002';
    if (isUnique) {
      return NextResponse.json({ error: 'A section with that name already exists' }, { status: 409 });
    }
    console.error('Error creating department:', error);
    return NextResponse.json({ error: 'Failed to create department' }, { status: 500 });
  }
}
