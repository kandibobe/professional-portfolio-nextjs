import type { Meta, StoryObj } from '@storybook/react';
import { ProjectCard } from '@/components/ProjectCard';

const meta: Meta<typeof ProjectCard> = {
  title: 'Components/ProjectCard',
  component: ProjectCard,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ProjectCard>;

export const Default: Story = {
  args: {
    project: {
      id: 1,
      slug: 'test-project',
      titleKey: 'testTitle',
      descriptionKey: 'testDescription',
      categoryKey: 'testCategory',
      src: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c',
      technologies: ['React', 'Next.js', 'Tailwind'],
      date: '2024',
    },
  },
};
