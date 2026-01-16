'use server'

import { prisma } from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { Project } from '@prisma/client'

export async function getProjects() {
  if (!process.env.DATABASE_URL || process.env.DATABASE_URL === "postgresql://user:password@localhost:5432/db") {
    return [];
  }
  return await (prisma.project as any).findMany({
    orderBy: { createdAt: 'desc' },
  })
}

export async function getProjectBySlug(slug: string) {
  return await (prisma.project as any).findUnique({
    where: { slug },
  })
}

export async function createProject(data: Partial<Project>) {
  const project = await (prisma.project as any).create({
    data: data as any, // Simple cast for now, should use a Zod schema in production
  })
  revalidatePath('/portfolio')
  revalidatePath('/dashboard')
  return project
}

export async function updateProject(id: string, data: Partial<Project>) {
  const project = await (prisma.project as any).update({
    where: { id },
    data: data as any,
  })
  revalidatePath('/portfolio')
  revalidatePath('/dashboard')
  revalidatePath(`/portfolio/${project.slug}`)
  return project
}

export async function deleteProject(id: string) {
  await (prisma.project as any).delete({
    where: { id },
  })
  revalidatePath('/portfolio')
  revalidatePath('/dashboard')
}

export async function toggleProjectFeatured(id: string, isFeatured: boolean) {
  await (prisma.project as any).update({
    where: { id },
    data: { isFeatured },
  })
  revalidatePath('/')
  revalidatePath('/portfolio')
}
