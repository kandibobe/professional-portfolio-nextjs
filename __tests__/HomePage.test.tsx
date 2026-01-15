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
}));

// Mock HeroSearch
jest.mock('../components/HeroSearch', () => ({
  HeroSearch: () => <div data-testid="hero-search" />,
}));

// Mock HomeAnimations
jest.mock('../components/HomeAnimations', () => ({
  AnimatedHero: ({ children }: any) => <div data-testid="animated-hero">{children}</div>,
  FadeInWhenInView: ({ children }: any) => <div data-testid="fade-in">{children}</div>,
  HeroItem: ({ children }: any) => <div data-testid="hero-item">{children}</div>,
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
