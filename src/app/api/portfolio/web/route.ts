import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { authenticateRequest } from '@/lib/auth';

// GET all web projects
export async function GET() {
  try {
    const projects = await prisma.webProject.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    });

    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error fetching web projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch web projects' },
      { status: 500 }
    );
  }
}

// POST create new web project (protected)
export async function POST(request: NextRequest) {
  try {
    const user = await authenticateRequest(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { name, url, description, image, order } = body;

    if (!name || !url || !description) {
      return NextResponse.json(
        { error: 'Name, URL, and description are required' },
        { status: 400 }
      );
    }

    const project = await prisma.webProject.create({
      data: {
        name,
        url,
        description,
        image: image || null,
        order: order || 0,
      },
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error('Error creating web project:', error);
    return NextResponse.json(
      { error: 'Failed to create web project' },
      { status: 500 }
    );
  }
}
