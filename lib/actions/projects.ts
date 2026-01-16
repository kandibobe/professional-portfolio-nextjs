'use server';

import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { Project } from '@prisma/client';
import { z } from 'zod';

const projectSchema = z.object({
  slug: z.string().min(1),
  title: z.string().optional(),
  titleKey: z.string().optional(),
  description: z.string().optional(),
  descriptionKey: z.string().optional(),
  category: z.string().optional(),
  categoryKey: z.string().optional(),
  imageUrl: z.string(),
  technologies: z.array(z.string()),
  date: z.string().optional(),
  githubUrl: z.string().optional().nullable(),
  liveUrl: z.string().optional().nullable(),
  stars: z.number().optional(),
  forks: z.number().optional(),
  isFeatured: z.boolean().optional(),
});

export async function getProjects() {
  if (
    !process.env.DATABASE_URL ||
    process.env.DATABASE_URL === 'postgresql://user:password@localhost:5432/db'
  ) {
    return [];
  }
  return await prisma.project.findMany({
    orderBy: { createdAt: 'desc' },
  });
}

export async function getProjectBySlug(slug: string) {
  return await prisma.project.findUnique({
    where: { slug },
  });
}

export async function createProject(data: z.infer<typeof projectSchema>) {
  const validatedData = projectSchema.parse(data);
  const project = await prisma.project.create({
    data: validatedData,
  });
  revalidatePath('/portfolio');
  revalidatePath('/dashboard');
  return project;
}

export async function updateProject(id: string, data: Partial<z.infer<typeof projectSchema>>) {
  const validatedData = projectSchema.partial().parse(data);
  const project = await prisma.project.update({
    where: { id },
    data: validatedData,
  });
  revalidatePath('/portfolio');
  revalidatePath('/dashboard');
  revalidatePath(`/portfolio/${project.slug}`);
  return project;
}

export async function deleteProject(id: string) {
  await prisma.project.delete({
    where: { id },
  });
  revalidatePath('/portfolio');
  revalidatePath('/dashboard');
}

export async function toggleProjectFeatured(id: string, isFeatured: boolean) {
  await prisma.project.update({
    where: { id },
    data: { isFeatured },
  });
  revalidatePath('/');
  revalidatePath('/portfolio');
}
