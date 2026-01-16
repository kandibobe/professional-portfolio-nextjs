'use server';

import { prisma } from '@/lib/db';
import { BlogPost } from '@prisma/client';
import { z } from 'zod';

const blogPostSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  excerpt: z.string().min(1),
  content: z.string().min(1),
  coverImage: z.string().optional().nullable(),
  tags: z.array(z.string()).optional(),
  published: z.boolean().optional(),
});

export async function getBlogPosts() {
  if (
    !process.env.DATABASE_URL ||
    process.env.DATABASE_URL === 'postgresql://user:password@localhost:5432/db'
  ) {
    return [];
  }
  return await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { date: 'desc' },
  });
}

export async function getBlogPostBySlug(slug: string) {
  if (!process.env.DATABASE_URL) return null;
  return await prisma.blogPost.findUnique({
    where: { slug },
  });
}

export async function createBlogPost(data: z.infer<typeof blogPostSchema>) {
  const validatedData = blogPostSchema.parse(data);
  return await prisma.blogPost.create({
    data: validatedData,
  });
}
