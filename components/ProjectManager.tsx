'use client';

import { useEffect } from 'react';
import { Trash2, Loader2, Grid } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useProjectStore } from '@/lib/store';
import Image from 'next/image';

export default function ProjectManager() {
  const { projects, loading, fetchProjects, removeProject } = useProjectStore();

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this photo? This action cannot be undone.'))
      return;

    // Optimistic update
    removeProject(id);

    try {
      const response = await fetch(`/api/projects?id=${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        alert('Failed to delete project');
        fetchProjects(); // Revert if failed
      }
    } catch (error) {
      console.error('Error deleting project:', error);
      alert('Error deleting project');
      fetchProjects(); // Revert
    }
  };

  if (loading && projects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-4">
        <Loader2 className="animate-spin" size={32} />
        <p className="text-xs font-black uppercase tracking-widest">Loading your works...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between border-b border-border/50 pb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-xl text-primary">
            <Grid size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Active Portfolio</h2>
            <p className="text-sm text-muted-foreground">Manage your published photography.</p>
          </div>
        </div>
        <div className="text-[10px] font-black uppercase tracking-widest bg-secondary px-4 py-2 rounded-full">
          {projects.length} {projects.length === 1 ? 'Project' : 'Projects'}
        </div>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-20 bg-secondary/20 rounded-3xl border-2 border-dashed border-border">
          <p className="text-muted-foreground font-medium italic">
            Your portfolio is empty. Upload your first work above!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="relative group rounded-2xl overflow-hidden bg-secondary shadow-sm transition-all hover:shadow-xl hover:-translate-y-1"
            >
              <div className="aspect-[4/3] relative">
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 lg:bg-black/60 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 lg:group-focus-within:opacity-100 transition-all flex items-start justify-end p-2 lg:items-center lg:justify-center lg:p-0 backdrop-blur-none lg:backdrop-blur-[2px]">
                  <Button
                    variant="destructive"
                    size="icon"
                    className="rounded-full w-8 h-8 lg:w-12 lg:h-12 shadow-lg hover:scale-110 transition-transform"
                    onClick={() => handleDelete(project.id)}
                    aria-label={`Delete ${project.title}`}
                  >
                    <Trash2 size={20} />
                  </Button>
                </div>
              </div>
              <div className="p-4 bg-card">
                <h3 className="font-bold text-sm tracking-tight truncate">{project.title}</h3>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">
                  Published Work
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
