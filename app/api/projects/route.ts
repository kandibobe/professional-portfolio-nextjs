import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/db';
import { authOptions } from '../auth/[...nextauth]/route';
import { logger } from '@/lib/logger';

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, description, imageUrl } = body;

    if (!title || !imageUrl) {
      return NextResponse.json({ message: 'Title and Image are required' }, { status: 400 });
    }

    const slug = title
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');

    const project = await prisma.project.create({
      data: {
        title,
        description,
        imageUrl,
        slug: `${slug}-${Date.now()}`,
      },
    });

    logger.info({ projectId: project.id }, 'Project created successfully');
    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    logger.error({ error }, 'Error creating project');
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ message: 'Project ID is required' }, { status: 400 });
    }

    await prisma.project.delete({
      where: { id },
    });

    logger.info({ projectId: id }, 'Project deleted successfully');
    return NextResponse.json({ message: 'Project deleted' });
  } catch (error) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    logger.error({ error, projectId: id }, 'Error deleting project');
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET() {
  if (!process.env.DATABASE_URL) {
    logger.debug('DATABASE_URL not set, returning empty projects array');
    return NextResponse.json([]);
  }

  try {
    const projects = await prisma.project.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return NextResponse.json(projects);
  } catch (error) {
    logger.error({ error }, 'Error fetching projects');
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
