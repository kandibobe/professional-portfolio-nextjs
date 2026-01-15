/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from '@testing-library/react';
import { HomePageContent } from '../components/HomePageContent';

// Mock next-intl
jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    if (key === "HomePage") {
      return (tKey: string) => tKey === "subtitle" ? "subtitle" : tKey;
    }
    return (key: string) => key;
  },
}));

// Mock routing
jest.mock('@/i18n/routing', () => ({
  Link: ({ children, href }: { children: React.ReactNode; href: string }) => <a href={href}>{children}</a>,
}));

// Mock Scene3D
jest.mock('../components/Scene3D', () => ({
  __esModule: true,
  Scene: () => <div data-testid="scene-3d" />,
  default: () => <div data-testid="scene-3d" />,
}));

// Mock Magnetic
jest.mock('../components/Magnetic', () => ({
  Magnetic: ({ children }: any) => <div data-testid="magnetic">{children}</div>,
}));

// Mock Marquee
jest.mock('../components/Marquee', () => ({
  Marquee: ({ children }: any) => <div data-testid="marquee">{children}</div>,
}));

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ fill, ...props }: any) => <img {...props} data-fill={fill ? "true" : "false"} />,
}));

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className }: any) => <div className={className}>{children}</div>,
    h1: ({ className, dangerouslySetInnerHTML }: any) => <h1 className={className} dangerouslySetInnerHTML={dangerouslySetInnerHTML} />,
    h2: ({ className, dangerouslySetInnerHTML }: any) => <h2 className={className} dangerouslySetInnerHTML={dangerouslySetInnerHTML} />,
    span: ({ children, className }: any) => <span className={className}>{children}</span>,
    p: ({ children, className }: any) => <p className={className}>{children}</p>,
    section: ({ children, className }: any) => <section className={className}>{children}</section>,
    form: ({ children, className }: any) => <form className={className}>{children}</form>,
    button: ({ children, className }: any) => <button className={className}>{children}</button>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
  useScroll: () => ({ scrollYProgress: { onChange: jest.fn() } }),
  useTransform: () => ({}),
}));

// Mock Lucide icons
jest.mock('lucide-react', () => ({
  Search: () => <div data-testid="search-icon" />,
  Code2: () => <div data-testid="code-icon" />,
  Cpu: () => <div data-testid="cpu-icon" />,
  Globe: () => <div data-testid="globe-icon" />,
  Send: () => <div data-testid="send-icon" />,
  Clock: () => <div data-testid="clock-icon" />,
  Layers: () => <div data-testid="layers-icon" />,
  Database: () => <div data-testid="database-icon" />,
  Box: () => <div data-testid="box-icon" />,
  Terminal: () => <div data-testid="terminal-icon" />,
  ArrowRight: () => <div data-testid="arrow-right-icon" />,
  Zap: () => <div data-testid="zap-icon" />,
  Shield: () => <div data-testid="shield-icon" />,
  Sparkles: () => <div data-testid="sparkles-icon" />,
}));

// Mock HeroSearch
jest.mock('../components/HeroSearch', () => ({
  HeroSearch: () => <div data-testid="hero-search" />,
}));

// Mock HeroVisual
jest.mock('../components/HeroVisual', () => ({
  HeroVisual: () => <div data-testid="hero-visual" />,
}));

// Mock FeaturedProjects
jest.mock('../components/FeaturedProjects', () => ({
  FeaturedProjects: () => <div data-testid="featured-projects" />,
}));

// Mock Testimonials
jest.mock('../components/Testimonials', () => ({
  Testimonials: () => <div data-testid="testimonials" />,
}));

// Mock HomeAnimations
jest.mock('../components/HomeAnimations', () => ({
  AnimatedHero: ({ children }: any) => <div data-testid="animated-hero">{children}</div>,
  FadeInWhenInView: ({ children }: any) => <div data-testid="fade-in">{children}</div>,
  HeroItem: ({ children }: any) => <div data-testid="hero-item">{children}</div>,
  CustomCursor: () => <div data-testid="custom-cursor" />,
  BackgroundEffects: () => <div data-testid="background-effects" />,
}));

// Mock UI Button
jest.mock('../components/ui/button', () => ({
    Button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
}));

describe('HomePageContent', () => {
  it('renders without crashing', () => {
    const mockTranslations = {
      hero: {
        available: "Available for New Projects",
        greeting: "Hi, I'm",
      },
      subtitle: "Mock Subtitle",
      viewPortfolio: "Mock View Portfolio",
      contact: "Mock Contact",
      techStack: [
        { name: "Next.js", icon: "nextjs" },
        { name: "React", icon: "react" },
        { name: "TypeScript", icon: "typescript" },
        { name: "Tailwind CSS", icon: "tailwind" },
      ],
      aboutSection: {
        title: "Mock About",
        description: "Mock about description.",
        link: "Mock More About Me",
        imageAlt: "JS",
        heading: "Building Digital Excellence",
      },
      testimonials: {
        title: "Mock Testimonials",
        items: [],
      },
      cta: {
        heading: "Have a project idea?",
      },
    };

    render(<HomePageContent translations={mockTranslations} />);
    expect(screen.getByText(/Hi, I'm/i)).toBeInTheDocument();
  });
});
