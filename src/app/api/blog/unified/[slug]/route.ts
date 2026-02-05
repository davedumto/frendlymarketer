import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getPostBySlug as getWordPressPostBySlug } from '@/lib/api';

interface RouteParams {
    params: Promise<{ slug: string }>;
}

// Transform local blog post to WordPress-compatible format
function toWordPressFormat(post: any) {
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
            nodes: post.tags.map((tag: string) => ({
                name: tag,
                slug: tag.toLowerCase().replace(/\s+/g, '-'),
            })),
        },
    };
}

// GET blog post by slug from both WordPress and local database
export async function GET(_request: Request, { params }: RouteParams) {
    try {
        const { slug } = await params;

        // First, try to find in local database
        const localPost = await prisma.blogPost.findUnique({
            where: { slug },
        });

        // If found in local database and published, return it
        if (localPost && localPost.isPublished) {
            return NextResponse.json(toWordPressFormat(localPost));
        }

        // If not found locally, try WordPress
        const wordpressPost = await getWordPressPostBySlug(slug);

        if (wordpressPost) {
            return NextResponse.json(wordpressPost);
        }

        // Not found in either source
        return NextResponse.json({ error: 'Blog post not found' }, { status: 404 });
    } catch (error) {
        console.error('Error fetching blog post:', error);
        return NextResponse.json(
            { error: 'Failed to fetch blog post' },
            { status: 500 }
        );
    }
}
