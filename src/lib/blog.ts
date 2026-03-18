import prisma from '@/lib/prisma';
import { getAllPosts as getWordPressPosts, getPostBySlug as getWordPressPostBySlug } from '@/lib/api';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function toWordPressFormat(post: any) {
  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt || '',
    content: post.content,
    date: (post.publishedAt || post.createdAt).toISOString(),
    featuredImage: post.coverImage
      ? { node: { sourceUrl: post.coverImage, altText: post.title } }
      : undefined,
    author: { node: { name: post.author, avatar: null } },
    categories: post.category
      ? { nodes: [{ name: post.category, slug: post.category.toLowerCase().replace(/\s+/g, '-') }] }
      : { nodes: [] },
    tags: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      nodes: post.tags.map((tag: any) => ({
        name: tag,
        slug: tag.toLowerCase().replace(/\s+/g, '-'),
      })),
    },
  };
}

export async function getAllBlogPosts() {
  try {
    const [wordpressPosts, localPosts] = await Promise.all([
      getWordPressPosts(),
      prisma.blogPost.findMany({ where: { isPublished: true }, orderBy: { createdAt: 'desc' } }),
    ]);
    const all = [...wordpressPosts, ...localPosts.map(toWordPressFormat)];
    all.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return all;
  } catch {
    return [];
  }
}

export async function getBlogPostBySlug(slug: string) {
  try {
    const localPost = await prisma.blogPost.findUnique({ where: { slug } });
    if (localPost?.isPublished) return toWordPressFormat(localPost);
    return (await getWordPressPostBySlug(slug)) ?? null;
  } catch {
    return null;
  }
}
