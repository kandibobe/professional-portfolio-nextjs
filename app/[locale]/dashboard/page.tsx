import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import PhotoUploadForm from '@/components/PhotoUploadForm';
import ProjectManager from '@/components/ProjectManager';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-12 text-center uppercase tracking-widest">
        Admin Dashboard
      </h1>
      <div className="grid gap-16 max-w-6xl mx-auto">
        <section className="bg-card p-8 rounded-3xl border border-border/50 shadow-sm">
          <PhotoUploadForm />
        </section>

        <section className="bg-card p-8 rounded-3xl border border-border/50 shadow-sm">
          <ProjectManager />
        </section>
      </div>
    </div>
  );
}
