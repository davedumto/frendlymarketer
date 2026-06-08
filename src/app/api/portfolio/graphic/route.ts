import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { authenticateRequest } from '@/lib/auth';

// GET all graphic projects
export async function GET() {
  try {
    const projects = await prisma.graphicProject.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    });

    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error fetching graphic projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch graphic projects' },
      { status: 500 }
    );
  }
}

// POST create new graphic project (protected)
export async function POST(request: NextRequest) {
  try {
    const user = await authenticateRequest(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { title, image, order, isActive } = body;

    if (!image) {
      return NextResponse.json(
        { error: 'Image URL is required' },
        { status: 400 }
      );
    }

    const project = await prisma.graphicProject.create({
      data: {
        title: title || null,
        image,
        order: order || 0,
        isActive: isActive ?? true,
      },
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error('Error creating graphic project:', error);
    return NextResponse.json(
      { error: 'Failed to create graphic project' },
      { status: 500 }
    );
  }
}
