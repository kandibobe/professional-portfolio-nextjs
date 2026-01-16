'use client'

import { useState } from 'react'
import { Project } from '@prisma/client'
import { createProject, updateProject, deleteProject, toggleProjectFeatured } from '@/lib/actions/projects'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Trash2, Edit2, Plus, Star, StarOff } from 'lucide-react'

interface ProjectManagerProps {
  initialProjects: any[] // Using any to avoid TS issues with generated client in this env
}

export default function ProjectManager({ initialProjects }: ProjectManagerProps) {
  const [projects, setProjects] = useState<any[]>(initialProjects)
  const [isEditing, setIsEditing] = useState<string | null>(null)
  const [formData, setFormData] = useState<any>({})

  const handleEdit = (project: any) => {
    setIsEditing(project.id)
    setFormData(project)
  }

  const handleCreate = () => {
    setIsEditing('new')
    setFormData({
      title: '',
      slug: '',
      imageUrl: '',
      technologies: [],
      description: '',
      isFeatured: false,
      stars: 0,
      forks: 0
    })
  }

  const handleSave = async () => {
    if (isEditing === 'new') {
      const newProject = await createProject(formData)
      setProjects([newProject, ...projects])
    } else if (isEditing) {
      const updated = await updateProject(isEditing, formData)
      setProjects(projects.map((p) => (p.id === updated.id ? updated : p)))
    }
    setIsEditing(null)
    setFormData({})
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure?')) {
      await deleteProject(id)
      setProjects(projects.filter((p) => p.id !== id))
    }
  }

  const handleToggleFeatured = async (id: string, current: boolean) => {
    await toggleProjectFeatured(id, !current)
    setProjects(projects.map((p) => (p.id === id ? { ...p, isFeatured: !current } : p)))
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-white">Project Management</h2>
        <Button onClick={handleCreate} className="bg-primary hover:bg-primary/80">
          <Plus className="w-4 h-4 mr-2" /> Add Project
        </Button>
      </div>

      {isEditing && (
        <div className="p-6 border border-white/10 rounded-lg bg-black/40 backdrop-blur-xl text-white space-y-4">
          <h3 className="text-xl font-medium">{isEditing === 'new' ? 'Create Project' : 'Edit Project'}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Title</label>
              <Input
                placeholder="Title"
                value={formData.title || ''}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="bg-white/5 border-white/10"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Slug</label>
              <Input
                placeholder="Slug"
                value={formData.slug || ''}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="bg-white/5 border-white/10"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Image URL</label>
              <Input
                placeholder="Image URL"
                value={formData.imageUrl || ''}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                className="bg-white/5 border-white/10"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Technologies (comma separated)</label>
              <Input
                placeholder="Technologies"
                value={formData.technologies?.join(', ') || ''}
                onChange={(e) => setFormData({ ...formData, technologies: e.target.value.split(',').map((s: string) => s.trim()) })}
                className="bg-white/5 border-white/10"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-400">GitHub URL</label>
              <Input
                placeholder="GitHub URL"
                value={formData.githubUrl || ''}
                onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                className="bg-white/5 border-white/10"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Live URL</label>
              <Input
                placeholder="Live URL"
                value={formData.liveUrl || ''}
                onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                className="bg-white/5 border-white/10"
              />
            </div>
            <div className="col-span-full space-y-2">
              <label className="text-sm text-gray-400">Description</label>
              <Textarea
                placeholder="Description"
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="bg-white/5 border-white/10 min-h-[100px]"
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => setIsEditing(null)} className="border-white/10 hover:bg-white/5">Cancel</Button>
            <Button onClick={handleSave} className="bg-primary hover:bg-primary/80">Save Changes</Button>
          </div>
        </div>
      )}

      <div className="grid gap-4">
        {projects.map((project) => (
          <div key={project.id} className="flex items-center justify-between p-4 border border-white/5 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
            <div className="flex items-center gap-4">
              <img src={project.imageUrl} alt={project.title || ''} className="w-12 h-12 object-cover rounded-lg border border-white/10" />
              <div>
                <h4 className="font-medium text-white">{project.title}</h4>
                <p className="text-xs text-gray-500">{project.slug}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleToggleFeatured(project.id, project.isFeatured)}
                className={project.isFeatured ? "text-yellow-500" : "text-gray-500"}
              >
                {project.isFeatured ? <Star className="w-4 h-4 fill-current" /> : <StarOff className="w-4 h-4" />}
              </Button>
              <Button variant="ghost" size="icon" onClick={() => handleEdit(project)} className="text-gray-400 hover:text-white">
                <Edit2 className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => handleDelete(project.id)} className="text-gray-500 hover:text-red-500">
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
