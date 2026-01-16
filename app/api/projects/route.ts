import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/db';
import { authOptions } from '../auth/[...nextauth]/route';

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

    const project = await (prisma.project as any).create({
      data: {
        title,
        description,
        imageUrl,
        slug: `${slug}-${Date.now()}`,
      },
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';

export async function GET() {
  if (!process.env.DATABASE_URL || process.env.DATABASE_URL === "postgresql://user:password@localhost:5432/db") {
    return NextResponse.json([]);
  }
  try {
    const projects = await (prisma.project as any).findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
