import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getProjects } from '@/lib/actions/projects';
import ProjectManager from '@/components/ProjectManager';
import { RealTimeMonitor } from '@/components/RealTimeMonitor';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  let projects = [];
  try {
    projects = await getProjects();
  } catch (e) {
    console.error("Dashboard: failed to load projects", e);
  }

  return (
    <div className="container mx-auto py-10 space-y-12">
      <h1 className="text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
        Admin Dashboard
      </h1>
      
      <section className="glass-panel p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md">
        <RealTimeMonitor />
      </section>

      <section className="glass-panel p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md">
        <ProjectManager initialProjects={projects} />
      </section>
    </div>
  );
}
