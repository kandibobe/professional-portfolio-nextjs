import { PrismaClient } from '@prisma/client'
import { projects } from '../lib/projects'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting seed...')
  
  if (!process.env.DATABASE_URL) {
    console.warn('DATABASE_URL is not set. Skipping seed.')
    return
  }

  for (const project of projects) {
    await (prisma.project as any).upsert({
      where: { slug: project.slug },
      update: {
        title: project.title,
        titleKey: project.titleKey,
        description: project.description,
        descriptionKey: project.descriptionKey,
        category: project.category,
        categoryKey: project.categoryKey,
        imageUrl: project.src,
        technologies: project.technologies,
        date: project.date,
        githubUrl: project.githubUrl,
        liveUrl: project.liveUrl,
        stars: project.stats?.stars || 0,
        forks: project.stats?.forks || 0,
        isFeatured: true,
      },
      create: {
        slug: project.slug,
        title: project.title,
        titleKey: project.titleKey,
        description: project.description,
        descriptionKey: project.descriptionKey,
        category: project.category,
        categoryKey: project.categoryKey,
        imageUrl: project.src,
        technologies: project.technologies,
        date: project.date,
        githubUrl: project.githubUrl,
        liveUrl: project.liveUrl,
        stars: project.stats?.stars || 0,
        forks: project.stats?.forks || 0,
        isFeatured: true,
      },
    })
  }

  console.log('Seed completed successfully.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
