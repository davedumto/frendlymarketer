import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

interface RouteParams {
  params: Promise<{ slug: string }>;
}

// Transform local blog post to WordPress-compatible format
function toWordPressFormat(post: {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  coverImage: string | null;
  author: string;
  category: string | null;
  tags: string[];
  isPublished: boolean;
  publishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}) {
  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt || '',
    content: post.content,
    date: (post.publishedAt || post.createdAt).toISOString(),
    featuredImage: post.coverImage
      ? {
          node: {
            sourceUrl: post.coverImage,
            altText: post.title,
          },
        }
      : null,
    author: {
      node: {
        name: post.author,
        avatar: null,
      },
    },
    categories: post.category
      ? {
          nodes: [
            {
              name: post.category,
              slug: post.category.toLowerCase().replace(/\s+/g, '-'),
            },
          ],
        }
      : { nodes: [] },
    tags: {
      nodes: post.tags.map((tag) => ({
        name: tag,
        slug: tag.toLowerCase().replace(/\s+/g, '-'),
      })),
    },
  };
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

    // Only return published posts for public access
    if (!post.isPublished) {
      return NextResponse.json({ error: 'Blog post not found' }, { status: 404 });
    }

    if (format === 'wordpress') {
      return NextResponse.json(toWordPressFormat(post));
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
