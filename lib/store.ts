import { create } from 'zustand';

interface Project {
  id: string;
  title: string;
  imageUrl: string;
}

interface UIState {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  toggleMobileMenu: () => void;
}

interface ProjectState {
  projects: Project[];
  loading: boolean;
  fetchProjects: () => Promise<void>;
  removeProject: (id: string) => void;
}

export const useUIStore = create<UIState>((set) => ({
  mobileMenuOpen: false,
  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
  toggleMobileMenu: () => set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen })),
}));

export const useProjectStore = create<ProjectState>((set) => ({
  projects: [],
  loading: false,
  fetchProjects: async () => {
    set({ loading: true });
    try {
      const response = await fetch('/api/projects');
      if (response.ok) {
        const data = await response.json();
        set({ projects: data });
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      set({ loading: false });
    }
  },
  removeProject: (id) => set((state) => ({ projects: state.projects.filter((p) => p.id !== id) })),
}));
