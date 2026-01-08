import graphQLClient from './wordpress';
import {
  GET_ALL_POSTS,
  GET_POST_BY_SLUG,
  GET_ALL_PAGES,
  GET_PAGE_BY_SLUG,
  GET_RECENT_POSTS,
  GET_ALL_POST_SLUGS,
  GET_ALL_PAGE_SLUGS,
  GET_TESTIMONIALS,
} from './queries';

// Types
export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  date: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText: string;
    };
  };
  author?: {
    node: {
      name: string;
      avatar?: {
        url: string;
      };
    };
  };
  categories?: {
    nodes: Array<{
      name: string;
      slug: string;
    }>;
  };
  tags?: {
    nodes: Array<{
      name: string;
      slug: string;
    }>;
  };
}

export interface Page {
  id: string;
  title: string;
  slug: string;
  content: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText: string;
    };
  };
}

export interface Testimonial {
  id: string;
  title: string;
  content: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText: string;
    };
  };
  testimonialFields?: {
    clientName?: string;
    clientPosition?: string;
    clientCompany?: string;
    rating?: number;
  };
}

// Fetch all posts
export async function getAllPosts(): Promise<Post[]> {
  try {
    const data: any = await graphQLClient.request(GET_ALL_POSTS);
    return data.posts.nodes;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

// Fetch a single post by slug
export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const data: any = await graphQLClient.request(GET_POST_BY_SLUG, { slug });
    return data.post;
  } catch (error) {
    console.error(`Error fetching post with slug ${slug}:`, error);
    return null;
  }
}

// Fetch all pages
export async function getAllPages(): Promise<Page[]> {
  try {
    const data: any = await graphQLClient.request(GET_ALL_PAGES);
    return data.pages.nodes;
  } catch (error) {
    console.error('Error fetching pages:', error);
    return [];
  }
}

// Fetch a single page by slug
export async function getPageBySlug(slug: string): Promise<Page | null> {
  try {
    const data: any = await graphQLClient.request(GET_PAGE_BY_SLUG, { slug });
    return data.page;
  } catch (error) {
    console.error(`Error fetching page with slug ${slug}:`, error);
    return null;
  }
}

// Fetch recent posts (for homepage)
export async function getRecentPosts(count: number = 3): Promise<Post[]> {
  try {
    const data: any = await graphQLClient.request(GET_RECENT_POSTS, { first: count });
    return data.posts.nodes;
  } catch (error) {
    console.error('Error fetching recent posts:', error);
    return [];
  }
}

// Fetch all post slugs (for static generation)
export async function getAllPostSlugs(): Promise<string[]> {
  try {
    const data: any = await graphQLClient.request(GET_ALL_POST_SLUGS);
    return data.posts.nodes.map((post: { slug: string }) => post.slug);
  } catch (error) {
    console.error('Error fetching post slugs:', error);
    return [];
  }
}

// Fetch all page slugs (for static generation)
export async function getAllPageSlugs(): Promise<string[]> {
  try {
    const data: any = await graphQLClient.request(GET_ALL_PAGE_SLUGS);
    return data.pages.nodes.map((page: { slug: string }) => page.slug);
  } catch (error) {
    console.error('Error fetching page slugs:', error);
    return [];
  }
}

// Fetch testimonials
export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const data: any = await graphQLClient.request(GET_TESTIMONIALS);
    return data.testimonials?.nodes || [];
  } catch (error) {
    // Testimonials custom post type may not exist in WordPress yet
    console.warn('Testimonials not available. Set up "Testimonials" custom post type in WordPress.');
    return [];
  }
}
