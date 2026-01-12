# Professional Photography Portfolio

A high-end, editorial-style photography portfolio built with Next.js, TypeScript, Tailwind CSS, and Framer Motion. This project is optimized for performance, SEO, and client acquisition.

## 🚀 Features

- **High-Fashion Editorial Design**: A minimalist, luxury aesthetic suitable for high-end photography.
- **Dynamic Portfolio & Case Studies**: Easily manage and display your work with rich visual storytelling.
- **Client Area & Authentication**: Secure client login using NextAuth.js and Prisma.
- **Multi-language Support (i18n)**: Seamless internationalization with `next-intl`.
- **Advanced SEO**: Enhanced with JSON-LD structured data and comprehensive metadata.
- **Performance Optimized**: Image optimization, efficient state management with Zustand, and responsive design.
- **Dark/Light Mode**: Elegant theme switching with `next-themes`.
- **API Security**: Rate limiting with Upstash Redis on contact forms.

## 🛠 Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Database & Auth**: [Prisma](https://www.prisma.io/), [PostgreSQL](https://www.postgresql.org/), [NextAuth.js](https://next-auth.js.org/)
- **CMS**: [Sanity.io](https://www.sanity.io/) (Integration ready)
- **Form Handling**: [Zod](https://zod.dev/), [React Hook Form](https://react-hook-form.com/) (Integration ready)
- **Email**: [Resend](https://resend.com/)
- **Testing**: [Jest](https://jestjs.io/), [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/), [Playwright](https://playwright.dev/)
- **Developer Tools**: [Storybook](https://storybook.js.org/), [Husky](https://typicode.github.io/husky/), [lint-staged](https://github.com/okonet/lint-staged)

## 📦 Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm or yarn
- A PostgreSQL database (e.g., Supabase, Neon)
- A Redis instance (e.g., Upstash)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name/portfolio-site
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up your environment variables:
   Create a `.env.local` file based on `.env.example`.

4. Run the development server:
   ```bash
   npm run dev
   ```

## 🧪 Testing & Development

- **Run unit tests**: `npm test`
- **Run E2E tests**: `npx playwright test`
- **Run Storybook**: `npm run storybook`
- **Lint & Format**: `npm run lint` / `npm run format`

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
