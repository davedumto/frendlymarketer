import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { toPublicPost } from '@/lib/blog';

interface RouteParams {
  params: Promise<{ slug: string }>;
}

// GET blog post by slug
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { slug } = await params;
    const { searchParams } = new URL(request.url);
    const format = searchParams.get('format');

    const post = await prisma.blogPost.findUnique({
      where: { slug },
    });

    if (!post) {
      return NextResponse.json({ error: 'Blog post not found' }, { status: 404 });
    }

    if (!post.isPublished) {
      return NextResponse.json({ error: 'Blog post not found' }, { status: 404 });
    }

    if (format === 'public' || format === 'wordpress') {
      return NextResponse.json(toPublicPost(post));
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog post' },
      { status: 500 }
    );
  }
}
