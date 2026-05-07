import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';
import { authenticateRequest } from '@/lib/auth';
import { toPublicPost } from '@/lib/blog';

// GET all blog posts
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const published = searchParams.get('published');
    const format = searchParams.get('format');

    const where = published === 'true' ? { isPublished: true } : {};

    const posts = await prisma.blogPost.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    if (format === 'public' || format === 'wordpress') {
      return NextResponse.json(posts.map(toPublicPost));
    }

    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}

// POST create new blog post (protected)
export async function POST(request: NextRequest) {
  try {
    const user = await authenticateRequest(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { title, slug, content, excerpt, coverImage, author, category, tags, isPublished } = body;

    if (!title || !slug || !content || !author) {
      return NextResponse.json(
        { error: 'Title, slug, content, and author are required' },
        { status: 400 }
      );
    }

    // Check if slug already exists
    const existingPost = await prisma.blogPost.findUnique({ where: { slug } });
    if (existingPost) {
      return NextResponse.json(
        { error: 'A post with this slug already exists' },
        { status: 400 }
      );
    }

    // Convert plain text to HTML if needed (preserve formatting)
    let formattedContent = content;

    // Check if content is plain text (doesn't contain HTML tags)
    if (!content.includes('<p>') && !content.includes('<div>') && !content.includes('<br')) {
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

    // Auto-generate excerpt if not provided
    let finalExcerpt = excerpt;
    if (!finalExcerpt || finalExcerpt.trim() === '') {
      // Strip HTML tags and get first 150 characters
      const plainText = formattedContent.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
      finalExcerpt = plainText.length > 150
        ? plainText.substring(0, 150) + '...'
        : plainText;
    }

    const post = await prisma.blogPost.create({
      data: {
        title,
        slug,
        content: formattedContent,
        excerpt: finalExcerpt,
        coverImage: coverImage || null,
        author,
        category: category || null,
        tags: tags || [],
        isPublished: isPublished || false,
        publishedAt: isPublished ? new Date() : null,
      },
    });

    revalidatePath('/');
    revalidatePath('/blog');
    revalidatePath(`/blog/${post.slug}`);

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json(
      { error: 'Failed to create blog post' },
      { status: 500 }
    );
  }
}
