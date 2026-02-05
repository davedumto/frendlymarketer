import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAllPosts as getWordPressPosts } from '@/lib/api';

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

export async function GET() {
    try {
        // Fetch from WordPress
        const wordpressPosts = await getWordPressPosts();

        // Fetch from local database
        const localPosts = await prisma.blogPost.findMany({
            where: { isPublished: true },
            orderBy: { createdAt: 'desc' },
        });

        // Transform local posts to WordPress format
        const transformedLocalPosts = localPosts.map(toWordPressFormat);

        // Combine both sources
        const allPosts = [...wordpressPosts, ...transformedLocalPosts];

        // Sort by date (newest first)
        allPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

        return NextResponse.json(allPosts);
    } catch (error) {
        console.error('Error fetching all posts:', error);
        return NextResponse.json(
            { error: 'Failed to fetch posts' },
            { status: 500 }
        );
    }
}
