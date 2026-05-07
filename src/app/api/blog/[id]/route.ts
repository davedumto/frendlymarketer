import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';
import { authenticateRequest } from '@/lib/auth';

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET single blog post
export async function GET(_request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    const post = await prisma.blogPost.findUnique({
      where: { id },
    });

    if (!post) {
      return NextResponse.json({ error: 'Blog post not found' }, { status: 404 });
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

// PUT update blog post (protected)
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const user = await authenticateRequest(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { title, slug, content, excerpt, coverImage, author, category, tags, isPublished } = body;

    const existing = await prisma.blogPost.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: 'Blog post not found' }, { status: 404 });
    }

    // Check if new slug conflicts with another post
    if (slug && slug !== existing.slug) {
      const slugExists = await prisma.blogPost.findUnique({ where: { slug } });
      if (slugExists) {
        return NextResponse.json(
          { error: 'A post with this slug already exists' },
          { status: 400 }
        );
      }
    }

    // Handle publish date
    let publishedAt = existing.publishedAt;
    if (isPublished && !existing.isPublished) {
      publishedAt = new Date();
    } else if (!isPublished) {
      publishedAt = null;
    }

    // Convert plain text to HTML if needed (preserve formatting)
    let formattedContent = content;

    if (content && !content.includes('<p>') && !content.includes('<div>') && !content.includes('<br')) {
      // Split by double line breaks (paragraphs)
      const paragraphs = content.split(/\n\n+/);
      formattedContent = paragraphs
        .map((para: string) => {
          // Replace single line breaks with <br> within paragraphs
          const withBreaks = para.trim().replace(/\n/g, '<br>');
          return withBreaks ? `<p>${withBreaks}</p>` : '';
        })
        .filter((p: string) => p)
        .join('\n');
    }

    // Auto-generate excerpt if not provided but content is provided
    let finalExcerpt = excerpt;
    if (formattedContent && (!finalExcerpt || finalExcerpt.trim() === '')) {
      // Strip HTML tags and get first 150 characters
      const plainText = formattedContent.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
      finalExcerpt = plainText.length > 150
        ? plainText.substring(0, 150) + '...'
        : plainText;
    }

    const post = await prisma.blogPost.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(slug !== undefined && { slug }),
        ...(formattedContent !== undefined && { content: formattedContent }),
        ...(finalExcerpt !== undefined && { excerpt: finalExcerpt }),
        ...(coverImage !== undefined && { coverImage }),
        ...(author !== undefined && { author }),
        ...(category !== undefined && { category }),
        ...(tags !== undefined && { tags }),
        ...(isPublished !== undefined && { isPublished }),
        publishedAt,
      },
    });

    revalidatePath('/');
    revalidatePath('/blog');
    revalidatePath(`/blog/${existing.slug}`);
    if (post.slug !== existing.slug) revalidatePath(`/blog/${post.slug}`);

    return NextResponse.json(post);
  } catch (error) {
    console.error('Error updating blog post:', error);
    return NextResponse.json(
      { error: 'Failed to update blog post' },
      { status: 500 }
    );
  }
}

// DELETE blog post (protected)
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const user = await authenticateRequest(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    const existing = await prisma.blogPost.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: 'Blog post not found' }, { status: 404 });
    }

    await prisma.blogPost.delete({ where: { id } });

    revalidatePath('/');
    revalidatePath('/blog');
    revalidatePath(`/blog/${existing.slug}`);

    return NextResponse.json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return NextResponse.json(
      { error: 'Failed to delete blog post' },
      { status: 500 }
    );
  }
}
