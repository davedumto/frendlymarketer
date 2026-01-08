import { gql } from 'graphql-request';

// Query for all posts (blog)
export const GET_ALL_POSTS = gql`
  query GetAllPosts {
    posts(first: 100) {
      nodes {
        id
        title
        slug
        excerpt
        date
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        author {
          node {
            name
          }
        }
        categories {
          nodes {
            name
            slug
          }
        }
      }
    }
  }
`;

// Query for a single post by slug
export const GET_POST_BY_SLUG = gql`
  query GetPostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      id
      title
      content
      excerpt
      date
      slug
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
      author {
        node {
          name
          avatar {
            url
          }
        }
      }
      categories {
        nodes {
          name
          slug
        }
      }
      tags {
        nodes {
          name
          slug
        }
      }
    }
  }
`;

// Query for all pages
export const GET_ALL_PAGES = gql`
  query GetAllPages {
    pages(first: 100) {
      nodes {
        id
        title
        slug
        content
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
  }
`;

// Query for a single page by slug
export const GET_PAGE_BY_SLUG = gql`
  query GetPageBySlug($slug: ID!) {
    page(id: $slug, idType: URI) {
      id
      title
      content
      slug
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
    }
  }
`;

// Query for recent posts (for homepage blog section)
export const GET_RECENT_POSTS = gql`
  query GetRecentPosts($first: Int = 3) {
    posts(first: $first, where: { orderby: { field: DATE, order: DESC } }) {
      nodes {
        id
        title
        slug
        excerpt
        date
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        categories {
          nodes {
            name
          }
        }
      }
    }
  }
`;

// Query for all post slugs (for generating static paths)
export const GET_ALL_POST_SLUGS = gql`
  query GetAllPostSlugs {
    posts(first: 1000) {
      nodes {
        slug
      }
    }
  }
`;

// Query for all page slugs (for generating static paths)
export const GET_ALL_PAGE_SLUGS = gql`
  query GetAllPageSlugs {
    pages(first: 1000) {
      nodes {
        slug
      }
    }
  }
`;

// Query for testimonials
export const GET_TESTIMONIALS = gql`
  query GetTestimonials {
    testimonials(first: 10) {
      nodes {
        id
        title
        content
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        testimonialFields {
          clientName
          clientPosition
          clientCompany
          rating
        }
      }
    }
  }
`;

